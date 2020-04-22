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
    progressReducer: {
        additionalReducer: {
            leaderboard: [
                {
                "name": "Bob",
                "timing": 120000,
                },
                {
                "name": "Joe",
                "timing": 150000,
                },
                {
                "name": "Kelly",
                "timing": 200000,
                },
            ],
            isLoading: {
                [METHODS.LIST]: false
            }
        }
    }
}

withReduxRouter(<LeaderboardPage match={matchObject}/>, initialState)
```