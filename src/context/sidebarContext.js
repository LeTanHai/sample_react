import React, { useState, useEffect } from 'react'

export const SidebarContext = React.createContext();

const SidebarContextProvider = ({children}) => {
    const [currentSidebarLink, setcurrentSidebarLink] = useState("Home");
    const handleChangeSidebarLink = (nextSidebarLink) => {
        return setcurrentSidebarLink(nextSidebarLink);
    }
    return (
        <SidebarContext.Provider value={{
            currentSidebarLink,
            handleChangeSidebarLink
        }}> {children}
        </SidebarContext.Provider>
    )
}

export default SidebarContextProvider