const { Workspace } = require("uu_appg01_server");
const { TestHelper } = require("uu_appg01_server-test");

const initUuAppWorkspaceDtoIn = {
  uuAppProfileAuthorities: "urn:uu:GGPLUS4U",
};

const USECASE = "trip/get";
const COMMONERRORCODE = `uu-finalworkshop-main/${USECASE}`;
const DTOIN = {
  name: "test",
  locationId: "606dc9a628dce24634a41885",
  capacity: 5,
  participantList: [],
};
const awid = "22222222222222222222222222222222";
const MAIN_DB = "finalworkshopMain";

beforeAll(async () => {
  await TestHelper.setup();
  await TestHelper.initUuSubAppInstance();
  await TestHelper.createUuAppWorkspace();
  await TestHelper.initUuAppWorkspace(initUuAppWorkspaceDtoIn);
});

beforeEach(async () => {
  await TestHelper.login("Executives");
});

afterAll(async () => {
  await TestHelper.teardown();
});

describe(`Testing ${USECASE} uuCmd...`, () => {
  test("HDS", async () => {
    expect.assertions(4);

    const {
      data: { id },
    } = await TestHelper.executePostCommand("trip/create", DTOIN);

    const {
      status,
      data: { name, locationId, id: getId, uuAppErrorMap },
    } = await TestHelper.executeGetCommand("trip/get", { id });

    expect(status).toEqual(200);
    expect(name).toEqual(DTOIN.name);
    expect(uuAppErrorMap).toBeDefined();
    expect(id).toEqual(getId);
  });
  test("Unsupported keys", async () => {
    const {
      data: { id },
    } = await TestHelper.executePostCommand("trip/create", DTOIN);
    const {
      data: { uuAppErrorMap },
    } = await TestHelper.executeGetCommand("trip/get", { id, text: "test" });

    const warningObject = `${COMMONERRORCODE}/unsupportedKeys`;
    const { type, message } = uuAppErrorMap[warningObject];

    expect(type).toEqual("warning");
    expect(message).toEqual("DtoIn contains unsupported keys.");
  });
  test("InvalidDtoIn", async () => {
    const errorCode = `${COMMONERRORCODE}/invalidDtoIn`;
    expect.assertions(2);

    try {
      await TestHelper.executeGetCommand(USECASE, { invalid: "DtoIn" });
    } catch (e) {
      expect(e.code).toEqual(errorCode);
      expect(e.status).toEqual(400);
    }
  });
  test("TripDoseNotExist", async () => {
    const errorCode = `${COMMONERRORCODE}/tripDoesNotExist`;
    expect.assertions(2);

    try {
      await TestHelper.executeGetCommand(USECASE, { id: "6076ea42c3e04c3b0c0fcdcd" });
    } catch (e) {
      expect(e.code).toEqual(errorCode);
      expect(e.status).toEqual(400);
    }
  });
  test("travelAgencyInstanceNotInProperState", async () => {
    const errorCode = `uu-finalworkshop-main/trip/main/travelAgencyInstanceNotInProperState`;

    await TestHelper.executeDbScript(`db.${MAIN_DB}.updateOne( {awid: '${awid}'},{$set:{state: 'passive'}})`);

    try {
      await TestHelper.executeGetCommand(USECASE, { id: "606dc9a628dce24634a41885" });
    } catch (e) {
      expect(e.code).toEqual(errorCode);
      expect(e.status).toEqual(400);
    }
  });
  test("TravelAgencyInstanceDoesNotExist", async () => {
    const errorCode = `uu-finalworkshop-main/trip/main/travelAgencyInstanceDoesNotExist`;
    await TestHelper.executeDbScript(`db.${MAIN_DB}.drop()`);

    try {
      await TestHelper.executeGetCommand(USECASE, { id: "606dc9a628dce24634a41885" });
    } catch (e) {
      expect(e.code).toEqual(errorCode);
      expect(e.status).toEqual(400);
    }
  });
});
