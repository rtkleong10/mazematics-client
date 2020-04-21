```js
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import { METHODS } from '../../../redux/ducks/apiHelper.js';
import { withReduxRouter } from '../../../utils/mock.js';

const matchObject = {
    params: {
        topicId: 1,
        levelId: 1,
    }
}
const initialState = {
    authReducer: {
        user: {
            "name": "Bob"
        }
    },
    progressReducer: {
        additionalReducer: {
            report: [
                {
                    "question": {
                        "questionText": "1 + 1"
                    },
                    "attempts": [
                        {
                            "user": {
                                "name": "Bob"
                            },
                            "attemptCount": 1
                        },
                        {
                            "user": {
                                "name": "Joe"
                            },
                            "attemptCount": 2
                        },
                        {
                            "user": {
                                "name": "Kelly"
                            },
                            "attemptCount": 1
                        },
                    ],
                },
                {
                    "question": {
                        "questionText": "1 + 3"
                    },
                    "attempts": [
                        {
                            "user": {
                                "name": "Bob"
                            },
                            "attemptCount": 4
                        },
                        {
                            "user": {
                                "name": "Joe"
                            },
                            "attemptCount": 3
                        },
                        {
                            "user": {
                                "name": "Kelly"
                            },
                            "attemptCount": 3
                        },
                    ],
                },
            ],
            isLoading: {
                [METHODS.LIST]: false
            }
        }
    }
}

withReduxRouter(<StudentReportsPage />, initialState).renderedComponent
```