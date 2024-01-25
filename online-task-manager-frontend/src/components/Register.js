import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import signUpBg from "../Utils/BG_Image.webp"
const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  //handle input data
  const handleInput = (e) => {
    // console.log(e);
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  // handle registration
  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:5000/register', {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      })
      console.log(response)
      if (response.ok) {
        alert("registration successful");
        navigate("/login")
        // console.log(responseData);
      } else {
        const errorMessage =await response.json();
        setError(errorMessage.message);
        alert(`${errorMessage.message}`)
        throw new Error('Something went wrong!');

      }
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className='flex justify-center items-center h-[100vh] w-full'>
      <img className="bg-cover object-cover h-screen md:w-[100%] absolute" src={signUpBg} alt='BGImage' />
      <div className="absolute h-  inset-0 bg-black bg-opacity-30"></div>
      <div className='absolute bg-black bg-opacity-60 flex justify-center h-[60vh] w-96 m-8 p-8 rounded-xl shadow-xl'>
        <div>
          <form autoComplete='off'>
            <div className='font-bold text-4xl mx-1 mb-3 p-2 text-white'>Register</div>
            <label htmlFor="name" className='sr-only'>Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={user.name}
              onChange={handleInput}
              placeholder='Full Name'
              className='font-semibold w-full text-lg mx-1 my-2 p-2 rounded-lg bg-gray-700 text-white'
            />
            <label htmlFor="email" className='sr-only'>Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={user.email}
              onChange={handleInput}
              placeholder='Email'
              className='font-semibold w-full text-lg mx-1 my-2 p-2 rounded-lg bg-gray-700 text-white'
            />
            <label htmlFor="password" className='sr-only'>Password</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleInput}
              placeholder='Password'
              className='font-semibold w-full text-lg mx-1 my-2 p-2 rounded-lg bg-gray-700 text-white'
            />
            <button className='bg-blue-800 text-white p-2 m-1 font-semibold text-xl border border-black rounded-md w-full' onClick={handleRegister}>Register</button>
          </form>
          <div className='font-md text-red-600'>{error}</div>
          <div className='text-lg  text-white m-1 p-1'>Already registered? <button className='text-red-800 font-bold' onClick={() => navigate("/login")}>Login</button></div>
        </div>
      </div>
    </div>
  );
};

export default Register;
