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
    topicsReducer: {
        items: [
                    {
                        "id": 1,
                        "questionText": "1 + 1",
                        "options": {
                            "0": 1,
                            "1": 2,
                        },
                        "answer": 1,
                    }
                    ],
        isLoading: {
            [METHODS.LIST]: false
        },
        hasLoaded: {
            [METHODS.LIST]: false
        }
    }
}

withReduxRouter(<LevelPage match={matchObject}/>, initialState).renderedComponent
```