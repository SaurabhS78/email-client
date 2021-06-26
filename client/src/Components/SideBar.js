//react
import React from "react";
import * as FaIcons from "react-icons/fa";
// import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { useState } from "react";
import { IconContext } from "react-icons/lib";
import Button from '@material-ui/core/Button'
// import Avatar from '@material-ui/core/Avatar';
// import { deepOrange, deepPurple } from '@material-ui/core/colors';
//db
import { SideBarData } from "./SideBarItems";
//css
import "./SideBar.css";

const SideBar = () => {
  const [SideBar, setSideBar] = useState(false);
  const ShowSideBar = () => setSideBar(!SideBar);

  function SignedIn(){
    return null;
  }
  const name = 'User';
  return (
    <>
      <IconContext.Provider value={{color:'#fff'}}>
        <div className="sidebar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={ShowSideBar} />
          </Link>
          <div className="title-main"><h1>Xmail</h1></div>
        </div>
        <nav className={SideBar ? "nav-menu" : "nav-menu active"}>
          <ul className="nav-menu-items" onClick={ShowSideBar}>
            <div className='drawer-name'>
              Welcome, {name}
            </div>
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
            <center>
            <Button className='btn-logout' variant='contained' onClick={() => SignedIn(false)}>Log Out</Button>
            </center>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
};

export default SideBar;
