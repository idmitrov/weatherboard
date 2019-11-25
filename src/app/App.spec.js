import React from 'react';
import App from './App';
import { shallow } from 'enzyme';

describe('App', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App />)
  });

  test('Should render piroperly', () => {
    expect(wrapper).toBeTruthy();
  });
});
