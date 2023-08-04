import usePostRequest from "./usePostRequest";
import useLoadingSpinner from "./useLoadingSpinner";

const usePostRequestWithLoading = (url) => {
  const { error, postRequest } = usePostRequest(url);
  const { isLoading, showLoading, hideLoading } = useLoadingSpinner();

  const postRequestWithLoading = async (data) => {
    try {
      showLoading();
      const responseData = await postRequest(data);
      window.localStorage.setItem("TOKEN", responseData.token)
      hideLoading();
      return responseData;
    } catch (error) {
      hideLoading();
      throw error;
    }
  };

  return { isLoading, error, postRequest: postRequestWithLoading };
};

export default usePostRequestWithLoading;
