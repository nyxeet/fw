"use strict";
const TripAbl = require("../../abl/trip/create-abl.js");
const TripGetAbl = require("../../abl/trip/get-abl");
const TripListAbl = require("../../abl/trip/list-abl");
const TripUpdateAbl = require("../../abl/trip/update-abl");
const TripDeleteAbl = require("../../abl/trip/delete-abl");

class TripController {
  create(ucEnv) {
    return TripAbl.create(ucEnv.getUri(), ucEnv.getDtoIn());
  }
  get(ucEnv) {
    return TripGetAbl.get(ucEnv.getUri(), ucEnv.getDtoIn());
  }
  list(ucEnv) {
    return TripListAbl.list(ucEnv.getUri(), ucEnv.getDtoIn());
  }
  update(ucEnv) {
    return TripUpdateAbl.update(ucEnv.getUri(), ucEnv.getDtoIn());
  }
  delete(ucEnv) {
    return TripDeleteAbl.delete(ucEnv.getUri(), ucEnv.getDtoIn());
  }
}

module.exports = new TripController();
