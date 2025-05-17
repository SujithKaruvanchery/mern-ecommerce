import { useEffect, useState } from "react";
import { AxiosInstance } from "../config/AxiosInstance";

function useFetch(url) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({});

  const fetchData = async () => {
    try {
      const response = await AxiosInstance({
        method: "GET",
        url: url,
      });
      console.log("=======response=======", response);
      setData(response?.data?.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setError(error);
    }finally {
      setIsLoading(false);//add setloading
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return [data, isLoading, error];
}

export default useFetch;
