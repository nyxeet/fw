/* eslint-disable */
const participantCreateDtoInType = shape({
  name: uu5String(255).isRequired(),
  surname: uu5String(255),
  passportId: uu5String(9),
  internationalId: uu5String(9),
  insurance: integer(),
  email: string(320),
  tripId: id().isRequired(),
});
const participantUpdateDtoInType = shape({
  id: id().isRequired(),
  name: uu5String(255),
  surname: uu5String(255),
  passportId: uu5String(9),
  internationalId: uu5String(9),
  insurance: integer(),
  email: string(320),
});
