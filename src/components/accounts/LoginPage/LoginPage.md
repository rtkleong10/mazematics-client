### Example:

```js
import MaterialTable from 'material-table';
import { Router, withRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { withReduxRouter } from '../../../utils/mock.js';
const initialState = {
}
withReduxRouter(<LoginPage/>, initialState).renderedComponent    

```