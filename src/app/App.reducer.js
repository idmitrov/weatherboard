import { appActionTypes } from './App.actions';

const appDefaults = {
  isDrawerOpened: false,
};

const appReducer = (state = appDefaults, action = {}) => {
  switch (action.type) {
    case appActionTypes.setDrawerOpened: {
      const newState = {
        ...state,
        isDrawerOpened: action.payload
      };

      return newState;
    }
    default: return state;
  }
};

export default appReducer;
