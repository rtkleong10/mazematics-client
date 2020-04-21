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
    topicsReducer: {
        item: 
            {
                "id": 1,
                "title": "Addition",
                "description": "Putting 2 and 2 together",
            },
        
        isLoading: {
            [METHODS.LIST]: false
        },
        hasFailed: {
            [METHODS.LIST]: false
        }
    },
    levelsReducer: {
        items: [
            {
                    "id": 1,
                    "title": "Adding 1 to 100",
                    "description": "Smol numbers.",
                    "playable":false
                },
                {
                    "id": 2,
                    "title": "Adding 1 to 1000",
                    "description": "Big numbers.",
                    "playable":false
                }
        ],
        isLoading: {
            [METHODS.LIST]: false
        },
        hasFailed: {
            [METHODS.LIST]: false
        },
    }
}

withReduxRouter(<TopicPage match={matchObject} />, initialState).renderedComponent
```