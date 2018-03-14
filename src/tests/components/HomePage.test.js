import React from 'react';
import { shallow } from 'enzyme';
import HomePage from 'components/HomePage/HomePage.jsx';

test('Should render HomePage component correctly', () => {
  const wrapper = shallow(<HomePage />);

  expect(wrapper).toMatchSnapshot();
})
