"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../../api/errors/trip-error");

const WARNINGS = {
  getUnsupportedKeys: {
    code: `${Errors.Get.UC_CODE}unsupportedKeys`,
  },
};

class GetTripAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("trip");
    this.mainDao = DaoFactory.getDao("finalworkshopMain");
  }

  async get(uri, dtoIn, uuAppErrorMap = {}) {
    const awid = uri.getAwid();

    //HDS 1
    const pierMain = await this.mainDao.get(awid);

    if (!pierMain) {
      throw new Errors.Main.travelAgencyInstanceDoesNotExist({ uuAppErrorMap });
    }

    if (pierMain.state !== "active") {
      throw new Errors.Main.travelAgencyInstanceNotInProperState({ uuAppErrorMap });
    }

    // HDS 2
    const validationResult = this.validator.validate("tripGetDtoInType", dtoIn);
    // HDS 2.1, HDS 2.2, HDS 2.3
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.getUnsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );

    // HDS 3
    // HDS 3.1
    let uuTrip = null;

    uuTrip = await this.dao.get(awid, dtoIn.id);

    if (!uuTrip) {
      throw new Errors.Get.TripDoesNotExist({ uuAppErrorMap }, { id: dtoIn.id });
    }

    // HDS 4

    return {
      ...uuTrip,
      uuAppErrorMap,
    };
  }
}

module.exports = new GetTripAbl();
