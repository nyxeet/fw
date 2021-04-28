"use strict";
const TripAbl = require("../../abl/trip/create-abl.js");

class TripController {
  create(ucEnv) {
    return TripAbl.create(ucEnv.getUri(), ucEnv.getDtoIn());
  }
}

module.exports = new TripController();
