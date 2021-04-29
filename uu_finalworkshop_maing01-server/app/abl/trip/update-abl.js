"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../../api/errors/trip-error.js");

const WARNINGS = {
  initUnsupportedKeys: {
    code: `${Errors.Update.UC_CODE}unsupportedKeys`,
  },
};

class TripUpdateAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("trip");
    this.mainDao = DaoFactory.getDao("finalworkshopMain");
  }

  async update(uri, dtoIn, uuAppErrorMap = {}) {
    const awid = uri.getAwid();
    const pierMain = await this.mainDao.get(awid);

    if (!pierMain) {
      throw new Error.Main.travelAgencyInstanceDoesNotExist();
    }

    if (pierMain.state !== "active") {
      throw new Error.Main.travelAgencyInstanceNotInProperState();
    }
    // HDS 1 - validation
    const validationResult = this.validator.validate("tripUpdateDtoInType", dtoIn);
    // A1, A2
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.initUnsupportedKeys.code,
      Errors.Update.InvalidDtoIn
    );

    //HDS 2

    let uuTrip = await this.dao.get(awid, dtoIn.id);

    if (!uuTrip) {
      throw new Errors.Get.TripDoesNotExist({ uuAppErrorMap }, { tripId: dtoIn.id });
    }
    let uuObject = {
      ...uuTrip,
      ...dtoIn,
    };
    if (dtoIn.newParticipant) {
      const { newParticipant, ...dtoInUp } = dtoIn;
      uuObject = {
        ...uuTrip,
        ...dtoInUp,
        participantList: [...uuTrip.participantList, newParticipant],
      };
    }

    // HDS 3

    try {
      uuTrip = await this.dao.update(uuObject);
    } catch (e) {
      throw new Errors.Update.ParticipantDaoUpdateFailed({ uuAppErrorMap }, e);
    }

    // HDS 4

    return {
      ...uuTrip,
      uuAppErrorMap,
    };
  }
}

module.exports = new TripUpdateAbl();
