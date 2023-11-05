import { CHANGE_LAYOUT, CHANGE_SIDEBAR_THEME } from "./actionType";

export const changeLayout = (layout) => ({
  type: CHANGE_LAYOUT,
  payload: layout.toLowerCase(),
});

export const changeSidebarTheme = (theme) => ({
  type: CHANGE_SIDEBAR_THEME,
  payload: theme,
});
