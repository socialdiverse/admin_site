import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Navdata = () => {
  const history = useHistory();
  const [isAdvanceUi, setIsAdvanceUi] = useState(false);

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
    if (iscurrentState === "Users") {
      history.push("/users");
    }
  }, [history, iscurrentState, isAdvanceUi]);

  const menuItems = [
    {
      label: "Danh sách",
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
      id: "posts",
      label: "Quản lý bài viết",
      icon: "ri-honour-line",
      link: "/posts",
      click: function (e) {
        e.preventDefault();
        setIscurrentState("Posts");
      },
    },
    {
      id: "comments",
      label: "Quản lý bình luận",
      icon: "ri-honour-line",
      link: "/comments",
      click: function (e) {
        e.preventDefault();
        setIscurrentState("Comments");
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
