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

export const CreateModal = createVisualComponentWithRef({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render({ item }, ref) {
    const modalRef = useRef();
    const { state, data, newData, pendingData, errorData, handlerMap } = useContext(TripContext);

    useImperativeHandle(ref, () => ({
      open: () => {
        modalRef.current.open({
          header: <UU5.Bricks.Text content={"Create trip"} />,
          content: <CreateTripForm handleSave={handleCreate} handleCancel={handleCancel} />,
        });
      },
    }));
    //@@viewOn:private
    function showError(content) {
      UU5.Environment.getPage().getAlertBus().addAlert({
        content,
        colorSchema: "red",
      });
    }
    async function handleCreate(opt) {
      try {
        await handlerMap.createTrip({ ...opt.values });
        modalRef.current.close();
      } catch (error) {
        showError(error.message);
      }
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

export default CreateModal;
