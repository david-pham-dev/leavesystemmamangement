// src/types/auth.ts
export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface AuthResponse {
    token: string;
    user: {
      id: string;
      name: string;
      role: string;
    };
  }
  export interface RegisterCredentials {
    email: string;
    password: string;
    name: string;
  }
  
  
  export interface RegisterResponse {
    message: string;
  }
  export interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'employee' | 'manager';
  }
  export interface LoginFormData {
    email: string;
    password: string;
  }
