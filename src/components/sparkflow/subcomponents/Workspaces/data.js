import uuid from 'uuid/v1';
import moment from 'moment';

const mock = {
    "objects": [
        {
            "object_type": "NOTEBOOK",
            "path": "/Users/ychen244@syr.edu/example-operator-flow-job",
            "language": "PYTHON"
        }
    ]
}




export default [
  {
    id: uuid(),
    name: 'example-operator-flow-job',
    imageUrl: '/images/languages/python.png',
    updatedAt: moment().subtract(2, 'hours')
  },
  {
    id: uuid(),
    name: 'software-engineering-much-fun',
    imageUrl: '/images/languages/scala.png',
    updatedAt: moment().subtract(2, 'hours')
  },
  {
    id: uuid(),
    name: 'Slack',
    imageUrl: '/images/languages/r.png',
    updatedAt: moment().subtract(3, 'hours')
  },
  {
    id: uuid(),
    name: 'Lyft',
    imageUrl: '/images/languages/sql.png',
    updatedAt: moment().subtract(5, 'hours')
  }
];


// export default mock;