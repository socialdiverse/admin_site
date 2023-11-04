import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Navdata = () => {
  const history = useHistory();
  //state data
  const [isDashboard, setIsDashboard] = useState(false);
  const [isApps, setIsApps] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [isPages, setIsPages] = useState(false);
  const [isBaseUi, setIsBaseUi] = useState(false);
  const [isAdvanceUi, setIsAdvanceUi] = useState(false);
  const [isForms, setIsForms] = useState(false);
  const [isTables, setIsTables] = useState(false);
  const [isCharts, setIsCharts] = useState(false);
  const [isIcons, setIsIcons] = useState(false);
  const [isMaps, setIsMaps] = useState(false);
  const [isMultiLevel, setIsMultiLevel] = useState(false);

  const [iscurrentState, setIscurrentState] = useState("Dashboard");

  function updateIconSidebar(e) {
    if (e && e.target && e.target.getAttribute("subitems")) {
      const ul = document.getElementById("two-column-menu");
      const iconItems = ul.querySelectorAll(".nav-icon.active");
      let activeIconItems = [...iconItems];
      activeIconItems.forEach((item) => {
        item.classList.remove("active");
        var id = item.getAttribute("subitems");
        if (document.getElementById(id))
          document.getElementById(id).classList.remove("show");
      });
    }
  }

  useEffect(() => {
    // document.body.classList.remove("twocolumn-panel");
    if (iscurrentState === "Users") {
      history.push("/users");
    }
  }, [
    history,
    iscurrentState,
    isDashboard,
    isApps,
    isAuth,
    isPages,
    isBaseUi,
    isAdvanceUi,
    isForms,
    isTables,
    isCharts,
    isIcons,
    isMaps,
    isMultiLevel,
  ]);

  const menuItems = [
    {
      label: "Menu",
      isHeader: true,
    },
    {
      id: "users",
      label: "Quản lý người dùng",
      icon: "ri-honour-line",
      link: "/users",
      click: function (e) {
        e.preventDefault();
        setIscurrentState("Users");
      },
    },
    {
      id: "groups",
      label: "Quản lý nhóm",
      icon: "ri-honour-line",
      link: "/groups",
      click: function (e) {
        e.preventDefault();
        setIscurrentState("Groups");
      },
    },
    {
      id: "roles",
      label: "Quản lý phân quyền",
      icon: "ri-honour-line",
      link: "/roles",
      click: function (e) {
        e.preventDefault();
        setIscurrentState("Roles");
      },
    },
    {
      id: "advanceUi",
      label: "Advance UI",
      icon: "ri-stack-line",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsAdvanceUi(!isAdvanceUi);
        setIscurrentState("AdvanceUi");
        updateIconSidebar(e);
      },
      stateVariables: isAdvanceUi,
      subItems: [
        {
          id: "nestablelist",
          label: "Nestable List",
          link: "/advance-ui-nestable",
          parentId: "advanceUi",
        },
      ],
    },
  ];
  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
