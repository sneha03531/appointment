import React, { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import axios from 'axios';

const Image =() => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [photo,setPhoto] = useState("")
  const getBase64 = (img) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => setImageUrl(reader.result));
    reader.readAsDataURL(img);
    return reader;
  };
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange=(info) => {
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

  const Post=async ()=>{
    const data=new FormData()
    data.append("image",photo)
    console.log(photo)
    data.append("status","hhh")

    const response=await axios.post("/api/user/get-doctor-by-id",data,{
        headers:{
            "Content-Type":'multipart/form-data',
            Authoriation:"Bearer "+localStorage.getItem("token"),   
        }
    })
}

  return (
    <>

    <label id='item' for='photo'>Photo:</label>
                    <input id='font' className='form-control' name='photo' type='File'
                    onChange={(e)=>setPhoto(e.target.files[0])} />

                    <button id='item' onClick={()=>Post()} className='btn btn-sm btn-info mt-2 mb-2'>Create Product</button>
      
    </>
  );
};

export default Image;