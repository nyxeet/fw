"use strict";
const LocationAbl = require("../../abl/location/create-abl");

class LocationController {
  create(ucEnv) {
    return LocationAbl.create(ucEnv.getUri(), ucEnv.getDtoIn());
  }
}

module.exports = new LocationController();
