import React from "react";
import { Link } from "react-router-dom";
//import images
import logoSm from "../assets/images/logo-sm.png";
import logoDark from "../assets/images/logo-dark.png";
//import Components
import NotificationDropdown from "../components/NotificationDropdown";
import ProfileDropdown from "../components/ProfileDropdown";

const Header = ({ headerClass }) => {
  const toogleMenuBtn = () => {
    var windowSize = document.documentElement.clientWidth;

    if (windowSize > 767) {
      document.querySelector(".hamburger-icon").classList.toggle("open");
    }

    if (windowSize < 1025 && windowSize > 767) {
      document.body.classList.remove("vertical-sidebar-enable");
      document.documentElement.getAttribute("data-sidebar-size") === "sm"
        ? document.documentElement.setAttribute("data-sidebar-size", "")
        : document.documentElement.setAttribute("data-sidebar-size", "sm");
    } else if (windowSize > 1025) {
      document.body.classList.remove("vertical-sidebar-enable");
      document.documentElement.getAttribute("data-sidebar-size") === "lg"
        ? document.documentElement.setAttribute("data-sidebar-size", "sm")
        : document.documentElement.setAttribute("data-sidebar-size", "lg");
    } else if (windowSize <= 767) {
      document.body.classList.add("vertical-sidebar-enable");
      document.documentElement.setAttribute("data-sidebar-size", "lg");
    }
  };
  return (
    <React.Fragment>
      <header id="page-topbar" className={headerClass}>
        <div className="layout-width">
          <div className="navbar-header">
            <div className="d-flex">
              <div className="navbar-brand-box horizontal-logo">
                <Link to="/" className="logo logo-dark">
                  <span className="logo-sm">
                    <img src={logoSm} alt="" height="22" />
                  </span>
                  <span className="logo-lg">
                    <img src={logoDark} alt="" height="17" />
                  </span>
                </Link>
              </div>

              <button
                onClick={toogleMenuBtn}
                type="button"
                className="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger"
                id="topnav-hamburger-icon"
              >
                <span className="hamburger-icon">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </button>
            </div>

            <div className="d-flex align-items-center">
              <NotificationDropdown />
              <ProfileDropdown />
            </div>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

export default Header;
