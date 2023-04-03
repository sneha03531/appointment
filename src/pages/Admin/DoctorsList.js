import React, { useEffect,useState }  from "react";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout"
import { showLoading,hideLoading } from "../../redux/alertsSlice";
import axios from "axios"
import { Table } from "antd";
import toast from "react-hot-toast";

const DoctorsList=()=>{

    const [doctors,setDoctors]=useState([])
    const dispatch=useDispatch()

    const getDoctorsData=async()=>{
        try{
            dispatch(showLoading())
            const response=await axios.post("/api/admin/get-all-doctors",{},{
                headers:{
                    Authoriation: "Bearer "+localStorage.getItem("token")
                }
            })
            dispatch(hideLoading())
            if(response.data.success)
            {
                //setDoctors(response.data.data)
                let t=[]
                if(response.data.data)
                {
                    const k=response.data.data
                    k.map(vals=>{
                        let m={
                            status:vals.status,
                            firstName:vals.userId.firstName,
                            createdAt:vals.createdAt
                        }
                        t.push(m)
                    })
                    setDoctors(t)
                }
            }
        }
        catch(err)
        {
            console.log(err)
            toast.error("something went wrong")
            dispatch(hideLoading())
        }
    }

    useEffect(()=>{
        getDoctorsData()
    },[])

    console.log(doctors)

    const columns=[
        {
            title:"FirstName",
            dataIndex:"firstName"
        },
        {
            title:"Status",
            dataIndex:"status"
        },
        {
            title:"Created At",
            dataIndex:"createdAt"
        },
        {
            title:"Actions",
            dataIndex:'actions',
            render:(text,record)=>(
                <div className="d-flex">
                <h1 className="anchor">Block</h1>
                </div>
            )
        }
    ]
    return(
        <Layout>
        <h1 className="page-header">DoctorsList</h1>
        <Table columns={columns} dataSource={doctors}/>
        </Layout>
    )
}

export default DoctorsList;