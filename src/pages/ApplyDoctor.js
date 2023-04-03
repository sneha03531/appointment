import { Form, Select, Upload, Button, Row, Col, message } from "antd";
import React, { useState } from "react";
import Layout from "../components/Layout";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import { useNavigate } from "react-router-dom";

const ApplyDoctor = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState();
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

  const onFinish = async (values) => {
    try {
      if (values.Status === undefined || imageUrl === undefined) {
        toast.error("enter all fields");
      } else {
        const bodyFormData = new FormData();
        bodyFormData.append("status", values.Status);
        bodyFormData.append("image", imageUrl);
        dispatch(showLoading())
        const response = await axios.post(
          "/api/user/get-doctor-by-id",
          bodyFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authoriation: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        console.log(response)
            dispatch(hideLoading())
            if(response.data.success)
            {
            toast.success(response.data.message);
            navigate("/")
            }
            else{
            toast.error(response.data.message);
            }
        }
    } catch (err) {
      dispatch(hideLoading())
      toast.error("something went wrong");
    }
  };

  return (
    <Layout>
      <h1 className="page-title">Apply Doctor</h1>
      <Form layout="vertical" style={{ maxWidth: 1500 }} onFinish={onFinish}>
        <Row gutter={40}>
          <Col span={8} lg={8}>
            <Form.Item name="Status" label="Status">
              <Select>
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
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {im ? (
                  <img src={im} alt="avatar" style={{ width: "100%" }} />
                ) : (
                  uploadButton
                )}
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
    </Layout>
  );
};

export default ApplyDoctor;
