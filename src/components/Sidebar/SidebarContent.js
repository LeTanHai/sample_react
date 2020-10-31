import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import MaterialTitlePanel from "../MaterialPanel";
import { Link } from "react-router-dom";
import { sidebarContentStyles } from "./sidebarStyles";
import {SidebarContext} from "../../context/sidebarContext";

const linkData = [{nameUrl: "Quản lý tài khoản", url: "/account"},
                  {nameUrl: "Quản lý đơn hàng", url: "/orders"},
                  {nameUrl: "Quản lý vật tư", url: "/subplies"},
                  {nameUrl: "Thông báo", url: "/notify"}];
const userData = {id:"1", name:"LE TAN HAI", roleName:"AdminLTE"};

const SidebarContent = props => {
  const style = props.style
    ? { ...sidebarContentStyles.sidebar, ...props.style }
    : sidebarContentStyles.sidebar;
  const [sidebarLink, setsidebarLink] = useState([]);
  const [userInfo, setuserInfo] = useState({});
  const {handleChangeSidebarLink} = useContext(SidebarContext);
    useEffect(() => {
      setsidebarLink(linkData);
      setuserInfo(userData);
      return () => {
      }
    }, [])

  return (
    <MaterialTitlePanel title={userInfo.roleName} style={style}>
      <>
        <div style={sidebarContentStyles.dividerHeader} />
        <div style={sidebarContentStyles.content}>
          <a href="index.html" style={sidebarContentStyles.sidebarLink}>
            {userInfo.name}
          </a>
          <div style={sidebarContentStyles.divider} />
          {sidebarLink.map((item, index) => {
            return <Link onClick={()=>handleChangeSidebarLink(item.nameUrl)} key={index} to={item.url}
                    style={sidebarContentStyles.sidebarLink}> {item.nameUrl} </Link>
          })}
        </div>
      </>
    </MaterialTitlePanel>
  );
};

SidebarContent.propTypes = {
  style: PropTypes.object
};

export default SidebarContent;