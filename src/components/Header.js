import React, {useEffect, useState, useContext} from 'react'
import { NavDropdown } from 'react-bootstrap'
import { Bell, EnvelopeFill, FileEarmarkFill, PersonCircle, PersonPlusFill } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
import { SidebarContext } from "../context/sidebarContext"

const notificationsData = {messages:"4 new messages", friendRequest: "8 friend requests", reports: "3 new reports", totalNotifications: 15};

const Header = () => {
    const {currentSidebarLink} = useContext(SidebarContext);
    const [notifications, setnotifications] = useState({});
    useEffect(() => {
        setnotifications(notificationsData);
        return () => {
        }
    }, [])
    const notificationIcon = (
        <>
            <span className="amount-notification"> {notifications.totalNotifications} </span>
            <Bell/>
        </>
    ) 
    return (
        <>
            <span> {currentSidebarLink} </span>
            <div className="right-header">
                <NavDropdown className="cus-nav-dropdown" title={notificationIcon}>
                    <NavDropdown.Header> {notifications.totalNotifications} Notifications </NavDropdown.Header>
                    <NavDropdown.Divider />
                        <Link className="dropdown-item" to="/new-messages"><EnvelopeFill/> {notifications.messages} </Link>
                    <NavDropdown.Divider />
                        <Link className="dropdown-item" to="/friend-request"><PersonPlusFill/> {notifications.friendRequest} </Link>
                    <NavDropdown.Divider />
                        <Link className="dropdown-item" to="/reports"><FileEarmarkFill/> {notifications.reports} </Link>
                    <NavDropdown.Divider />
                        <Link className="dropdown-item" to="/all-notifications">See All Notifications</Link>
                </NavDropdown>
                <NavDropdown className="cus-nav-dropdown" title={<PersonCircle/>}>
                        <Link className="dropdown-item" to="/change-password"> Đổi mật khẩu </Link> 
                    <NavDropdown.Divider />
                        <Link className="dropdown-item" to="/logout"> Logout </Link>
                </NavDropdown>
            </div>
        </>
    )
}

export default Header
