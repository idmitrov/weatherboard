export const appActionTypes = {
  setDrawerOpened: 'DRAWER_OPENED_SET'
};

/**
 * Set action to set drawer current state to the oposite i.e toggle
 * @name setDrawerOpened
 * @param {Boolean} isDrawerOpened
 */
export const setDrawerOpened = (isDrawerOpened) => {
  const action = {
    type: appActionTypes.setDrawerOpened,
    payload: !isDrawerOpened
  };

  return action;
}
