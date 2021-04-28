/* eslint-disable */
const tripCreateDtoInType = shape({
  name: uu5String(100).isRequired(),
  locationId: id().isRequired(),
  capacity: integer(100).isRequired(),
  date: date(),
  description: uu5String(5000),
  image: binary(),
  participantList: array(id()),
});
