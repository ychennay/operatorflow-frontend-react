const jobmocks = {
    "jobs": [
        {
            "job_id": 2,
            "settings": {
                "name": "Shakespeare Word Count",
                "new_cluster": {
                    "spark_version": "5.5.x-scala2.11",
                    "aws_attributes": {
                        "zone_id": "us-east-1b",
                        "first_on_demand": 1,
                        "availability": "SPOT_WITH_FALLBACK"
                    },
                    "node_type_id": "i3.xlarge",
                    "spark_env_vars": {
                        "PYSPARK_PYTHON": "/databricks/python3/bin/python3"
                    },
                    "enable_elastic_disk": false,
                    "num_workers": 8
                },
                "email_notifications": {},
                "timeout_seconds": 0,
                "schedule": {
                    "quartz_cron_expression": "0 0 0 ? * 1",
                    "timezone_id": "US/Pacific"
                },
                "notebook_task": {
                    "notebook_path": "/Users/ychen244@syr.edu/example-operator-flow-job",
                    "revision_timestamp": 0
                },
                "max_concurrent_runs": 1
            },
            "created_time": 1568092620766,
            "creator_user_name": "ychen244@syr.edu"
        }
    ]
}

export default jobmocks;