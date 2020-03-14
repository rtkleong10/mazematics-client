### Example:

```js
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import store from '../../../redux/store';

<Provider store={store}>
    <Router>
        <TeachingHomePage />
    </Router>
</Provider>
```