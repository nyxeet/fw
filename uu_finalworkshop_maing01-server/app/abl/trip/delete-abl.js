"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../../api/errors/trip-error");
const WARNINGS = {
  deleteUnsupportedKeys: {
    code: `${Errors.Delete.UC_CODE}unsupportedKeys`,
  },
};

class DeleteAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("trip");
    this.mainDao = DaoFactory.getDao("finalworkshopMain");
  }

  async delete(uri, dtoIn, uuAppErrorMap = {}) {
    const awid = uri.getAwid();

    // HDS 1

    const pierMain = await this.mainDao.get(awid);

    if (!pierMain) {
      throw new Errors.Main.travelAgencyInstanceDoesNotExist({ uuAppErrorMap });
    }

    if (pierMain.state !== "active") {
      throw new Errors.Main.travelAgencyInstanceNotInProperState({ uuAppErrorMap });
    }
    // HDS 2
    const validationResult = this.validator.validate("tripDeleteDtoInType", dtoIn);
    // A1, A2
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.deleteUnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn
    );
    //HDS 2.1
    const trip = await this.dao.get(awid, dtoIn.id);
    if (!trip) {
      throw new Errors.Delete.TripDoesNotExist({ uuAppErrorMap }, { id: dtoIn.id });
    }

    // HDS 3
    //HDS 3.B.1
    let countOfParticipants = 0;
    if (trip.participantList) {
      countOfParticipants = trip.participantList.length;
    }

    //HDS 3.B.2

    if (!dtoIn.forceDelete) {
      if (countOfParticipants !== 0) {
        throw new Errors.Delete.RelatedParticipantsExist({ uuAppErrorMap });
      }
    }

    // HDS 4
    try {
      await this.dao.delete({ awid, id: dtoIn.id });
    } catch (e) {
      throw new Errors.Delete.TripDaoDeleteFailed({ uuAppErrorMap }, e);
    }
    // HDS 5

    return {
      uuAppErrorMap,
    };
  }
}

module.exports = new DeleteAbl();
