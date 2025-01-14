import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { Collapse } from "reactstrap";

// Import Data
import navdata from "./LayoutMenuData";

const SidebarContent = (props) => {
  const navData = navdata().props.children;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const initMenu = () => {
      const pathName = import.meta.env.VITE_PUBLIC_URL + props.location.pathname;
      const ul = document.getElementById("navbar-nav");
      const items = ul.getElementsByTagName("a");
      let itemsArray = [...items]; // converts NodeList to Array
      removeActivation(itemsArray);
      let matchingMenuItem = itemsArray.find((x) => {
        return x.pathname === pathName;
      });
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem);
      }
    };
    if (props.layoutType === "vertical") {
      initMenu();
    }
  }, [props.location.pathname, props.layoutType]);

  function activateParentDropdown(item) {
    item.classList.add("active");
    let parentCollapseDiv = item.closest(".collapse.menu-dropdown");

    if (parentCollapseDiv) {
      parentCollapseDiv.classList.add("show");
      parentCollapseDiv.parentElement.children[0].classList.add("active");
      parentCollapseDiv.parentElement.children[0].setAttribute(
        "aria-expanded",
        "true"
      );
      if (parentCollapseDiv.parentElement.closest(".collapse.menu-dropdown")) {
        parentCollapseDiv.parentElement
          .closest(".collapse")
          .classList.add("show");
        if (
          parentCollapseDiv.parentElement.closest(".collapse")
            .previousElementSibling
        )
          parentCollapseDiv.parentElement
            .closest(".collapse")
            .previousElementSibling.classList.add("active");
      }
      return false;
    }
    return false;
  }

  const removeActivation = (items) => {
    let actiItems = items.filter((x) => x.classList.contains("active"));

    actiItems.forEach((item) => {
      if (item.classList.contains("menu-link")) {
        if (!item.classList.contains("active")) {
          item.setAttribute("aria-expanded", false);
        }
        if (item.nextElementSibling) {
          item.nextElementSibling.classList.remove("show");
        }
      }
      if (item.classList.contains("nav-link")) {
        if (item.nextElementSibling) {
          item.nextElementSibling.classList.remove("show");
        }
        item.setAttribute("aria-expanded", false);
      }
      item.classList.remove("active");
    });
  };

  return (
    <React.Fragment>
      {/* menu Items */}
      {(navData || []).map((item, key) => {
        return (
          <React.Fragment key={key}>
            {/* Main Header */}
            {item["isHeader"] ? (
              <li className="menu-title">
                <span data-key="t-menu">{item.label}</span>
              </li>
            ) : item.subItems ? (
              <li className="nav-item">
                <Link
                  onClick={item.click}
                  className="nav-link menu-link"
                  to={item.link ? item.link : "/#"}
                  data-bs-toggle="collapse"
                >
                  <i className={item.icon}></i>{" "}
                  <span data-key="t-apps">{item.label}</span>
                </Link>
                <Collapse
                  className="menu-dropdown"
                  isOpen={item.stateVariables}
                  id="sidebarApps"
                >
                  <ul className="nav nav-sm flex-column test">
                    {/* subItms  */}
                    {item.subItems &&
                      (item.subItems || []).map((subItem, key) => (
                        <React.Fragment key={key}>
                          {!subItem.isChildItem ? (
                            <li className="nav-item">
                              <Link
                                to={subItem.link ? subItem.link : "/#"}
                                className="nav-link"
                              >
                                {subItem.label}
                              </Link>
                            </li>
                          ) : (
                            <li className="nav-item">
                              <Link
                                onClick={subItem.click}
                                className="nav-link"
                                to="/#"
                                data-bs-toggle="collapse"
                              >
                                {" "}
                                {subItem.label}
                              </Link>
                              <Collapse
                                className="menu-dropdown"
                                isOpen={subItem.stateVariables}
                                id="sidebarEcommerce"
                              >
                                <ul className="nav nav-sm flex-column">
                                  {/* child subItms  */}
                                  {subItem.childItems &&
                                    (subItem.childItems || []).map(
                                      (childItem, key) => (
                                        <li className="nav-item" key={key}>
                                          <Link
                                            to={
                                              childItem.link
                                                ? childItem.link
                                                : "/#"
                                            }
                                            className="nav-link"
                                          >
                                            {childItem.label}
                                          </Link>
                                        </li>
                                      )
                                    )}
                                </ul>
                              </Collapse>
                            </li>
                          )}
                        </React.Fragment>
                      ))}
                  </ul>
                </Collapse>
              </li>
            ) : (
              <li className="nav-item">
                <Link
                  className="nav-link menu-link"
                  to={item.link ? item.link : "/#"}
                >
                  <i className={item.icon}></i> <span>{item.label}</span>
                </Link>
              </li>
            )}
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
};

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default withRouter(SidebarContent);
