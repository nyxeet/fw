"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../../api/errors/location-error.js");

const WARNINGS = {};

class LocationAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("location");
  }

  async list(uri, dtoIn, uuAppErrorMap = {}) {
    const awid = uri.getAwid();
    let resultList;
    try {
      resultList = await this.dao.list(awid, dtoIn.pageInfo);
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

module.exports = new LocationAbl();
