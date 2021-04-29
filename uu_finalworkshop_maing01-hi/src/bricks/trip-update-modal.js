//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponentWithRef, useRef, useImperativeHandle, useCall, useContext } from "uu5g04-hooks";
import Config from "./config/config";
import TripContext from "./trip-context";
import CreateTripForm from "./create-trip-form";
import Calls from "../calls";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "TripModal",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const UpdateModal = createVisualComponentWithRef({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render({ item }, ref) {
    const updateModalRef = useRef();
    const { state, data, newData, pendingData, errorData, handlerMap } = useContext(TripContext);

    useImperativeHandle(ref, () => ({
      open: (item) => {
        updateModalRef.current.open({
          header: <UU5.Bricks.Text content={"Update trip"} />,
          content: <CreateTripForm item={item} handleSave={handleUpdate} handleCancel={handleCancel} />,
        });
      },
    }));
    //@@viewOn:private
    function handleUpdate(opt) {
      console.log(opt.values);
      updateModalRef.current.close(true, () => {
        handlerMap.updateTrip({ ...opt.values });
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

export default UpdateModal;
