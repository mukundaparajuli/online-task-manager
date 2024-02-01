import React, { useState } from 'react';
import signUpBg from '../Utils/BG_Image.webp';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
const Login = () => {
    const navigate = useNavigate();
    const { storeTokenLocally } = useAuth();
    const [error, setError] = useState(null)
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    //handle input data
    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })
            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData)
                alert("logged in successfully");
                setUser({ email: "", phone: "", password: "" });
                storeTokenLocally(responseData.accessToken)
                navigate(`/users/tasks`)
            } else {
                const errorData = await response.json();
                const errorMessage = errorData.message || "Unknown error";
                setError(errorMessage);
                console.log("Error inside response: ", errorMessage);
            }
        } catch (error) {
            console.error("Error", error);
        }
    }
    return (
        <div className='flex justify-center items-center h-[100vh] w-full'>
            <img className="bg-cover object-cover h-screen md:w-[100%] absolute" src={signUpBg} alt='BGImage' />
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
            <div className='absolute bg-black bg-opacity-60 flex justify-center h-[50vh] w-96 m-8 p-8 rounded-xl shadow-xl'>
                <div>
                    <form method="post" autoComplete='off'>
                        <div className='font-bold text-4xl mx-1 mb-3 p-2 text-white'>Login</div>
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
                            value={user.password}
                            onChange={handleInput}
                            placeholder='Password'
                            className='font-semibold w-full text-lg mx-1 my-2 p-2 rounded-lg bg-gray-700 text-white'
                        />
                        <button className='bg-blue-800 text-white p-2 m-1 font-semibold text-xl border border-black rounded-md w-full' onClick={handleLogin}>Login</button>
                    </form>
                     <div className='font-md text-red-600'>{error}</div>
                    <div className='text-lg  text-white m-1 p-1'>New here? <button className='text-red-800 font-bold' onClick={() => navigate("/")}>Register</button></div>
                </div>
            </div>
        </div>
    );
};

export default Login;



