
```js
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import { METHODS } from '../../../redux/ducks/apiHelper.js';
import { withReduxRouter } from '../../../utils/mock.js';
const details = {
        title: 'Basic Addition',
        description: 'This is an interesting video',
    };
withReduxRouter(<BasicCard editable={true} details={details} link="https://www.youtube.com/embed/AuX7nPBqDts" handleUpdate={()=>{}} handleDelete={()=>{}}/>)
```