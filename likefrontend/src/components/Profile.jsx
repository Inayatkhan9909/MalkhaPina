import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();

    const [isloggedin, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token !== null) {
            setIsLoggedIn(true);
        }
        
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

  return (
    <div>
       
                        {isloggedin && <button onClick={handleLogout}> LogOut</button>}
                     
    </div>
  )
}

export default Profile