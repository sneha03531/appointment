import React, { useEffect,useState }  from "react";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout"
import { showLoading,hideLoading } from "../../redux/alertsSlice";
import axios from "axios"
import { Table } from "antd";
import toast from "react-hot-toast";

const UsersList=()=>{

    const [users,setUsers]=useState([])
    const dispatch=useDispatch()

    const getUsersData=async()=>{
        try{
            dispatch(showLoading())
            const response=await axios.post("/api/admin/get-all-users",{},{
                headers:{
                    Authoriation: "Bearer "+localStorage.getItem("token")
                }
            })
            dispatch(hideLoading())
            if(response.data.success)
            {
                setUsers(response.data.data)
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
        getUsersData()
    },[])

    const columns=[
        {
            title:"FirstName",
            dataIndex:"firstName"
        },
        {
            title:"Email",
            dataIndex:"email"
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
        <h1 className="page-header">UsersList</h1>
        <Table columns={columns} dataSource={users}/>
        </Layout>
    )
}

export default UsersList;