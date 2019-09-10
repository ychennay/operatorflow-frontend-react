import uuid from 'uuid/v1';
const mockdata = [
  {
    id: uuid(),
    ref: 'CDD1049',
    amount: 30.5,
    customer: {
      name: 'Ekaterina Tankova'
    },
    createdAt: 1555016400000,
    status: 'pending'
  },
  {
    id: uuid(),
    ref: 'CDD1048',
    amount: 25.1,
    customer: {
      name: 'Cao Yu'
    },
    createdAt: 1555016400000,
    status: 'delivered'
  },
  {
    id: uuid(),
    ref: 'CDD1047',
    amount: 10.99,
    customer: {
      name: 'Alexa Richardson'
    },
    createdAt: 1554930000000,
    status: 'refunded'
  },
  {
    id: uuid(),
    ref: 'CDD1046',
    amount: 96.43,
    customer: {
      name: 'Anje Keizer'
    },
    createdAt: 1554757200000,
    status: 'pending'
  },
  {
    id: uuid(),
    ref: 'CDD1045',
    amount: 32.54,
    customer: {
      name: 'Clarke Gillebert'
    },
    createdAt: 1554670800000,
    status: 'delivered'
  },
  {
    id: uuid(),
    ref: 'CDD1044',
    amount: 16.76,
    customer: {
      name: 'Adam Denisov'
    },
    createdAt: 1554670800000,
    status: 'delivered'
  }
];

const clustermocks = [
  {
    cluster_id: "0811-221347-eats964",
    spark_context_id: 5657178189791718885,
    cluster_name: "operatorflow-spark-cluster",
    spark_version: "5.4.x-scala2.11",
    aws_attributes: {
      zone_id: "us-east-1b",
      first_on_demand: 1,
      availability: "SPOT_WITH_FALLBACK",
      spot_bid_price_percent: 100,
      ebs_volume_type: "GENERAL_PURPOSE_SSD",
      ebs_volume_count: 3,
      ebs_volume_size: 100
    },
    node_type_id: "m5.large",
    driver_node_type_id: "m5.large",
    spark_env_vars: {
      PYSPARK_PYTHON: "/databricks/python3/bin/python3"
    },
    autotermination_minutes: 120,
    enable_elastic_disk: false,
    cluster_source: "UI",
    state: "TERMINATED",
    state_message: "Inactive cluster terminated (inactive for 120 minutes).",
    start_time: 1565561627325,
    terminated_time: 1565569828763,
    last_state_loss_time: 0,
    autoscale: {
      min_workers: 1,
      max_workers: 8
    },
    default_tags: {
      Vendor: "Databricks",
      Creator: "ychen244@syr.edu",
      ClusterName: "operatorflow-spark-cluster",
      ClusterId: "0811-221347-eats964"
    },
    creator_user_name: "ychen244@syr.edu",
    termination_reason: {
      code: "INACTIVITY",
      parameters: {
        inactivity_duration_min: "120"
      }
    },
    init_scripts_safe_mode: false
  }
]

export default clustermocks;