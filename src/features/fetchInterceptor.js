// Create a variable to hold the original fetch function
const originalFetch = window.fetch;

// Create a custom function to modify the request or response
const fetchInterceptor = async (url, options) => {
  const token = window.localStorage.getItem("TOKEN");
  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  try{
      const response = await originalFetch(url, options)
    if (url.indexOf("authentication") !== -1) {
      return response;
    }

    if (response.status === 401) {
      window.location.href = "#/login";
    }
    if(response.status > 300)
       throw response;
    return response;
  }catch(error){
    console.log(error)
    throw error
  }

};

// Replace the global fetch function with our custom fetchInterceptor
window.fetch = fetchInterceptor;
