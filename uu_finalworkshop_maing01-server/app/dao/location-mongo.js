"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class LocationMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1 }, { unique: true });
  }
  async create(uuObject) {
    return await super.insertOne(uuObject);
  }
  async get(awid, id) {
    const filter = { awid, id };
    return await super.findOne(filter);
  }
  async list(awid, pageInfo) {
    return await super.find({ awid }, pageInfo);
  }
}

module.exports = LocationMongo;
