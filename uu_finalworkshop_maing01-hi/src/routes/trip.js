//@@viewOn:imports
import UU5 from "uu5g04";
import Uu5Tiles from "uu5tilesg02";
import { createVisualComponentWithRef, useRef, useContext } from "uu5g04-hooks";
import Config from "./config/config";

import TripContext from "../bricks/trip-context";

import Calls from "../calls";

//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Trip",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const Students = createVisualComponentWithRef({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:hooks
    const { state, data, newData, pendingData, errorData, handlerMap } = useContext(TripContext);
    //@@viewOff:hooks
    //@@viewOn:private

    function handleTripDetails(id) {
      UU5.Environment.setRoute("tripDetails", { id });
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render

    function renderLoad() {
      return <UU5.Bricks.Loading />;
    }
    function renderTile(tripsData) {
      const trip = tripsData.data.data;
      return (
        <UU5.Bricks.Card key={trip.id} style={{ display: "flex", alignItems: "center" }}>
          <UU5.Bricks.Div>
            <UU5.Bricks.Text style={{ fontSize: "25px" }}>{trip.name}</UU5.Bricks.Text>

            <UU5.Bricks.Button content={`Details ${trip.name}`} onClick={() => handleTripDetails(trip.id)} />
          </UU5.Bricks.Div>
          <UU5.Bricks.Image
            style={{ marginLeft: "auto" }}
            width="150px"
            src={Calls.getCommandUri(`/uu-app-binarystore/getBinaryData?code=${trip.userPic}`)}
            authenticate
          />
        </UU5.Bricks.Card>
      );
    }

    function renderReady(trips, handlerMap) {
      return (
        <>
          <Uu5Tiles.Grid
            data={trips}
            tileHeight="auto"
            tileMinWidth={200}
            tileMaxWidth={400}
            tileSpacing={8}
            rowSpacing={8}
          >
            {renderTile}
          </Uu5Tiles.Grid>
        </>
      );
    }

    function renderError(errorData) {
      switch (errorData.operation) {
        case "load":
        case "loadNext":
        default:
          return <UU5.Bricks.Error content="Error happened!" error={errorData.error} errorData={errorData.data} />;
      }
    }
    const className = Config.Css.css``;
    const attrs = UU5.Common.VisualComponent.getAttrs(props, className);

    return (
      <>
        <UU5.Bricks.Container>
          <UU5.Bricks.Header level={2} content={"Trip list"} />
          {() => {
            switch (state) {
              case "pending":
              case "pendingNoData":
                return renderLoad();
              case "error":
              case "errorNoData":
                return renderError(errorData);
              case "itemPending":
              case "ready":
              case "readyNoData":
              default:
                return renderReady(data, handlerMap);
            }
          }}
        </UU5.Bricks.Container>
      </>
    );
    //@@viewOff:render
  },
});

export default Students;
