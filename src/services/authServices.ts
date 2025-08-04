import { LoginCredentials, AuthResponse } from '../types/auth';
export const LoginUser = async(credentials: LoginCredentials) =>{
    const API_URL = process.env.REACT_APP_API_URL;
    const response = await fetch(`${API_URL}/api/login`,{
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    });
    return response.json();
}