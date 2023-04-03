import  Layout from "../components/Layout"
import {Tabs} from "antd"
import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {showLoading,hideLoading} from "../redux/alertsSlice"
import {setUsers} from "../redux/usersSlice"
import toast from "react-hot-toast";
import axios from "axios";

const Notification=()=>{
    const {users}=useSelector(state=>state.users);
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const deleteAll=async()=>{
        try{
            dispatch(showLoading())
            const response=await axios.post("/api/user/delete-all-notifications",{userId:users._id},{
                headers:{
                    Authoriation:"Bearer " + localStorage.getItem("token")
                }
            })
            if(response.data.success)
            {
                toast.success(response.data.message)
                dispatch(setUsers(response.data.data))
                dispatch(hideLoading())
            }
            else{
                toast.error(response.data.message)
                dispatch(hideLoading())
            }

        }catch(err)
        {
            console.log(err)
            dispatch(hideLoading())
            toast.error("something went wrong")
        }

    }
    const markAllAsSeen=async()=>{

        try{
            dispatch(showLoading())
            const response=await axios.post("/api/user/mark-all-notifications-as-seen",{userId:users._id},{
                headers:{
                    Authoriation:"Bearer " + localStorage.getItem("token")
                }
            })
            if(response.data.success)
            {
                toast.success(response.data.message)
                dispatch(setUsers(response.data.data))
                dispatch(hideLoading())
            }
            else{
                toast.error(response.data.message)
                dispatch(hideLoading())
            }

        }catch(err)
        {
            dispatch(hideLoading())
            toast.error("something went wrong")
        }

    }
    return(
        <Layout>
        <h1 className="page-title">Notifications</h1>
        <Tabs>
            <Tabs.TabPane tab="Unseen" key={0}>
             <div className="d-flex justify-content-end">
               <h1 className="anchor"
               onClick={()=>markAllAsSeen()}
               >Mark all as seen</h1>
             </div>
             {users && users.unseenNotifications.length>0 && users?.unseenNotifications.map((notify)=>(
                <div className="card p-2 mb-2"
                onClick={()=>navigate(notify.onClick)}
                >
                    <div className="card-text">{notify.data.name} {notify.type}</div>
                </div>
             ))}
            </Tabs.TabPane>
            <Tabs.TabPane tab="Seen" key={1}>
            <div className="d-flex justify-content-end">
               <h1 className="anchor"
               onClick={()=>deleteAll()}
               >Delete all</h1>
             </div>
             {users && users.seenNotifications.length>0 && users?.seenNotifications.map((notify)=>(
                <div className="card p-2 mb-2"
                onClick={()=>navigate(notify.onClick)}
                >
                    <div className="card-text">{notify.data.name} {notify.type}</div>
                </div>
             ))}
            </Tabs.TabPane>
        </Tabs>
        </Layout>
    )
}

export default Notification;