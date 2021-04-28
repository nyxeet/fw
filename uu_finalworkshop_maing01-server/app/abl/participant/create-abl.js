"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../../api/errors/participant-error.js");

const WARNINGS = {
  initUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`,
  },
};

class ParticipantAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("participant");
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
    const validationResult = this.validator.validate("participantCreateDtoInType", dtoIn);
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
      ...dtoIn,
    };

    let participant = null;
    try {
      participant = await this.dao.create(uuObject);
    } catch (e) {
      throw new Errors.Create.ParticipantDaoCreateFailed({ uuAppErrorMap }, e);
    }
    //HDS 3 add participant to trip list

    //HDS 4 - return
    return {
      ...participant,
      uuAppErrorMap,
    };
  }
}

module.exports = new ParticipantAbl();
