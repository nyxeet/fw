"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../../api/errors/trip-error");

const WARNINGS = {
  initUnsupportedKeys: {
    code: `${Errors.List.UC_CODE}unsupportedKeys`,
  },
};

class ListTripAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("trip");
    this.mainDao = DaoFactory.getDao("finalworkshopMain");
  }

  async list(uri, dtoIn, session) {
    const awid = uri.getAwid();

    // HDS 1

    const pierMain = await this.mainDao.get(awid);

    if (!pierMain) {
      throw new Errors.Main.travelAgencyInstanceDoesNotExist();
    }

    if (pierMain.state !== "active") {
      throw new Errors.Main.travelAgencyInstanceNotInProperState();
    }

    // HDS 2
    const validationResult = this.validator.validate("tripListDtoInType", dtoIn);
    // A1, A2
    const uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.initUnsupportedKeys.code,
      Errors.List.InvalidDtoIn
    );
    // HDS 3
    let resultList = [];
    const sort = {};
    if (dtoIn.sortBy) {
      sort[dtoIn.sortBy] = dtoIn.order === "asc" ? 1 : -1;
    }

    try {
      resultList = await this.dao.list(awid, dtoIn.pageInfo, sort);
    } catch (e) {
      throw new Errors.List.ListTripDaoFailed({ uuAppErrorMap }, e);
    }

    // HDS 4
    return {
      ...resultList,
      uuAppErrorMap,
    };
  }
}

module.exports = new ListTripAbl();
