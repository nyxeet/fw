"use strict";
const ParticipantAbl = require("../../abl/participant/create-abl");
const ParticipantUpdateAbl = require("../../abl/participant/update-abl");

class ParticipantController {
  create(ucEnv) {
    return ParticipantAbl.create(ucEnv.getUri(), ucEnv.getDtoIn());
  }
  update(ucEnv) {
    return ParticipantUpdateAbl.update(ucEnv.getUri(), ucEnv.getDtoIn());
  }
}

module.exports = new ParticipantController();
