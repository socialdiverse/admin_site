import { CHANGE_LAYOUT, CHANGE_SIDEBAR_THEME } from "../actionType";

const INIT_STATE = {
  layoutType: "vertical",
  leftSidebarType: "dark",
};

const Layout = (state = INIT_STATE, action) => {
  switch (action.type) {
    case CHANGE_LAYOUT:
      return {
        ...state,
        layoutType: action.payload,
      };

    case CHANGE_SIDEBAR_THEME:
      return {
        ...state,
        leftSidebarType: action.payload,
      };

    default:
      return state;
  }
};

export default Layout;
