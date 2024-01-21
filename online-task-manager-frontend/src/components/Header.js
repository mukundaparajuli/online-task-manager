import React, { useState } from 'react';
import { accountIcon, logo } from '../constants';
import { Link, useNavigate } from 'react-router-dom';
import {useAuth} from '../store/auth'
const Header = () => {
  const [showInfo, setShowInfo] = useState(false);
  const navigate = useNavigate();
  const handleShowInfo = () => {
    setShowInfo(!showInfo);
  };
  const handleLogout=()=>{
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
        <div className="fixed right-2 w-64 bg-blue-300 rounded-xl p-3 -mt-4">
          <div className="flex justify-end mb-4">
          </div>
          <div>
            <h1 className="text-xl font-bold mb-2">Welcome Mukunda!</h1>
            <button onClick={handleLogout}>Log Out</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
