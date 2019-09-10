import axios from 'axios';

const fetchDatabricksKey = async idToken => {
    try {
      const headers = {
        Authorization: idToken
      };
  
      return await axios.post(
        "https://19mgxwhsm8.execute-api.us-east-1.amazonaws.com/v1/token",
        API_GATEWAY_POST_PAYLOAD_TEMPLATE,
        {
          headers: headers
        }
      );
  
    } catch (e) {
      console.log(`😱 Axios request failed! : ${e}`);
      return e;
    }
  };
  
  let API_GATEWAY_POST_PAYLOAD_TEMPLATE = {
    operation: "read",
    tableName: "databricks-api",
    payload: {
      Key: {
        user_id: "yuchen_test@mailinator.com"
      }
    }
  };
  