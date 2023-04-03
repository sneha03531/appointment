import React, { useEffect } from "react";
import axios from "axios"
import Layout from "../components/Layout"

const Home=()=>{

    const getData=async()=>{
    try{
        const response=await axios.post("/api/user/get-user-by-id",{},{
            headers:{
                Authoriation: "Bearer "+localStorage.getItem("token")
            }
        })
        console.log(response.data)
    }
    catch(err)
    {
        console.log(err)
    }
    }

    useEffect(()=>{
        getData()
    },[])

    return(
       <Layout>
       <h1>homepage</h1>
       </Layout>
    )
}

export default Home;