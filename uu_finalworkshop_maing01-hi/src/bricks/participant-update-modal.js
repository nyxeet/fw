//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponentWithRef, useRef, useImperativeHandle, useCall, useContext } from "uu5g04-hooks";
import Config from "./config/config";
import ParticipantContext from "./participant-context";
import UpdateParticipantForm from "./update-participant-form";
import Calls from "../calls";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "ParticipantUpdateModal",
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

  render(props, ref) {
    const updateModalRef = useRef();
    const currentIdRef = useRef();
    const { handlerMap } = useContext(ParticipantContext);

    useImperativeHandle(ref, () => ({
      open: (item) => {
        currentIdRef.current = item;
        updateModalRef.current.open({
          header: <UU5.Bricks.Text content={"Update participant"} />,
          content: <UpdateParticipantForm item={item} handleSave={handleUpdate} handleCancel={handleCancel} />,
        });
      },
    }));
    //@@viewOn:private
    function handleUpdate(opt) {
      updateModalRef.current.close(true, () => {
        handlerMap.updateParticipant({ ...opt.values, id: currentIdRef.current.data.id });
      });
    }
    function handleCancel() {
      updateModalRef.current.close();
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const className = Config.Css.css``;

    return <UU5.Bricks.Modal size="l" ref_={updateModalRef} />;
    //@@viewOff:render
  },
});

export default StudentModal;
