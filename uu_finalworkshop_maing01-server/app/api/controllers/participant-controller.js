"use strict";
const ParticipantAbl = require("../../abl/participant/create-abl");
const ParticipantUpdateAbl = require("../../abl/participant/update-abl");
const PartictipantListAbl = require("../../abl/participant/list-abl");

class ParticipantController {
  list(ucEnv) {
    return PartictipantListAbl.list(ucEnv.getUri(), ucEnv.getDtoIn());
  }
  create(ucEnv) {
    return ParticipantAbl.create(ucEnv.getUri(), ucEnv.getDtoIn());
  }
  update(ucEnv) {
    return ParticipantUpdateAbl.update(ucEnv.getUri(), ucEnv.getDtoIn());
  }
}

module.exports = new ParticipantController();
