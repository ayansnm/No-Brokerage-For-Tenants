import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const useRegistration = () => {
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const registration = async (data) => {
    setLoading(true);
    console.log(data);
    
    // Wrap the actual fetch logic in a function for toast.promise
    const saveSettings = async () => {
      const response = await fetch(`${API_URL}/api/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Registration failed');
      }
      else if(response.ok){
        console.log("Result:" , JSON.stringify(result));
        localStorage.setItem('mobileNo',result?.data?.user?.mobileNo);
        navigate("/VerifyOtp")
      }

      return result;
    };

    try {
      const result = await toast.promise(
        saveSettings(),
        {
          loading: 'Loading...',
          success: 'Registration successful!',
          error: (err) => err.message || 'Could not register.',
        }
      );

      return result;
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, registration };
};

export default useRegistration;
