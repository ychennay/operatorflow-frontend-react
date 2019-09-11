import axios from 'axios';

const API_GATEWAY_ENDPOINT = "https://19mgxwhsm8.execute-api.us-east-1.amazonaws.com"

const fetchDatabricksResource = async (idToken, resource, cache=true) => {
    try {

      const headers = {
        Authorization: idToken
      };

      if (!cache){
        headers["Cache-Control"] = "max-age=0"
      }

      console.log(headers)

      return await axios.get(
        `${API_GATEWAY_ENDPOINT}/v1/${resource}`,
        {
          headers: headers
        }
      );
    } catch (e) {
      console.log(`😱 Axios request failed! : ${e}`);
      return e;
    }
  };


  const createDatabricksResource = async (idToken, resource, data) => {
    try {
      const headers = {
        Authorization: idToken
      };

      return await axios.post(
        `${API_GATEWAY_ENDPOINT}/v1/${resource}`, data,
        {
          headers: headers
        });
    } catch (e) {
      console.log(`😱 Axios request failed! : ${e}`);
      return e;
    }
  }

  export { fetchDatabricksResource, createDatabricksResource}