import React from 'react';
import { shallow } from 'enzyme';
import ProductList from '../ProductList';


describe('MyComponent', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<ProductList debug />);
  
    expect(component).toMatchSnapshot();
  });
});