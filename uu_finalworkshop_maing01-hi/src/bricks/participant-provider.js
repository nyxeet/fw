//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useDataList } from "uu5g04-hooks";
import Calls from "../calls";
import Config from "./config/config";
import ParticipantContext from "./participant-context";

//@@viewOff:imports

export const TripProvider = createComponent({
  displayName: Config.TAG + "ParticipantProvider",

  render({ children }) {
    //@@viewOn:hooks
    let listDataValues = useDataList({
      pageSize: 200,
      handlerMap: {
        load: Calls.listParticipant,
        updateParticipant: Calls.updateParticipant,
        createParticipant: Calls.createParticipant,
      },
      skipInitialLoad: true,
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
      <ParticipantContext.Provider value={{ state, data, newData, pendingData, errorData, handlerMap }}>
        {children}
      </ParticipantContext.Provider>
    );
    //@@viewOff:render
  },
});

export default TripProvider;
