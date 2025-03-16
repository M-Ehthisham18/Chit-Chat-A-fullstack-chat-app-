import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Loginpage from "./pages/Loginpage";
import Signuppage from "./pages/Signuppage";
import Settingpage from "./pages/Settingpage";
import Profilepage from "./pages/Profilepage";
import { useAuthStore  } from "./store/useAuthSotre";
import { useThemeStore  } from "./store/useThemeStore";
import { Toaster } from "react-hot-toast";
import NavBar from "./components/NavBar.jsx"

const App = () => {
  const {authUser, checkAuth, isCheckingAuth, onlineUsers} = useAuthStore();
  const {theme}=useThemeStore();
  
  useEffect(() => {
    checkAuth();
  }, [checkAuth])

if (isCheckingAuth && !authUser) {
  return(
    <span className="loading loading-spinner text-info flex items-center justify-center w-5 h-5 " ></span>
  )
}
  
  return (
    <>
      <div data-theme={theme}>
        <NavBar/>
        <Routes>
          <Route path="/" element={authUser ? <Homepage /> : <Navigate to='/login'/>} />
          <Route path="/login" element={!authUser ? <Loginpage /> : <Navigate to='/'/>} />
          <Route path="/signup" element={!authUser ? <Signuppage /> : <Navigate to='/login'/>} />
          <Route path="/settings" element={<Settingpage />} />
          <Route path="/profile" element={authUser ? <Profilepage /> : <Navigate to='/login'/>} />
        </Routes>
        <Toaster/>
      </div>
    </>
  );
};

export default App;
