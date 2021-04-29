//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useDataList, useDataObject } from "uu5g04-hooks";
import Calls from "../calls";
import Config from "./config/config";
import TripContext from "./trip-context";

//@@viewOff:imports

export const TripProvider = createComponent({
  displayName: Config.TAG + "TripProvider",

  render({ children }) {
    //@@viewOn:hooks
    let listDataValues = useDataList({
      pageSize: 200,
      handlerMap: {
        load: Calls.listTrip,
        getTrip: Calls.getTrip,
        updateTrip: Calls.updateTrip,
        createParticipant: Calls.createParticipant,
        createTrip: Calls.createTrip,
        deleteTrip: Calls.deleteTrip,
      },
      itemHandlerMap: {
        createParticipant: Calls.createParticipant,
      },
    });
    let { state, data, newData, pendingData, errorData, handlerMap } = listDataValues;
    //@@viewOff:hooks

    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const className = Config.Css.css``;
    return (
      <TripContext.Provider value={{ state, data, newData, pendingData, errorData, handlerMap }}>
        {children}
      </TripContext.Provider>
    );
    //@@viewOff:render
  },
});

export default TripProvider;
