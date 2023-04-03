import React,{useEffect} from "react"
import { Navigate, useNavigate } from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import axios from "axios"
import {setUsers} from "../redux/usersSlice"
import { showLoading, hideLoading } from "../redux/alertsSlice";

const ProtectedRoutes=(props)=>{
    const {users,reloadUser}=useSelector((state)=>state.users);
    const dispatch=useDispatch()
    const navigate=useNavigate();

    const getUsers=async()=>{
        try{
            dispatch(showLoading())
            const response=await axios.post("/api/user/get-user-by-id",{},{
                headers:{
                    Authoriation: "Bearer "+localStorage.getItem("token")
                }
            })
            dispatch(hideLoading());
            if(response.data.success)
            {
                //console.log("hey",response.data.data)
                dispatch(setUsers(response.data.data))
                //dispatch(reloadUserData(false))
            }
            else{
                localStorage.clear();
                navigate("/login");
            }
        }
        catch(err)
        {
            dispatch(hideLoading());
            localStorage.clear();
            navigate("/login");
        }
    }

    useEffect(()=>{
        if(!users)
        {
            getUsers();
        }
    },[users])

    if(localStorage.getItem("token"))
    {
        return props.children
    }
    else{
        return <Navigate to="/login"/>
    }
}

export default ProtectedRoutes;
