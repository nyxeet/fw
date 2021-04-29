//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useEffect, useContext, useCall } from "uu5g04-hooks";
import Config from "./config/config";
import Calls from "../calls";
import TripContext from "./trip-context";
import TripDescription from "./trip-description";
import ParticipantList from "./participant-list";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "TripDetails",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const TripDetails = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    let details = null;

    const { state, handlerMap } = useContext(TripContext);
    let { call, viewState, data, error } = useCall(Calls.getTrip);

    useEffect(() => {
      const currentId = props?.params?.id;
      if (currentId) {
        call({ id: currentId });
      }
    }, [props?.params?.id]);
    //@@viewOn:private

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const className = Config.Css.css``;
    const attrs = UU5.Common.VisualComponent.getAttrs(props, className);

    return (
      <UU5.Bricks.Container>
        {data && (
          <UU5.Bricks.Card>
            <TripDescription item={data} />
            <ParticipantList participants={data.participantList} tripId={props?.params?.id} />
          </UU5.Bricks.Card>
        )}
      </UU5.Bricks.Container>
    );
    //@@viewOff:render
  },
});

export default TripDetails;
