import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

//import Components
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

//import actions
import { changeLayout, changeSidebarTheme } from "../store/actions";

//redux
import { useSelector, useDispatch } from "react-redux";
import { SignalRConnection } from "../services/chat.service";

const Layout = (props) => {
  const [headerClass, setHeaderClass] = useState("");
  const dispatch = useDispatch();
  const { layoutType, leftSidebarType } = useSelector((state) => ({
    layoutType: state.Layout.layoutType,
    leftSidebarType: state.Layout.leftSidebarType,
  }));

  /*
    layout settings
    */
  useEffect(() => {
    if (layoutType || leftSidebarType) {
      dispatch(changeSidebarTheme(leftSidebarType));
      dispatch(changeLayout(layoutType));
    }
    SignalRConnection("/chat");
    // SignalRConnection("/notification");
  }, [layoutType, leftSidebarType, dispatch]);

  // class add remove in header
  useEffect(() => {
    window.addEventListener("scroll", scrollNavigation, true);
  });

  function scrollNavigation() {
    var scrollup = document.documentElement.scrollTop;
    if (scrollup > 50) {
      setHeaderClass("topbar-shadow");
    } else {
      setHeaderClass("");
    }
  }

  return (
    <React.Fragment>
      <div id="layout-wrapper">
        <Header headerClass={headerClass} />
        <Sidebar layoutType={layoutType} />
        <div className="main-content">
          {props.children}
          <Footer />
        </div>
      </div>
    </React.Fragment>
  );
};

Layout.propTypes = {
  children: PropTypes.object,
};

export default withRouter(Layout);
