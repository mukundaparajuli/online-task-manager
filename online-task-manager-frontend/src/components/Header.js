import React, { useState } from 'react';
import { accountIcon, logo } from '../constants';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth'
const Header = () => {
  const { user } = useAuth();
  const [showInfo, setShowInfo] = useState(false);
  const navigate = useNavigate();
  const handleShowInfo = () => {
    setShowInfo(!showInfo);
  };
  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate("/login")
  }

  return (
    <div className="relative">
      <div className="flex justify-between items-center p-3 shadow-xl">
        <Link to={"/"}><div ><img src={logo} alt="" className='h-12' /></div></Link>
        <div>
          <button onClick={handleShowInfo}>
            <img src={accountIcon} alt="Account" className="h-12 border-2 border-black rounded-full" />
          </button>
        </div>
      </div>

      {showInfo && (
        <div className="fixed right-2 w-72 bg-white border-4 rounded-2xl p-3 -mt-4">
          <div className="flex justify-end mb-4">
          </div>
          <div>
            <div className='m-1 p-4 border-3 rounded-xl shadow-lg'>
              <h1 className='font-semibold text-2xl'>{user.name}</h1>
              <h1 className='text-lg'>{user.email}</h1>
            </div>
            <button className='mt-6 font-bold text-blue-700 border-1 p-2 rounded-xl' onClick={handleLogout}>Log Out</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
