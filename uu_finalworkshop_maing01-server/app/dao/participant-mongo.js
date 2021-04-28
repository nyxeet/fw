"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class ParticipantMongo extends UuObjectDao {
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
  async update(uuObject) {
    const { awid, id } = uuObject;

    return await super.findOneAndUpdate({ awid, _id: id }, uuObject, "NONE");
  }
}

module.exports = ParticipantMongo;
