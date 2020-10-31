import React, { useState, useEffect } from "react";
import {List} from 'react-bootstrap-icons';
import Sidebar from "react-sidebar";
import SidebarContent from "./SidebarContent";
import MaterialTitlePanel from "../MaterialPanel";
import Header from "../Header";
import {sidebarNavStyles} from "./sidebarStyles";

const mql = window.matchMedia(`(min-width: 800px)`);

const SidebarNav = (props) => {
    const [sidebarDocked, setSidebarDocked] = useState(mql.matches);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    
    useEffect(() => {
        mql.addListener(mediaQueryChanged);
        return () => {
            mql.removeListener(mediaQueryChanged);
        }
    })

    const mediaQueryChanged = () => {
        setSidebarDocked(mql.matches);
        setSidebarOpen(false);
    }

    const toggleOpenSidebar = (event) => {
        if (event) {
            event.preventDefault();
        }        
        if (mql.matches) {
            setSidebarDocked(!sidebarDocked);
            return setSidebarOpen(false);
        }
        return setSidebarOpen(!sidebarOpen);
    }

    const sidebar = <SidebarContent />;

    const contentHeader = (
      <span>
          <a
            onClick={()=>toggleOpenSidebar()}
            href="#"
            style={sidebarNavStyles.contentHeaderMenuLink}
          >
            <List color="gray"/>
          </a>
          <Header/>
      </span>
    );

    const sidebarProps = {
        sidebar,
        open:sidebarOpen,
        docked:sidebarDocked,
        transitions: true,
        touch: true
    }
    return (
        <>
            <Sidebar {...sidebarProps}
                onSetOpen = {() => setSidebarOpen(!sidebarOpen)}
                sidebarClassName="cus-sidebar"
            >
                <MaterialTitlePanel title={contentHeader} style={sidebarNavStyles}>
                    {props.children}
                </MaterialTitlePanel>
            </Sidebar>
        </>
        );
  };

export default SidebarNav;