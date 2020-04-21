### Example:

```js
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { MemoryRouter as Router } from 'react-router-dom';
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
    levelsReducer: {
        item: 
                    {
                        "id": 1,
                        "title": "Adding 1 to 100",
                        "description": "Small numbers.",
                        "topic":1,
                        "playable":false

                        },
        isLoading: {
            [METHODS.LIST]: false
        },
        hasLoaded: {
            [METHODS.LIST]: false
        }
    },
    questionsReducer: {
        items: [
                    {
                        "id": 1,
                        "questionText": "1 + 1",
                        "options": {
                            "0": 1,
                            "1": 2,
                        },
                        "answer": 1,
                    },
                    {
                        "id": 2,
                        "questionText": "1 + 2",
                        "options": {
                            "0": 1,
                            "1": 2,
                            "2": 3,
                        },
                        "answer": 2,
                    }
                ],
        isLoading: {
            [METHODS.LIST]: false
        },
        hasFailed: {
            [METHODS.LIST]: false
        }
    },
    learningMaterialsReducer: {
        items: [
                    {
                            "id": 1,
                            "title": "Basic addition",
                            "description": "This is an interesting video",
                            "link": "https://www.youtube.com/embed/Fe8u2I3vmHU",
                        },
                    {
                            "id": 2,
                            "title": "Basic subtraction",
                            "description": "This is an interesting video",
                            "link": "https://www.youtube.com/embed/ug0gs8kLE48",
                        }
                ],
        isLoading: {
            [METHODS.LIST]: false
        },
        hasFailed: {
            [METHODS.LIST]: false
        }
    },
}

withReduxRouter(<LearningMaterialList levelId={1} editable={true}/>, initialState)
```