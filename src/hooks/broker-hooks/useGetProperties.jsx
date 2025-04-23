import React, { useState } from 'react'

const useGetProperties = () => {
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);

  const getProperties = async()=>{
    setLoading(true);
    try {
        
    } catch (error) {
        
    } finally{
        setLoading(false)
    }
  }

  return {loading, properties, getProperties};
}

export default useGetProperties
