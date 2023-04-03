import React,{useEffect,useState} from "react"
import DoctorForm from "../../components/DoctorForm";
import Layout from "../../components/Layout"
import { useDispatch,useSelector } from "react-redux";
import { showLoading,hideLoading } from "../../redux/alertsSlice";
import toast from "react-hot-toast";
import axios from "axios";
import {useNavigate} from "react-router-dom"

const Profile=()=>{
    const {users}=useSelector((state)=>state.users)
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const [data,setData]=useState(null)

    const getDetails=async()=>{
        const userId=users._id;
        const response=await axios.post("/api/user/get-doctor-info-by-userid",{userId:userId},{
          headers:{
              Authoriation: "Bearer "+localStorage.getItem("token")
          }
         })
        setData(response.data.data)
      }
      useEffect(()=>{
        getDetails()
      },[])

    return(
        <Layout>
        <h1 className="page-title">Doctor Profile</h1>
        <hr/>
        {data && <DoctorForm initialValues = {data} />}
        </Layout>
    )
}

export default Profile;