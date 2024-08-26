export const Login = async (email, password) => {
   try {
     const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/login`, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({ email, password }),
     });
 
     const data = await response.json();
 
     if (!response.ok) {
       throw new Error(data.message || 'Login failed');
     }
 
     return data;  
   } catch (error) {
     throw error; 
   }
 };

 export const Signup = async (name, email, password) => {
   try {
     const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/signup`, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({ name, email, password }),
     });
 
     const data = await response.json();
 
     if (!response.ok) {
       throw new Error(data.message || 'Signup failed');
     }
 
     return data;  
   } catch (error) {
     throw error; 
   }
 };