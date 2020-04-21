```js
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { METHODS } from '../../../redux/ducks/apiHelper.js';
import { withReduxRouter } from '../../../utils/mock.js';

quesobj={
    questionText:"What is 2+2?",
    options:['1','2','3','4'],
    answer:'4'
};
var editablebool=true;

<Question editable={editablebool} question={quesobj} handleUpdate={()=>{}} handleDelete={()=>{}}/>
```