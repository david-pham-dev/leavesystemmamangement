import { jwtDecode } from 'jwt-decode';
const DecodeToken = (token: string) => {
    try {
      const decoded = jwtDecode(token);
      return decoded;
    } catch (error) {
      console.error("Error decoding JWT:", error);
      return null;
    }
  };
  export default DecodeToken;