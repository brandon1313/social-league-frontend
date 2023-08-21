// Create a variable to hold the original fetch function
const originalFetch = window.fetch;

// Create a custom function to modify the request or response
const fetchInterceptor = (url, options) => {
  const token = window.localStorage.getItem("TOKEN");
  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  return originalFetch(url, options)
    .then(async (response) => {
      if (url.indexOf("authentication") !== -1) {
        return response;
      }

      if (response.status === 401) {
        window.location.href = "#/login";
      }

      return response;
    })
    .catch((error) => {
      console.error("Fetch Error:", error);
      throw error;
    });
};

// Replace the global fetch function with our custom fetchInterceptor
window.fetch = fetchInterceptor;
