import React,{useState} from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import "../components/layout.css"
import {useSelector} from "react-redux"
import {Badge,Avatar} from "antd"


const Layout=(props)=>{

    const location=useLocation();
    const [collapsed,setCollapsed]=useState(false);
    const {users}=useSelector((state)=>state.users);
    const navigate=useNavigate();
    const userMenu=[
        {
            name:'Home',
            path:'/',
            icon:'ri-home-line'
        },
        {
            name:'Appointments',
            path:'/appointments',
            icon:'ri-file-list-line'
        },
        {
            name:'Apply Doctor',
            path:'/apply-doctor',
            icon:'ri-hospital-line'
        },
        {
            name:'Profile',
            path:'/profile',
            icon:'ri-user-line'
        },
    ]

    const adminMenu=[
        {
            name:'Home',
            path:'/',
            icon:'ri-home-line'
        },
        {
            name:'Users',
            path:'/admin/userslist',
            icon:'ri-user-line'
        },
        {
            name:'Doctors',
            path:'/admin/doctorslist',
            icon:'ri-user-star-line'
        },
    ]

    const doctorMenu=[
        {
            name:'Home',
            path:'/',
            icon:'ri-home-line'
        },
        {
            name:'Appointments',
            path:'/appointments',
            icon:'ri-file-list-line'
        },
        {
            name:'Profile',
            path:`/doctor/profile`,
            icon:'ri-user-line'
        },
        {
            name:'Booking',
            path:'/doctor/booking',
            icon:'ri-user-line'
        }
    ]

const menuToBeRendered= users && users?.role===2? adminMenu : users?.role===1? doctorMenu : userMenu;
 return(
     <div className="main">
        <div className="d-flex layout">
         <div className={`${collapsed? 'collapsed-sidebar' : 'sidebar'}`}>
            <div className="sidebar-header">
                <h1 className="logo">sdcsd</h1>
            </div>

            <div className="menu">
                {menuToBeRendered.map((menu)=>{
                    const isActive=location.pathname===menu.path
                    return (
                        <div className={`d-flex menu-item ${isActive && 'active-menu-item'}`}>
                        <i className={menu.icon}></i>
                        {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                        </div>
                    )
                })}
                <div className={`d-flex menu-item`}
                onClick={()=>{
                    localStorage.clear();
                    navigate("/login");
                }}
                >
                <i className="ri-logout-circle-line"></i>
                {!collapsed && <Link to="/login">Logout</Link>}
                </div>
            </div>
         </div>
         <div className="content">
             <div className="header">
             {collapsed ? 
            (
                <i className="ri-menu-2-fill remix-icons"
             onClick={()=>setCollapsed(!collapsed)}
             ></i>
             ):
            (
            <i className="ri-close-fill remix-icons"
             onClick={()=>setCollapsed(!collapsed)}
             ></i>
            )}
            <div className="d-flex align-items-center px-4">
             <Badge count={users?.unseenNotifications.length}
             onClick={()=>navigate('/notifications')}
             >
             <i className="ri-notification-line remix-icons px-3"></i>
             </Badge>
                
                <Link className="anchor mx-3" to="/profile">
                {users?.firstName}
                </Link>
            </div>
             </div>
             <div className="body">
             {props.children}
             </div>
         </div>
        </div>
     </div>
 )
}

export default Layout;