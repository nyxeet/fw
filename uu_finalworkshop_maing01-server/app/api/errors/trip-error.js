"use strict";

const FinalworkshopMainUseCaseError = require("./finalworkshop-main-use-case-error.js");
const TRIP_ERROR_PREFIX = `${FinalworkshopMainUseCaseError.ERROR_PREFIX}trip/`;

const Create = {
  UC_CODE: `${TRIP_ERROR_PREFIX}create/`,
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
      this.code = `${Create.UC_CODE}tripDaoCreateFailed`;
      this.message = "Add trip by trip DAO create failed.";
    }
  },
};

module.exports = {
  Create,
};
