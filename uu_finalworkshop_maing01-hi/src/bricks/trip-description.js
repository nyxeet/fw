//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponentWithRef, useCall, useRef, useContext } from "uu5g04-hooks";
import Config from "./config/config";
import TripCreateModal from "./trip-create-modal";
import TripUpdateModal from "./trip-update-modal";
import TripContext from "../bricks/trip-context";
import Calls from "../calls";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "TripDescription",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const TripDescription = createVisualComponentWithRef({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render({ item }) {
    const modalRef = useRef();
    const updateModalRef = useRef();
    const { handlerMap } = useContext(TripContext);
    //@@viewOn:private
    function openModal(item) {
      modalRef.current.open(item);
    }
    function openUpdateModal(item) {
      updateModalRef.current.open(item);
    }
    function deleteTrip(id) {
      handlerMap.deleteTrip({ id, forceDelete: true });
      UU5.Environment.setRoute("tripList");
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const className = Config.Css.css``;

    return (
      <>
        <UU5.Bricks.Row>
          <UU5.Bricks.Card style={{ display: "flex" }}>
            <UU5.Bricks.Text content={item.name} style={{ fontSize: "25px" }} />
            <UU5.Bricks.ButtonGroup size="l" style={{ marginLeft: "auto" }}>
              <UU5.Bricks.Button onClick={() => openModal(item)} colorSchema={"info"}>
                <UU5.Bricks.Icon icon="mdi-plus" />
              </UU5.Bricks.Button>
              <UU5.Bricks.Button onClick={() => {}} colorSchema={"warning"}>
                <UU5.Bricks.Icon icon="mdi-pencil" />
              </UU5.Bricks.Button>
              <UU5.Bricks.Button onClick={() => deleteTrip(item.id)} colorSchema={"danger"}>
                <UU5.Bricks.Icon icon="mdi-close" />
              </UU5.Bricks.Button>
            </UU5.Bricks.ButtonGroup>
          </UU5.Bricks.Card>
        </UU5.Bricks.Row>
        <UU5.Bricks.Row>
          <UU5.Bricks.Card style={{ display: "flex", alignItems: "center" }}>
            <UU5.Bricks.Icon icon="plus4u-earth" style={{ fontSize: "25px" }} colorSchema="info" />
            <UU5.Bricks.Text content={`Location id: ${item.locationId}`} style={{ fontSize: "25px" }} />
          </UU5.Bricks.Card>
        </UU5.Bricks.Row>
        <UU5.Bricks.Row>
          <UU5.Bricks.Card style={{ display: "flex", alignItems: "center" }}>
            <UU5.Bricks.Icon icon="plus4u-group" style={{ fontSize: "25px" }} colorSchema="info" />
            <UU5.Bricks.Text content={`Capacity: ${item.capacity}`} style={{ fontSize: "25px" }} />
          </UU5.Bricks.Card>
        </UU5.Bricks.Row>
        <UU5.Bricks.Row>
          <UU5.Bricks.Card style={{ display: "flex", alignItems: "center" }}>
            <UU5.Bricks.Icon icon="plus4u-table" style={{ fontSize: "25px" }} colorSchema="info" />
            <UU5.Bricks.Text content={`Trip date: ${item.date ? item.date : "No date"}`} style={{ fontSize: "25px" }} />
          </UU5.Bricks.Card>
        </UU5.Bricks.Row>
        <TripCreateModal ref={modalRef} item={item} />
        <TripUpdateModal ref={updateModalRef} />
      </>
    );
    //@@viewOff:render
  },
});

export default TripDescription;
