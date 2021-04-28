"use strict";
const FinalworkshopMainAbl = require("../../abl/finalworkshop-main-abl.js");

class FinalworkshopMainController {
  init(ucEnv) {
    return FinalworkshopMainAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }
}

module.exports = new FinalworkshopMainController();
