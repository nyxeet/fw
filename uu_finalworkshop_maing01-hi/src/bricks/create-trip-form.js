//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useLsiValues, useRef } from "uu5g04-hooks";
import Config from "./config/config";
import Lsi from "./trip-form-lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "TripCreateForm",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const TripCreateForm = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render({ handleSave, handleCancel }) {
    const inputLsi = useLsiValues(Lsi);
    const imageRef = useRef();
    //@@viewOn:private

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render

    return (
      <UU5.Forms.ContextSection
        level={2}
        header={
          <UU5.Forms.ContextHeader
            content={<UU5.Bricks.Lsi lsi={Lsi.header} />}
            info={<UU5.Bricks.Lsi lsi={Lsi.info} />}
          />
        }
      >
        <UU5.Forms.ContextForm onSave={handleSave} onCancel={handleCancel}>
          <UU5.Bricks.Row>
            <UU5.Bricks.Column colWidth="m-6">
              <UU5.Forms.Text label={inputLsi.name} name="name" inputAttrs={{ maxLength: 255 }} required />
            </UU5.Bricks.Column>
            <UU5.Bricks.Column colWidth="m-6">
              <UU5.Forms.Text label={inputLsi.location} name="locationId" required inputAttrs={{ maxLength: 255 }} />
            </UU5.Bricks.Column>
          </UU5.Bricks.Row>

          <UU5.Bricks.Row>
            <UU5.Bricks.Column colWidth="m-6">
              <UU5.Forms.File ref_={imageRef} label={inputLsi.image} name="image" />
            </UU5.Bricks.Column>
            <UU5.Bricks.Column colWidth="m-6">
              <UU5.Forms.DatePicker
                name="date"
                label="Date"
                valueType="iso"
                placeholder={UU5.Common.Tools.getDateString("1990-11-21", { country: "cs-cz" })}
                size="s"
              />
            </UU5.Bricks.Column>
          </UU5.Bricks.Row>
          <UU5.Bricks.Row>
            <UU5.Bricks.Column colWidth="m-6">
              <UU5.Forms.Text label={inputLsi.description} name="description" inputAttrs={{ maxLength: 255 }} />
            </UU5.Bricks.Column>
            <UU5.Bricks.Column colWidth="m-6">
              <UU5.Forms.Text label={inputLsi.capacity} name="capacity" required inputAttrs={{ maxLength: 255 }} />
            </UU5.Bricks.Column>
          </UU5.Bricks.Row>

          <UU5.Forms.ContextControls buttonSubmitProps={{ content: <UU5.Bricks.Lsi lsi={Lsi.submit} /> }} />
        </UU5.Forms.ContextForm>
      </UU5.Forms.ContextSection>
    );
    //@@viewOff:render
  },
});

export default TripCreateForm;
