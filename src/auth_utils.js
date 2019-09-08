// helper file containing functions and constants for authentication

let API_GATEWAY_POST_PAYLOAD_TEMPLATE = {
	"operation": "read",
	"tableName": "databricks-api",
	"payload": {
		"Key": {
            "user_id": "yuchen_test@mailinator.com"
        }
	}
}