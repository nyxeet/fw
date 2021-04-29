"use strict";
const LocationAbl = require("../../abl/location/create-abl");
const LocationListAbl = require("../../abl/location/list-abl");

class LocationController {
  list(ucEnv) {
    return LocationListAbl.list(ucEnv.getUri(), ucEnv.getDtoIn());
  }
  create(ucEnv) {
    return LocationAbl.create(ucEnv.getUri(), ucEnv.getDtoIn());
  }
}

module.exports = new LocationController();
