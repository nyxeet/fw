//@@viewOn:imports
import UU5 from "uu5g04";
import Uu5Tiles from "uu5tilesg02";
import { createVisualComponent, useCall, useEffect } from "uu5g04-hooks";
import Config from "./config/config";
import Calls from "../calls";

//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "LocationList",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const LocationList = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:hooks
    let { call, viewState, data, error } = useCall(Calls.listLocation);

    useEffect(() => {
      call({});
    }, []);
    //@@viewOff:hooks
    //@@viewOn:private

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render

    const className = Config.Css.css``;

    return (
      <>
        <UU5.Bricks.Header level={2} content={"Location list"} />
        {data &&
          data.itemList.map((item) => {
            return (
              <UU5.Bricks.Card key={item.id}>
                <UU5.Bricks.Text style={{ fontSize: "25px" }}>Location name:{item.name}</UU5.Bricks.Text>
                <UU5.Bricks.Text style={{ fontSize: "25px" }}>id:{item.id}</UU5.Bricks.Text>
              </UU5.Bricks.Card>
            );
          })}
      </>
    );
    //@@viewOff:render
  },
});

export default LocationList;
