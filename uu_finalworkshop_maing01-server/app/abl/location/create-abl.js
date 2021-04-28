"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../../api/errors/location-error.js");

const WARNINGS = {
  initUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`,
  },
};

class LocationAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("location");
  }

  async create(uri, dtoIn, uuAppErrorMap = {}) {
    const awid = uri.getAwid();

    // HDS 1 - validation
    const validationResult = this.validator.validate("locationCreateDtoInType", dtoIn);
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

    let location = null;
    try {
      location = await this.dao.create(uuObject);
    } catch (e) {
      throw new Errors.Create.ListDaoCreateFailed({ uuAppErrorMap }, e);
    }

    //HDS 3 - return
    return {
      ...location,
      uuAppErrorMap,
    };
  }
}

module.exports = new LocationAbl();
