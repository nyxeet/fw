const { TestHelper } = require("uu_appg01_server-test");

const initUuAppWorkspaceDtoIn = {
  uuAppProfileAuthorities: "urn:uu:GGPLUS4U",
};

const USECASE = "trip/list";
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

afterAll(async () => {
  await TestHelper.teardown();
});
beforeEach(async () => {
  await TestHelper.login("Executives");
});

describe(`Testing ${USECASE} uuCmd...`, () => {
  test("HDS", async () => {
    expect.assertions(4);

    await TestHelper.executePostCommand("trip/create", { ...DTOIN, name: "test1" });
    await TestHelper.executePostCommand("trip/create", { ...DTOIN, name: "test2" });
    await TestHelper.executePostCommand("trip/create", { ...DTOIN, name: "test3" });

    const {
      status,
      data: { itemList, uuAppErrorMap },
    } = await TestHelper.executeGetCommand(USECASE, {
      sortBy: "name",
      order: "desc",
    });

    expect(status).toEqual(200);
    expect(itemList.length).toEqual(3);
    expect(itemList[0].name).toEqual("test3");
    expect(uuAppErrorMap).toBeDefined();
  });
  test("Unsupported keys", async () => {
    const {
      data: { uuAppErrorMap },
    } = await TestHelper.executeGetCommand(USECASE, { unsup: "unsup" });

    const warningObject = `${COMMONERRORCODE}/unsupportedKeys`;

    const { type, message } = uuAppErrorMap[warningObject];

    expect(type).toEqual("warning");
    expect(message).toEqual("DtoIn contains unsupported keys.");
  });
  test("InvalidDtoIn", async () => {
    const errorCode = `${COMMONERRORCODE}/invalidDtoIn`;
    expect.assertions(2);

    try {
      await TestHelper.executeGetCommand(USECASE, {
        sortBy: 3,
        pageInfo: {
          pageIndex: "abs",
          pageSize: "hehe",
        },
      });
    } catch (e) {
      expect(e.code).toEqual(errorCode);
      expect(e.status).toEqual(400);
    }
  });
  test("travelAgencyInstanceNotInProperState", async () => {
    const errorCode = `uu-finalworkshop-main/trip/main/travelAgencyInstanceNotInProperState`;

    await TestHelper.executeDbScript(`db.${MAIN_DB}.updateOne( {awid: '${awid}'},{$set:{state: 'passive'}})`);

    try {
      await TestHelper.executeGetCommand(USECASE, {});
    } catch (e) {
      expect(e.code).toEqual(errorCode);
      expect(e.status).toEqual(400);
    }
  });
  test("TravelAgencyInstanceDoesNotExist", async () => {
    const errorCode = `uu-finalworkshop-main/trip/main/travelAgencyInstanceDoesNotExist`;
    await TestHelper.executeDbScript(`db.${MAIN_DB}.drop()`);

    try {
      await TestHelper.executeGetCommand(USECASE, {});
    } catch (e) {
      expect(e.code).toEqual(errorCode);
      expect(e.status).toEqual(400);
    }
  });
});
