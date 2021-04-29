//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useLsiValues, useRef } from "uu5g04-hooks";
import Calls from "../calls";
import Config from "./config/config";
import Lsi from "./participant-form-lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "ParticipantUpdateForm",
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

  render({ item, handleSave, handleCancel }) {
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
              <UU5.Forms.Text
                value={item.data.name}
                label={inputLsi.name}
                name="name"
                inputAttrs={{ maxLength: 255 }}
                required
              />
            </UU5.Bricks.Column>
            <UU5.Bricks.Column colWidth="m-6">
              <UU5.Forms.Text
                value={item.data.surname}
                label={inputLsi.surname}
                name="surname"
                inputAttrs={{ maxLength: 255 }}
              />
            </UU5.Bricks.Column>
          </UU5.Bricks.Row>

          <UU5.Bricks.Row>
            <UU5.Bricks.Column colWidth="m-6">
              <UU5.Forms.Text
                value={item.data.passportId}
                label={inputLsi.passportId}
                name="passportId"
                inputAttrs={{ maxLength: 255 }}
              />
            </UU5.Bricks.Column>
            <UU5.Bricks.Column colWidth="m-6">
              <UU5.Forms.Text
                value={item.data.internationalId}
                label={inputLsi.internationalId}
                name="internationalId"
                inputAttrs={{ maxLength: 255 }}
              />
            </UU5.Bricks.Column>
          </UU5.Bricks.Row>
          <UU5.Bricks.Row>
            <UU5.Bricks.Column colWidth="m-6">
              <UU5.Forms.Text
                value={item.data.insurance}
                label={inputLsi.insurance}
                name="insurance"
                inputAttrs={{ maxLength: 255 }}
              />
            </UU5.Bricks.Column>
            <UU5.Bricks.Column colWidth="m-6">
              <UU5.Forms.Text label={inputLsi.email} name="email" inputAttrs={{ maxLength: 255 }} />
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
