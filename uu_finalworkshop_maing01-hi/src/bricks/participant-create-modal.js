//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponentWithRef, useRef, useImperativeHandle, useCall, useContext } from "uu5g04-hooks";
import Config from "./config/config";
import TripContext from "./trip-context";
import CreateParticipantForm from "./create-participant-form";
import Calls from "../calls";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "ParticipantCreateModal",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const StudentModal = createVisualComponentWithRef({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render({ tripId }, ref) {
    const modalRef = useRef();
    const { handlerMap } = useContext(TripContext);

    useImperativeHandle(ref, () => ({
      open: () => {
        modalRef.current.open({
          header: <UU5.Bricks.Text content={"Create participant"} />,
          content: <CreateParticipantForm handleSave={handleCreate} handleCancel={handleCancel} />,
        });
      },
    }));
    //@@viewOn:private
    function handleCreate(opt) {
      modalRef.current.close(true, () => {
        handlerMap.createParticipant({ ...opt.values, tripId });
      });
    }
    function handleCancel() {
      modalRef.current.close();
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const className = Config.Css.css``;

    return <UU5.Bricks.Modal size="l" ref_={modalRef} />;
    //@@viewOff:render
  },
});

export default StudentModal;
