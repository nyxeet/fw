"use strict";

const FinalworkshopMainUseCaseError = require("./finalworkshop-main-use-case-error.js");
const TRIP_ERROR_PREFIX = `${FinalworkshopMainUseCaseError.ERROR_PREFIX}trip/`;
const Main = {
  UC_CODE: `${TRIP_ERROR_PREFIX}main/`,
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
  UC_CODE: `${TRIP_ERROR_PREFIX}create/`,

  InvalidDtoIn: class extends FinalworkshopMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  TripDaoCreateFailed: class extends FinalworkshopMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}tripDaoCreateFailed`;
      this.message = "Add trip by trip DAO create failed.";
    }
  },
  LocationDoesNotExist: class extends FinalworkshopMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}locationDoesNotExist`;
      this.message = "Location does not exist.";
    }
  },
};
const Get = {
  UC_CODE: `${TRIP_ERROR_PREFIX}get/`,

  InvalidDtoIn: class extends FinalworkshopMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  TripDoesNotExist: class extends FinalworkshopMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}tripDoesNotExist`;
      this.message = "Trip with given id does not exist.";
    }
  },
};
const List = {
  UC_CODE: `${TRIP_ERROR_PREFIX}list/`,

  InvalidDtoIn: class extends FinalworkshopMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  ListTripDaoFailed: class extends FinalworkshopMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}listTripDaoFailed`;
      this.message = "List trip DAO failed.";
    }
  },
};
const Update = {
  UC_CODE: `${TRIP_ERROR_PREFIX}update/`,

  InvalidDtoIn: class extends FinalworkshopMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  TripDaoUpdateFailed: class extends FinalworkshopMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}tripDaoUpdateFailed`;
      this.message = "Update trip DAO  failed.";
    }
  },
};
const Delete = {
  UC_CODE: `${TRIP_ERROR_PREFIX}delete/`,

  InvalidDtoIn: class extends FinalworkshopMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  RelatedParticipantsExist: class extends FinalworkshopMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}relatedParticipantsExist`;
      this.message = "Trip contains participants";
    }
  },

  TripDaoDeleteFailed: class extends FinalworkshopMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}tripDaoDeleteFailed`;
      this.message = "Delete trip DAO delete failed.";
    }
  },
  TripDoesNotExist: class extends FinalworkshopMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}tripDoesNotExist`;
      this.message = "Trip with given id does not exist.";
    }
  },
};
module.exports = {
  Create,
  Get,
  Main,
  List,
  Update,
  Delete,
};
