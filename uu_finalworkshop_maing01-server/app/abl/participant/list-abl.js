"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../../api/errors/participant-error.js");

const WARNINGS = {};

class ParticipantAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("participant");
  }

  async list(uri, dtoIn, uuAppErrorMap = {}) {
    const awid = uri.getAwid();
    let list;

    try {
      list = await this.dao.findMany(awid, dtoIn.ids);
    } catch (e) {
      throw new Errors.List.ListParticipantDaoFailed({ uuAppErrorMap }, e);
    }

    // HDS 4
    return {
      ...list,
      uuAppErrorMap,
    };
  }
}

module.exports = new ParticipantAbl();
