const newJobTemplate = {
    "name": null,
    "new_cluster": {
      "spark_version": "5.3.x-scala2.11",
      "node_type_id": "r3.xlarge",
      "aws_attributes": {
        "availability": "ON_DEMAND"
      },
      "num_workers": null
    },
    "email_notifications": {
      "on_start": [],
      "on_success": [],
      "on_failure": []
    },
    "timeout_seconds": 3600,
    "max_retries": 1,
    "notebook_task": {
      "notebook_path": "com.databricks.ComputeModels"
    }
  }