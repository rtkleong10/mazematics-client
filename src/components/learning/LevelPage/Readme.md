### Example:

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
    levelsReducer: {
        item: 
                    {
                        "id": 1,
                        "title": "Adding 1 to 100",
                        "description": "Small numbers.",
                        "topic":1,
                        "playable":true

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
                            "description": "Interesting video",
                            "link": "https://www.youtube.com/embed/Fe8u2I3vmHU",
                        }
                ],
        isLoading: {
            [METHODS.LIST]: false
        },
        hasFailed: {
            [METHODS.LIST]: false
        }
    },
    progressReducer: {
        crudlReducer: {
            item: {
                "complete":true
            },
            isLoading: {
            [METHODS.RETRIEVE]: false
        },
        hasFailed: {
            [METHODS.RETRIEVE]: false
        }

        }
    }
}

withReduxRouter(<LevelPage match={matchObject}/>, initialState)
```