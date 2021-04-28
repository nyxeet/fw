"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../../api/errors/trip-error.js");
const UuBinaryAbl = require("uu_appg01_binarystore-cmd").UuBinaryAbl;

const WARNINGS = {
  initUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`,
  },
};

class TripAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("trip");
    this.locationDao = DaoFactory.getDao("location");
    this.mainDao = DaoFactory.getDao("finalworkshopMain");
    this.participantDao = DaoFactory.getDao("participant");
  }

  async create(uri, dtoIn, uuAppErrorMap = {}) {
    const awid = uri.getAwid();
    const pierMain = await this.mainDao.get(awid);

    if (!pierMain) {
      throw new Errors.Main.travelAgencyInstanceDoesNotExist();
    }

    if (pierMain.state !== "active") {
      throw new Errors.Main.travelAgencyInstanceNotInProperState();
    }
    // HDS 1 - validation
    const validationResult = this.validator.validate("tripCreateDtoInType", dtoIn);
    // A1, A2
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.initUnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );

    //HDS 2
    const uuObject = {
      awid,
      participantList: [],
      ...dtoIn,
    };

    let trip = null;
    try {
      trip = await this.dao.create(uuObject);
    } catch (e) {
      throw new Errors.Create.TripDaoCreateFailed({ uuAppErrorMap }, e);
    }
    // HDS 3 image
    let uuBinary = null;
    if (dtoIn.image) {
      try {
        uuBinary = await UuBinaryAbl.createBinary(awid, { data: dtoIn.image });
      } catch (e) {
        throw new Errors.Create.CreateBinaryFailed({ uuAppErrorMap }, e);
      }
      uuObject.userPic = uuBinary.code;
    }

    //HDS 4
    const participantsList = uuObject.participantList;
    const dbList = await this.participantDao.findMany(awid, participantsList);
    if (participantsList.length !== dbList.itemList.length) {
      throw new Errors.Create.ParticipantDoesNotExist({ uuAppErrorMap });
    }

    //HDS 5
    try {
      await this.locationDao.get(awid, dtoIn.locationId);
    } catch (e) {
      throw new Errors.Create.LocationDoesNotExist({ uuAppErrorMap }, e);
    }

    //HDS 6 - return
    return {
      ...trip,
      uuAppErrorMap,
    };
  }
}

module.exports = new TripAbl();
