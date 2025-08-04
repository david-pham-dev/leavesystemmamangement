import { RegisterCredentials } from '../types/auth';
export const RegisterUser = async(credentials: RegisterCredentials)=>{
    const response = await fetch("http://localhost5171/api/register",{
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    })
    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      } 
      return await response.json();
}