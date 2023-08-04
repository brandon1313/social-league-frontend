// usePostRequest.js
import { useState } from "react";

const usePostRequest = (url) => {
  const [error, setError] = useState(null);

  const postRequest = async (data) => {
    setError(null);

    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      const response = await fetch(url, requestOptions);

      if (!response.ok && response.status === 401) {
        throw new Error("Hubo un error verifica tu contraseña");
      }

      try {
        const responseData = await response.json();
        return responseData;
      } catch (err) {
        return "OK";
      }
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  return { error, postRequest };
};

export default usePostRequest;
