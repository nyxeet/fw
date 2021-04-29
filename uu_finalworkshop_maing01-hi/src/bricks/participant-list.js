//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponentWithRef, useRef, useContext, useEffect } from "uu5g04-hooks";
import Config from "./config/config";
import ParticipantCreateModal from "./participant-create-modal";
import ParticipantUpdateModal from "./participant-update-modal";
import ParticipantContext from "./participant-context";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "ParticipantList",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const ParticipantList = createVisualComponentWithRef({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render({ participants, tripId }) {
    const modalRef = useRef();
    const updateModalRef = useRef();

    const { data: participantsList, handlerMap } = useContext(ParticipantContext);
    useEffect(() => {
      if (participants.length > 0) {
        handlerMap.load({ ids: participants });
      }
    }, [participants]);
    //@@viewOn:private
    function openModal() {
      modalRef.current.open();
    }
    function openUpdateModal(id) {
      updateModalRef.current.open(id);
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const className = Config.Css.css``;

    return (
      <>
        <UU5.Bricks.Card style={{ display: "flex", alignItems: "center" }}>
          <UU5.Bricks.Text content={"Participant list:"} style={{ fontSize: "25px" }} />
          <UU5.Bricks.Button
            size="l"
            onClick={() => openModal(tripId)}
            colorSchema={"info"}
            style={{ marginLeft: "auto" }}
          >
            <UU5.Bricks.Icon icon="mdi-plus" />
          </UU5.Bricks.Button>
        </UU5.Bricks.Card>
        {participantsList &&
          participantsList.map((item) => {
            return (
              <UU5.Bricks.Row key={item.id}>
                <UU5.Bricks.Card style={{ display: "flex", alignItems: "center" }}>
                  <UU5.Bricks.Image
                    src="https://opencartforum.com/storage/attachment/monthly_2020_06/no-img.png.056bf2e130881dec0f753ea5d0228c26.png"
                    width="100px"
                    height="100px"
                  />

                  <UU5.Bricks.Text content={item.data.name} style={{ fontSize: "25px" }} />

                  <UU5.Bricks.ButtonGroup size="l" vertical style={{ marginLeft: "auto" }}>
                    <UU5.Bricks.Button onClick={() => openUpdateModal(item)} colorSchema={"info"}>
                      <UU5.Bricks.Icon icon="mdi-pencil" />
                    </UU5.Bricks.Button>
                    <UU5.Bricks.Button onClick={() => {}} colorSchema={"danger"}>
                      <UU5.Bricks.Icon icon="mdi-close" />
                    </UU5.Bricks.Button>
                  </UU5.Bricks.ButtonGroup>
                </UU5.Bricks.Card>
              </UU5.Bricks.Row>
            );
          })}
        <ParticipantCreateModal ref={modalRef} tripId={tripId} />
        <ParticipantUpdateModal ref={updateModalRef} />
      </>
    );
    //@@viewOff:render
  },
});

export default ParticipantList;
