//react
import React from "react";
//icons
import * as FaIcons from "react-icons/fa";
// import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { useState } from "react";
import { IconContext } from "react-icons/lib";
//db
import { SideBarData } from "./SideBarItems";
//css
import "./SideBar.css";

const SideBar = () => {
  const [SideBar, setSideBar] = useState(false);
  const ShowSideBar = () => setSideBar(!SideBar);

  return (
    <>
      <IconContext.Provider value={{color:'#fff'}}>
        <div className="sidebar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={ShowSideBar} />
          </Link>
          <div className="title-main"><h1>MyEmail</h1></div>
        </div>
        <nav className={SideBar ? "nav-menu" : "nav-menu active"}>
          <ul className="nav-menu-items" onClick={ShowSideBar}>
            {SideBarData.map((item, index) => {
              return (
                <li key={index} className={item.cname}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
};

export default SideBar;
