import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Index = () => {
    const menuItems = [
        {
            name: "Profile",
            url: '/me/profile',
            icon: 'fas fa-user'
        },
        {
            name: "Update Profile",
            url: '/me/update_profile',
            icon: 'fas fa-user'
        },
        {
            name: "Upload Avatar",
            url: '/me/upload_avatar',
            icon: 'fas fa-user-circle'
        },
        {
            name: "Update Password",
            url: '/me/update_password',
            icon: 'fas fa-lock'
        },
    ];

    const location = useLocation();

    const [activeMenu, setActiveMenu] = React.useState(location.pathname)

    const handleMenuItemClick = (menuItemUrl) => {
        setActiveMenu(menuItemUrl)
    }
    return (
        <>
            <div className="list-group mt-5 pl-4">
                {menuItems.map((item, index) => (
                    <Link
                        to={item.url}
                        className={`fw-bold list-group-item list-group-item-action ${activeMenu.includes(item.url) ? "active" : ""}`}
                        key={index}
                        onClick={() => handleMenuItemClick(item.url)}
                        aria-current={activeMenu.includes(item.url) ? "true" : "false"}
                    >
                        <i className={`${item.icon} fa-fw pe-2`}></i> {item.name}
                    </Link>
                ))}


            </div>
        </>
    )
}

export default Index
