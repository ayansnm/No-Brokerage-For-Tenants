import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useSubscription from './useSubscription';

const useRequirement = () => {
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const {loading:load, subscribe} = useSubscription();

  const submitRequirement = async (formData) => {
    setLoading(true);
    const token = localStorage.getItem("token");

    const sendRequirementData = async () => {
      const response = await fetch(`${API_URL}/api/property/requirementForm`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log("Requirement Result:", result);

      if (!response.ok) {
        throw new Error(result.message || 'Failed to submit requirement');
      }
      else if(response.ok){
        await subscribe(formData.amount, result?.data?._id)
        // navigate("/")
      }
      return result;
    };

    try {
      const result = await toast.promise(sendRequirementData(), {
        loading: 'Submitting...',
        success: <b>Requirement saved successfully!</b>,
        error: <b>Submission failed</b>,
      });

      return result;
    } catch (error) {
      console.error('Requirement Submission Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, submitRequirement };
};

export default useRequirement;
