"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../../api/errors/trip-error.js");

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

    //HDS 4
    try {
      await this.locationDao.get(awid, dtoIn.locationId);
    } catch (e) {
      throw new Errors.Create.LocationDoesNotExist({ uuAppErrorMap }, e);
    }

    //HDS 5 - return
    return {
      ...trip,
      uuAppErrorMap,
    };
  }
}

module.exports = new TripAbl();
