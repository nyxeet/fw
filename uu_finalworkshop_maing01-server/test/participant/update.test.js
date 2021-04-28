const { TestHelper } = require("uu_appg01_server-test");

const initUuAppWorkspaceDtoIn = {
  uuAppProfileAuthorities: "urn:uu:GGPLUS4U",
};

const USECASE = "participant/update";
const COMMONERRORCODE = `uu-finalworkshop-main/${USECASE}`;
const DTOIN = {
  name: "test",
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
    expect.assertions(5);

    const {
      data: { id, name },
    } = await TestHelper.executePostCommand("participant/create", DTOIN);
    const {
      status,
      data: { id: newId, name: newName, uuAppErrorMap },
    } = await TestHelper.executePostCommand(USECASE, { id, name: "newName" });

    expect(status).toEqual(200);
    expect(name).toEqual(DTOIN.name);
    expect(newName).toEqual("newName");
    expect(uuAppErrorMap).toBeDefined();
    expect(id).toEqual(newId);
  });
  test("Unsupported keys", async () => {
    const {
      status,
      data: { id },
    } = await TestHelper.executePostCommand("participant/create", DTOIN);
    const {
      data: { uuAppErrorMap },
    } = await TestHelper.executePostCommand(USECASE, { id, name: "test", text: "text" });

    const warningObject = `${COMMONERRORCODE}/unsupportedKeys`;
    const { type, message } = uuAppErrorMap[warningObject];

    expect(type).toEqual("warning");
    expect(message).toEqual("DtoIn contains unsupported keys.");
  });
  test("InvalidDtoIn", async () => {
    const errorCode = `${COMMONERRORCODE}/invalidDtoIn`;
    expect.assertions(2);

    try {
      await TestHelper.executePostCommand(USECASE, { invalid: "DtoIn" });
    } catch (e) {
      expect(e.code).toEqual(errorCode);
      expect(e.status).toEqual(400);
    }
  });
  test("ParticipantDoesNotExist", async () => {
    const errorCode = `${COMMONERRORCODE}/participantDoesNotExist`;
    expect.assertions(2);

    try {
      await TestHelper.executePostCommand(USECASE, { id: "6076ea42c3e04c3b0c0fcdcd", name: "hehehe" });
    } catch (e) {
      expect(e.code).toEqual(errorCode);
      expect(e.status).toEqual(400);
    }
  });
  test("travelAgencyInstanceNotInProperState", async () => {
    const errorCode = `uu-finalworkshop-main/participant/main/travelAgencyInstanceNotInProperState`;
    await TestHelper.executeDbScript(`db.${MAIN_DB}.updateOne( {awid: '${awid}'},{$set:{state: "passive"}})`);

    try {
      await TestHelper.executePostCommand(USECASE, DTOIN);
    } catch (e) {
      expect(e.code).toEqual(errorCode);
      expect(e.status).toEqual(400);
    }
  });
  test("TravelAgencyInstanceDoesNotExist", async () => {
    const errorCode = `uu-finalworkshop-main/participant/main/travelAgencyInstanceDoesNotExist`;
    await TestHelper.executeDbScript(`db.${MAIN_DB}.drop()`);

    try {
      await TestHelper.executePostCommand(USECASE, DTOIN);
    } catch (e) {
      expect(e.code).toEqual(errorCode);
      expect(e.status).toEqual(400);
    }
  });
});
