const { TestHelper } = require("uu_appg01_server-test");

const initUuAppWorkspaceDtoIn = {
  uuAppProfileAuthorities: "urn:uu:GGPLUS4U",
};

const USECASE = "trip/delete";
const COMMONERRORCODE = `uu-finalworkshop-main/${USECASE}`;
const DTOIN = { forceDelete: false };
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
    const {
      data: { id },
    } = await TestHelper.executePostCommand("trip/create", {
      name: "test",
      locationId: "606dc9a628dce24634a41885",
      capacity: 5,
      participantList: [],
    });

    const { status } = await TestHelper.executePostCommand(USECASE, { id, ...DTOIN });

    expect(status).toEqual(200);
  });
  test("Unsupported keys", async () => {
    const {
      data: { id },
    } = await TestHelper.executePostCommand("trip/create", {
      name: "test",
      locationId: "606dc9a628dce24634a41885",
      capacity: 5,
      participantList: [],
    });
    const {
      data: { uuAppErrorMap },
    } = await TestHelper.executePostCommand(USECASE, { id, ...DTOIN, unsup: "unsup" });

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
  test("TripDoesNotExist", async () => {
    const errorCode = `${COMMONERRORCODE}/tripDoesNotExist`;
    expect.assertions(2);

    try {
      await TestHelper.executePostCommand(USECASE, { id: "6076ea42c3e04c3b0c0fcdcc", ...DTOIN });
    } catch (e) {
      expect(e.code).toEqual(errorCode);
      expect(e.status).toEqual(400);
    }
  });
  test("ListNotEmpty", async () => {
    const errorCode = `${COMMONERRORCODE}/relatedParticipantsExist`;
    expect.assertions(2);

    const {
      data: { id },
    } = await TestHelper.executePostCommand("trip/create", {
      name: "test",
      locationId: "606dc9a628dce24634a41885",
      capacity: 5,
      participantList: ["6076ea42c3e04c3b0c0fcdcc"],
    });

    try {
      await TestHelper.executePostCommand(USECASE, { id, forceDelete: false });
    } catch (e) {
      expect(e.code).toEqual(errorCode);
      expect(e.status).toEqual(400);
    }
  });
  test("travelAgencyInstanceNotInProperState", async () => {
    const errorCode = `uu-finalworkshop-main/trip/main/travelAgencyInstanceNotInProperState`;

    await TestHelper.executeDbScript(`db.${MAIN_DB}.updateOne( {awid: '${awid}'},{$set:{state: 'passive'}})`);

    try {
      await TestHelper.executePostCommand(USECASE, { id: "606dc9a628dce24634a41885", ...DTOIN });
    } catch (e) {
      expect(e.code).toEqual(errorCode);
      expect(e.status).toEqual(400);
    }
  });
  test("TravelAgencyInstanceDoesNotExist", async () => {
    const errorCode = `uu-finalworkshop-main/trip/main/travelAgencyInstanceDoesNotExist`;
    await TestHelper.executeDbScript(`db.${MAIN_DB}.drop()`);

    try {
      await TestHelper.executePostCommand(USECASE, { id: "606dc9a628dce24634a41885", ...DTOIN });
    } catch (e) {
      expect(e.code).toEqual(errorCode);
      expect(e.status).toEqual(400);
    }
  });
});
