import UU5 from "uu5g04";
import UuFinalworkshop from "uu_finalworkshop_maing01-hi";

const { shallow } = UU5.Test.Tools;

describe(`UuFinalworkshop.Bricks.TripDescription`, () => {
  it(`default props`, () => {
    const wrapper = shallow(<UuFinalworkshop.Bricks.TripDescription />);
    expect(wrapper).toMatchSnapshot();
  });
});
