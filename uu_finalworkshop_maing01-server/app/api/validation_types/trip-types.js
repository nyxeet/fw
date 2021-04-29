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
const tripUpdateDtoInType = shape({
  id: id().isRequired(),
  name: uu5String(100),
  locationId: id(),
  capacity: integer(100),
  date: date(),
  description: uu5String(5000),
  image: binary(),
  newParticipant: id(),
});
const tripGetDtoInType = shape({
  id: id().isRequired(),
});

const tripListDtoInType = shape({
  sortBy: oneOf(["name", "date"]),
  order: oneOf(["asc", "desc"]),
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer(),
  }),
});
const tripDeleteDtoInType = shape({
  id: id().isRequired(),
  forceDelete: boolean(),
});
