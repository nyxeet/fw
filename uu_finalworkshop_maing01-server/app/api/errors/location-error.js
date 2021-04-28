"use strict";

const FinalworkshopMainUseCaseError = require("./finalworkshop-main-use-case-error.js");
const LOCATION_ERROR_PREFIX = `${FinalworkshopMainUseCaseError.ERROR_PREFIX}location/`;

const Create = {
  UC_CODE: `${LOCATION_ERROR_PREFIX}create/`,
  InvalidDtoIn: class extends FinalworkshopMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  ListDaoCreateFailed: class extends FinalworkshopMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}locationDaoCreateFailed`;
      this.message = "Add location by location DAO create failed.";
    }
  },
};

module.exports = {
  Create,
};
