import React, { useContext, useState} from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/inputs/Input'
import { Link } from 'react-router-dom'
import { validateEmail } from '../../utils/helper'
import  axiosInstance  from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import { UserContext } from '../../context/userContext'

const SignUp = () => {
  const[fullName, setFullName]=useState("");
  const[email, setEmail]=useState("");
  const[password,setPassword]=useState("");
  const [error ,setError] = useState(null);

  const { updateUser } = useContext(UserContext)
  const navigate = useNavigate();

  //Handle SignUP Form Submit
  const handleSignUp = async(e) => {
    e.preventDefault();

    if(!fullName){
      setError("Please enter your name")
      return
    }
    if(!validateEmail(email)){
      setError("Please enter a valid email")
      return
    }
    if(!password){
      setError("Please enter your password")
      return
    }
    if(password.length<8){
      setError("Password must contain atleast 8 characters")
      return
    }
    else setError("")
    //SignUp Api call
    try{
      const response = await axiosInstance.post(API_PATHS.Auth.REGISTER,{
        fullName,
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
    <div>
      <AuthLayout>
        <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
          <h3 className='text-xl font-semibold text-black'>
            Create an Account
          </h3>
          <p className='text-xs text-slate-700 mt-[5px] mb-6'>Join us today by entering your details below</p>
          <form onSubmit={handleSignUp}>

            {/* <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} /> */}

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <Input
                    value={fullName}
                    onChange={({ target }) => setFullName(target.value)}
                    label="Full Name"
                    placeholder="HaAR6"
                    type="text" 
              />
              <Input
                    value={email}
                    onChange={({ target }) => setEmail(target.value)}
                    label="Email Address"
                    placeholder="HaR6@example.com"
                    type ="text"
               />   
               <div className='col-span-2'>
               <Input
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                    label="Password (Min 8 Characters)"
                    placeholder="********"
                    type ="password"
               />  
               {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

               <button type="submit" className='btn-primary'>
                Sign Up
               </button>
               <p className='text-[13px] text-slate-800 mt-3'>
                               Already have an account?{" "}
                               <Link className="font-medium text-primary underline" to="/Login">
                               LogIn
                               </Link>
                              </p>
               </div>
            </div>
          </form>
        </div>
      </AuthLayout>
    </div>
  )
}

export default SignUp