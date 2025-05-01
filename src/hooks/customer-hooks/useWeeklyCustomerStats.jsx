// useWeeklyCustomerStats.jsx
import { useState, useEffect } from "react";

const useWeeklyCustomerStats = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      const res = await fetch("/api/weekly-stats");
      const data = await res.json();
      setStats(data);
    };

    fetchStats();
  }, []);

  return stats;
};

export default useWeeklyCustomerStats;
