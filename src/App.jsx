import Navbar from "./component/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { useAuthStore } from "./store/useAuthStore.js";
import { Loader } from 'lucide-react'
import { useEffect } from "react";
import { Toaster } from "react-hot-toast"

import "./App.css";
import { useThemeStore } from "./store/useThemeStore.js";

const App = () => {
  const {theme} =useThemeStore();
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);


  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    )
  return (
    <div data-theme={theme}>
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />}></Route>
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />}></Route>
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />}></Route>
        <Route path="/settings" element={<SettingsPage />}></Route>
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />}></Route>
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
