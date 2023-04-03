import React from 'react'
import {Form,Input,Button} from "antd"
import axios from "axios";
import toast from 'react-hot-toast';
import LoginStyles from "./Login.module.css"
import {useGoogleLogin} from '@react-oauth/google';
import { hideLoading, showLoading } from "../redux/alertsSlice";
import { setUsers } from "../redux/usersSlice";
import { Link,useNavigate } from 'react-router-dom'
import {useSelector,useDispatch} from "react-redux"

const Login=()=>{

    const navigate=useNavigate();
    const dispatch=useDispatch();

    async function handleGoogleLoginSuccess(tokenResponse) {

        try{
            localStorage.clear();
            dispatch(setUsers(null))
            const accessToken = tokenResponse.access_token;
            dispatch(showLoading())
            const response=await axios.post("/api/user/login", {
                googleAccessToken: accessToken})
                dispatch(hideLoading())
                if(response.data.success)
                {
                    toast.success(response.data.message);
                    localStorage.setItem("token",response.data.token)
                    navigate("/")
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

    const onSubmit=async (values)=>{
    try {
        localStorage.clear();
        dispatch(setUsers(null))
        dispatch(showLoading())
        const response= await axios.post("/api/user/login",values);
        dispatch(hideLoading())
        console.log(response.data.success)
        if(response.data.success)
        {
            toast.success(response.data.message);
            localStorage.setItem("token",response.data.token)
            navigate("/");
            
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
        <h1 className="card-title">Welcome back!</h1>
         <Form layout='vertical' onFinish={onSubmit}>
            <Form.Item label='Email' name='email'>
                <Input placeholder='Email'/>
            </Form.Item>
            <Form.Item label='Password' name='password'>
                <Input placeholder='Password'/>
            </Form.Item>

            <Button className="primary-button my-2"
            htmlType="submit"
            >Login</Button>

            <button onClick={() => login()} className={LoginStyles.googleBTN}>
            <i class="fa-brands fa-google"></i>  Sign in with google</button>

            <Link to='/register' className="anchor mt-2">Click to Register!</Link>
         </Form>
        </div>
        </div>
    )
}

export default Login;