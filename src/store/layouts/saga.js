// @flow
import { all, call, fork, takeEvery } from "redux-saga/effects";

import { CHANGE_LAYOUT, CHANGE_SIDEBAR_THEME } from "../actionType";

/**
 * Changes the body attribute
 */
function changeHTMLAttribute(attribute, value) {
  if (document.documentElement)
    document.documentElement.setAttribute(attribute, value);
  return true;
}

/**
 * Changes the layout type
 * @param {*} param0
 */
function* changeLayoutTheme({ payload: layout }) {
  try { 
    yield call(changeHTMLAttribute, "data-layout", layout);
  } catch (error) {
    // console.log(error);
  }
}

/**
 * Changes the left sidebar theme
 * @param {*} param0
 */
function* changeLeftSidebarTheme({ payload: theme }) {
  try {
    yield call(changeHTMLAttribute, "data-sidebar", theme);
  } catch (error) {
    // console.log(error);
  }
}

/**
 * Watchers
 */
export function* watchChangeLayoutType() {
  yield takeEvery(CHANGE_LAYOUT, changeLayoutTheme);
}
export function* watchChangeLeftSidebarTheme() {
  yield takeEvery(CHANGE_SIDEBAR_THEME, changeLeftSidebarTheme);
}

function* LayoutSaga() {
  yield all([fork(watchChangeLayoutType), fork(watchChangeLeftSidebarTheme)]);
}

export default LayoutSaga;
