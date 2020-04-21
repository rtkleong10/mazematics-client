```js
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { METHODS } from '../../../redux/ducks/apiHelper.js';
import { withReduxRouter } from '../../../utils/mock.js';
const initialState = {
 
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
    }
}

withReduxRouter(<QuestionsList levelId={1} editable={true}/>, initialState).renderedComponent
```