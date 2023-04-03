import { Form, Select, Upload, Button, Row, Col, message,Input } from "antd";
import React, { useState,useEffect } from "react";
import Layout from "../components/Layout";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import { useNavigate } from "react-router-dom";

const DoctorForm=({onFinish,initialValues})=>{
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState();
  const [data,setData]=useState(initialValues);
  const [im, setIm] = useState();

  const getBase64 = (img) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => setIm(reader.result));
    reader.readAsDataURL(img);
    return reader;
  };
  const beforeUpload = (file) => {
    const isLt2M = file.size / 1024 / 1024 < 10;
    if (!isLt2M) {
      message.error("Image must smaller than 10MB!");
    }
    return isLt2M;
  };

  const handleChange = (info) => {
    if (info.file.name === '') {
      setLoading(true);
      return;
    }
    if (info.file.name !== '') {
      const v=getBase64(info.file.originFileObj)
      if(v)
      {
        setLoading(false);
      }
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const submitDetails=async (vals)=>{
    // console.log(data)
    // console.log(vals,"vals")
    // console.log(imageUrl)
    const bodyFormData = new FormData();
    console.log(imageUrl,data.details)
    if(vals.Status===undefined)
    {
      bodyFormData.append("status",data.status)
    }
    else{
      bodyFormData.append("status",vals.Status)
    }
    if(imageUrl)
    {
      bodyFormData.append("image",imageUrl)
    }
    else{
      bodyFormData.append("image",data.details)
    }
    bodyFormData.append("firstName", vals.firstName ? vals.firstName : data.userId.firstName);
    bodyFormData.append("lastName", vals.lastName ? vals.lastName : data.userId.lastName);
    const results=await axios.post("/api/user/edit-doctor-details",bodyFormData,{
      headers: {
        "Content-Type": "multipart/form-data",
        Authoriation: "Bearer " + localStorage.getItem("token"),
      },
    })
    console.log(results,"ress")
  }

    return(
      <Form layout="vertical" style={{ maxWidth: 1500 }}
      onFinish={submitDetails}
      >
        <Row gutter={40}>
        <Col span={8} xs={24} sm={24} lg={8}>
        <Form.Item
          label="First Name"
          name="firstName"
        >
          <Input placeholder="First Name"
          defaultValue={data?.userId.firstName}
          />
        </Form.Item>
      </Col>
      <Col span={8} xs={24} sm={24} lg={8}>
      <Form.Item
        label="Last Name"
        name="lastName"
      >
        <Input placeholder="Last Name" 
        defaultValue={data?.userId.lastName}
        />
      </Form.Item>
    </Col>
          <Col span={8} lg={8}>
            <Form.Item name="Status" label="Status"
            >
              <Select
              defaultValue={data?.status}
              >
                <Select.Option value="available">Available</Select.Option>
                <Select.Option value="not available">
                  Not Available
                </Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={8} lg={8}>
            <Form.Item
              label="Upload"
              onChange={(e) => setImageUrl(e.target.files[0])}
              valuePropName="fileList"
              rules={[{ required: true }]}
              >
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader mt-3"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {im? 
                (
                  <img src={im} alt="avatar" style={{ width: "100%" }} />
                ) 
                : 
                 ( data?.details ? 
                  (
                    <img src={data.details} alt="avatar" style={{width:"100%"}}/>
                  )
                :
                (
                  uploadButton
                )
                )
                }
              </Upload>
            </Form.Item>
          </Col>
          <Col span={4}>
            <Button className="mt-3 primary-button" htmlType="submit">
              Fill Details
            </Button>
          </Col>
        </Row>
      </Form>
    )
}

export default DoctorForm;