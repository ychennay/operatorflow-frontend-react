import axios from 'axios';

const API_GATEWAY_ENDPOINT = "https://19mgxwhsm8.execute-api.us-east-1.amazonaws.com"

const fetchDatabricksResource = async (idToken, resource) => {
    try {
      const headers = {
        Authorization: idToken
      };
  
      console.log(headers);
  
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

  export { fetchDatabricksResource}