"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class TripMongo extends UuObjectDao {
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
  async list(awid, pageInfo, sort) {
    return await super.find({ awid }, pageInfo, sort);
  }
  async update(uuObject) {
    const { awid, id } = uuObject;

    return await super.findOneAndUpdate({ awid, _id: id }, uuObject, "NONE");
  }
  async delete(uuObject) {
    const filter = {
      awid: uuObject.awid,
      id: uuObject.id,
    };
    return await super.deleteOne(filter);
  }
}

module.exports = TripMongo;
