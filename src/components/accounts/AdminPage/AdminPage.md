### Example:

```js
import MaterialTable from 'material-table';
import { Router, withRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { withReduxRouter } from '../../../utils/mock.js';
const initialState = {
    usersReducer: {
        items: [
            {
            "name": "Bob",
            "email": "bob@test.com",
            "role" : "ROLE_STUDENT"
            },
            {
            "name": "Sam",
            "email": "sam@test.com",
            "role" : "ROLE_TEACHER"
            },
            {
            "name": "Adam",
            "email": "admin@test.com",
            "role" : "ROLE_ADMIN"
            }
        ],
        usersLoading: false,
        usersFailed: false,
        isLoading: false
    }   
}
withReduxRouter(<React.Fragment>
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/> <AdminPage/>
                </React.Fragment>, initialState).renderedComponent    

```