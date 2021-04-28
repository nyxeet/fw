"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../../api/errors/participant-error.js");

const WARNINGS = {
  initUnsupportedKeys: {
    code: `${Errors.Update.UC_CODE}unsupportedKeys`,
  },
};

class ParticipantUpdateAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("participant");
    this.mainDao = DaoFactory.getDao("finalworkshopMain");
  }

  async update(uri, dtoIn, uuAppErrorMap = {}) {
    const awid = uri.getAwid();

    //HDS 1

    const pierMain = await this.mainDao.get(awid);

    if (!pierMain) {
      throw new Errors.Main.travelAgencyInstanceDoesNotExist();
    }

    if (pierMain.state !== "active") {
      throw new Errors.Main.travelAgencyInstanceNotInProperState();
    }
    // HDS 2 - validation
    const validationResult = this.validator.validate("participantUpdateDtoInType", dtoIn);
    // A1, A2
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.initUnsupportedKeys.code,
      Errors.Update.InvalidDtoIn
    );

    //HDS 3
    let uuParticipant = await this.dao.get(awid, dtoIn.id);

    if (!uuParticipant) {
      throw new Errors.Update.ParticipantDoesNotExist({ uuAppErrorMap }, { participantId: dtoIn.id });
    }
    const uuObject = {
      ...uuParticipant,
      ...dtoIn,
    };

    //HDS 4 check authorization

    // HDS 5

    try {
      uuParticipant = await this.dao.update(uuObject);
    } catch (e) {
      throw new Errors.Update.ParticipantDaoUpdateFailed({ uuAppErrorMap }, e);
    }

    // HDS 6

    return {
      ...uuParticipant,
      uuAppErrorMap,
    };
  }
}

module.exports = new ParticipantUpdateAbl();
