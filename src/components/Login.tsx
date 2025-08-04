import React, { useState } from 'react';
import { Eye, EyeOff, Calendar, Users, CheckCircle } from 'lucide-react';
import { LoginFormData } from '../types/auth';
import RegistrationModal from './RegistrationModal';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";
const LoginPage: React.FC = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const decodeJwtToken = (token: string) => {
    try {
      const decoded = jwtDecode(token);
      return decoded;
    } catch (error) {
      console.error("Error decoding JWT:", error);
      return null;
    }
  };
  const handleSubmit = async () => {
    console.log('Form data to send to API:', formData);
    const response = await fetch(`${API_URL}/api/login`,{
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
  });
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
    const token = await response.text();
    var role = '';
    console.log("This is token: ",token)
    localStorage.setItem("accessToken", token);
    var decodedToken = decodeJwtToken(token)
    console.log("This is decoded: ",decodedToken)
    if(decodedToken){
      const roleClaimKey = Object.keys(decodedToken).find(k=> k.endsWith("/role"));
      role = roleClaimKey ? (decodedToken as any)[roleClaimKey] : null; // as any here because ClaimKeys are dynamic
      console.log('this is role: ',role)
    } 
    if(role == "Employee"){
      navigate("/employee")
    }
    if(role == "Manager"){
      navigate("/manager")
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 p-12 flex-col justify-between text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full transform translate-x-32 -translate-y-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full transform -translate-x-24 translate-y-24"></div>
          
          <div className="relative z-10">
            <div className="flex items-center mb-8">
              <Calendar className="w-8 h-8 mr-3" />
              <h1 className="text-2xl font-bold">LeaveManager Pro</h1>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg">Smart Leave Tracking</h3>
                  <p className="text-blue-100 mt-1">Automated calculations and real-time balance updates</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Users className="w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg">Team Management</h3>
                  <p className="text-blue-100 mt-1">Streamlined approval workflows and team visibility</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* <div className="relative z-10">
            <p className="text-blue-100 text-sm">
              "This system has transformed how we handle leave requests. Simple, efficient, and reliable."
            </p>
            <p className="text-white font-medium mt-2">Sarah Johnson, HR Director</p>
          </div> */}
        </div>

        {/* Right Panel - Login Form */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12">
          <div className="max-w-md mx-auto">
            <div className="mb-8">
              <div className="lg:hidden flex items-center justify-center mb-6">
                <Calendar className="w-8 h-8 mr-3 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-800">LeaveManager Pro</h1>
              </div>
              
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome back</h2>
              <p className="text-gray-600">Sign in to access your leave management dashboard</p>
            </div>

            <div className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange}
                    className="text-black w-full px-4 py-3 border border-gray-300 rounded-lg pr-12 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02]"
              >
                Sign In
              </button>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <a onClick={()=> setShowModal(true)} href="#" className="text-blue-600 hover:text-blue-500 font-medium">
                 Register A New Account
                </a>
              </p>
            </div>
            <div>
              {
              <RegistrationModal onSuccess={()=>setShowModal(false)} isOpen ={showModal} onClose={()=>setShowModal(false)} />
              }
            </div>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;