export const appActionTypes = {
  setDrawerOpened: 'DRAWER_OPENED_SET'
};

export const setDrawerOpened = (currentDrawerState) => {
  const action = {
    type: appActionTypes.setDrawerOpened,
    payload: !currentDrawerState
  };

  return action;
}
