import React,{useEffect,useState} from "react"
import Layout from "./Layout";
import { Button, Col, Form, Input, Row, TimePicker } from "antd";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import axios from "axios"
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { hideLoading, showLoading } from "../redux/alertsSlice";

const BookTime=()=>{

    const navigate=useNavigate()
    const dispatch = useDispatch();
    const { users } = useSelector((state) => state.users);

    const [aps,setAps]=useState()

    const sentValues=async (vals)=>{
        try{
        const to = moment(vals?.timings[0].$d).format('HH:mm:ss');
        const from = moment(vals?.timings[1].$d).format('HH:mm:ss');
        const datas={
            to:to,
            from:from
        }
        dispatch(showLoading())
        const response = await axios.post(
            "/api/user/check-present-timings",
            datas,
            {
              headers: {
                Authoriation: "Bearer " + localStorage.getItem("token"),
              },
            }
          );
        dispatch(hideLoading())
        if(response.data.success)
        {
          const response1=await axios.post("/api/user/create-timings",datas,{headers:{
            Authoriation: "Bearer " + localStorage.getItem("token")
          }})
          if(response1.data.success)
          {
            toast.success(response1.data.message);
          }
          else{
            toast.success(response1.data.message);
          }
        }
        else{
        toast.error(response.data.message);
        }
        }
        catch(err)
        {
            console.log(err)
            dispatch(hideLoading())
            toast.error("something went wrong");
        }
    }
   
    const deleteTime=async(dat)=>{
        try{
         const deldata=await axios.post("/api/user/delete-time",{dd:dat._id},{
            headers: {
                Authoriation: "Bearer " + localStorage.getItem("token"),
              },
         })
         console.log(deldata.data)
         if(deldata.data.success)
         {
            toast.success("deleted successfully")
         }
        }
        catch(err)
        {
            console.log(err)
            toast.error("failed to delete")
        }
    }

    const getValues=async()=>{
        try{
            const getappoint = await axios.post(
                "/api/user/get-all-timings",
                {},
                {
                  headers: {
                    Authoriation: "Bearer " + localStorage.getItem("token"),
                  },
                }
              );
            if(getappoint.data.success)
            {
                
                setAps(getappoint.data.data.appointment)
            }
            else{
                toast("failed to load data error")
            }
        }
        catch(err)
        {
            console.log(err)
            toast("failed to load data")
        }
    }
    useEffect(()=>{
        getValues()
    },[])
    return(
        <Layout>
        <Row gutter={20}>
        <Col span={10} xs={24} sm={24} lg={10}>
        <Form
        layout="vertical"
        onFinish={sentValues}
        >
        <h1 className="card-title mt-3">Book Timings</h1>
        <Form.Item
            required
            label="Timings"
            name="timings"
            rules={[{ required: true }]}
          >
            <TimePicker.RangePicker format="HH:mm" />
          </Form.Item>
          <div className="d-flex justify-content-end">
        <Button className="primary-button" htmlType="submit">
          SUBMIT
        </Button>
        <Button className="primary-button mx-3" 
        onClick={()=>window.location.reload(false)}
        > ADD 
        </Button>
      </div>
        </Form>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
        {aps?.length>0 ? <h1>To From</h1> : <h1>Nothing</h1>
        }
        {aps?.length>0 ? 
            ( 
                aps.map((dat)=>(
                    <div>
                    <Button>{dat.to} {dat.from}</Button>
                    <i 
                    className="ri-delete-bin-7-line"
                    onClick={()=>deleteTime(dat)}
                    ></i>
                    </div>
                    ))
                
                )
        :
          ""
        }
        </Col>
        </Row>
        </Layout>
    )
}

export default BookTime;