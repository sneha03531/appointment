import React from 'react'
import {Form,Input,Button} from "antd"
import { Link,useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from 'react-hot-toast';
import SignUp from "./Signup.module.css"
import { useGoogleLogin } from '@react-oauth/google';
import { hideLoading, showLoading } from "../redux/alertsSlice";
import {useSelector,useDispatch} from "react-redux"

const Register=()=>{

    const navigate = useNavigate();
    const dispatch=useDispatch();

    async function handleGoogleLoginSuccess(tokenResponse) {
        try{
            dispatch(showLoading())
            const accessToken = tokenResponse.access_token;
            const response=await axios.post("/api/user/register", {
                googleAccessToken: accessToken})
                dispatch(hideLoading())
                if(response.data.success)
                {
                    //navigate("/")
                    toast.success(response.data.message);
                }
                else{
                    toast.error(response.data.message);
                }

        }catch(err)
        {
            toast.error("something went wrong");
            dispatch(showLoading())
        }
        //dispatch(signupGoogle(accessToken,nagivate))
    }

    const login = useGoogleLogin({onSuccess: handleGoogleLoginSuccess,onError: ()=>console.log("error")});

    const onSubmit=async(values)=>{
        try {
            dispatch(showLoading())
            const response= await axios.post("/api/user/register",values);
            console.log(response.data.success)
            dispatch(hideLoading())
            if(response.data.success)
            {
                toast.success(response.data.message);
            }
            else{
                toast.error(response.data.message);
            }
        }
        catch(err){
            toast.error("something went wrong");
            dispatch(showLoading())
        }
    }

    return (
        <div className="authentication">
        <div className="authentication-form card p-3">
        <h1 className="card-title">Nice to meet you!</h1>
         <Form layout='vertical' onFinish={(values)=>onSubmit(values)}>
            <Form.Item label='Firstname' name='firstname'>
                <Input placeholder='Firstname'/>
            </Form.Item>
            <Form.Item label='Lastname' name='lastname'>
                <Input placeholder='Lastname'/>
            </Form.Item>
            <Form.Item label='Email' name='email'>
                <Input placeholder='Email'/>
            </Form.Item>
            <Form.Item label='Password' name='password'>
                <Input placeholder='Password' type='password'/>
            </Form.Item>

            <Button className="primary-button my-2"
            htmlType="submit"
            >REGISTER</Button>

            <button  onClick={() => login()}  className={SignUp.googleBTN}>
            <i class="fa-brands fa-google"></i>  Sign up with google</button>

            <Link to='/login' className="anchor mt-2">Click to Login!</Link>
         </Form>
        </div>
        </div>
    )
}

export default Register;