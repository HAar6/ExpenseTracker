import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/inputs/Input'
import { Link } from 'react-router-dom'
import { validateEmail } from '../../utils/helper'
import  axiosInstance  from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import { UserContext } from '../../context/userContext'


const Login = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error ,setError] = useState(null);
  const navigate = useNavigate();

  const { updateUser } = useContext(UserContext);

  //Handle Logn page form submit
  const handleLogin = async(e) => {
    e.preventDefault();
    if(!validateEmail(email)){
      setError("Please Enter a Valid Email Address.")
      return
    }
    if(!password){
      setError("PLease Enter the Password.")
      return
    }
    if(password.length<8){
      setError("Password must contain atleast 8 characters")
      return
    }

    setError("");

    //Login Api Call
    try{
      const response = await axiosInstance.post(API_PATHS.Auth.LOGIN,{
        email,
        password,
      });
      const {token ,user} = response.data;
      if(token){
        localStorage.setItem("token",token);
        updateUser(user);
        navigate("/dashboard");
      }
    }catch(error){
      if(error.response && error.response.data.message){
        setError(error.response.data.message);
      }else{
        setError("Something Went Wrong");
      }
    }
  }


  return (
    <AuthLayout>
        <div className="lg:w-[90%] h-3/4 md:h-full flex flex-col justify-center">
            <h3 className="text-xl font-semibold text-black">
                Welcome Back
            </h3>
            <p className="text-xs text-slate-700 mt-[5px] mb-6 pb-2">
                Please Enter Your Details To Login
            </p>
            <form onSubmit={handleLogin}>
              <Input
                    value={email}
                    onChange={({ target }) => setEmail(target.value)}
                    label="Email Address"
                    placeholder="HaR6@example.com"
                    type ="text"
               />   
               <Input
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                    label="Password (Min 8 Characters)"
                    placeholder="********"
                    type ="password"
               />    
               {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

               <button type="submit" className='btn-primary'>
                LOGIN
               </button>

               <p className='text-[13px] text-slate-800 mt-3'>
                Don't have an account?{" "}
                <Link className="font-medium text-primary underline" to="/SignUp">
                SignUp
                </Link>
               </p>
            </form>
        </div>
    </AuthLayout>
  )
}

export default Login