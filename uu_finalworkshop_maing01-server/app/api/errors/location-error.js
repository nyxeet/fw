"use strict";

const FinalworkshopMainUseCaseError = require("./finalworkshop-main-use-case-error.js");
const LOCATION_ERROR_PREFIX = `${FinalworkshopMainUseCaseError.ERROR_PREFIX}location/`;
const Main = {
  UC_CODE: `${LOCATION_ERROR_PREFIX}main/`,
  travelAgencyInstanceDoesNotExist: class extends FinalworkshopMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Main.UC_CODE}travelAgencyInstanceDoesNotExist`;
      this.message = "Travel agency instance does not exist";
    }
  },
  travelAgencyInstanceNotInProperState: class extends FinalworkshopMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Main.UC_CODE}travelAgencyInstanceNotInProperState`;
      this.message = "Travel agency instance not in proper state";
    }
  },
};
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

const List = {
  UC_CODE: `${LOCATION_ERROR_PREFIX}list/`,
  ListTripDaoFailed: class extends FinalworkshopMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}listTripDaoFailed`;
      this.message = "ListTripDaoFailed";
    }
  },
};

module.exports = {
  List,
  Create,
  Main,
};
