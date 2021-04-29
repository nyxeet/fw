"use strict";

const FinalworkshopMainUseCaseError = require("./finalworkshop-main-use-case-error.js");
const PARTICIPANT_ERROR_PREFIX = `${FinalworkshopMainUseCaseError.ERROR_PREFIX}participant/`;

const Main = {
  UC_CODE: `${PARTICIPANT_ERROR_PREFIX}main/`,
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
  UC_CODE: `${PARTICIPANT_ERROR_PREFIX}create/`,

  InvalidDtoIn: class extends FinalworkshopMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  ParticipantDaoCreateFailed: class extends FinalworkshopMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}participantDaoCreateFailed`;
      this.message = "Add participant by participant DAO create failed.";
    }
  },
};
const Update = {
  UC_CODE: `${PARTICIPANT_ERROR_PREFIX}update/`,

  InvalidDtoIn: class extends FinalworkshopMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  ParticipantDaoUpdateFailed: class extends FinalworkshopMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}participantDaoUpdateFailed`;
      this.message = "Update participant  DAO  failed.";
    }
  },
  ParticipantDoesNotExist: class extends FinalworkshopMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}participantDoesNotExist`;
      this.message = "Participant does not exist";
    }
  },
};

const List = {
  UC_CODE: `${PARTICIPANT_ERROR_PREFIX}list/`,

  ListParticipantDaoFailed: class extends FinalworkshopMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}participantListError`;
      this.message = "Participant does not exist";
    }
  },
};

module.exports = {
  List,
  Create,
  Main,
  Update,
};
