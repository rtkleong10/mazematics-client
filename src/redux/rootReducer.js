import { combineReducers } from 'redux';

import authReducer from './ducks/auth';
import topicsReducer from './ducks/topics';
import levelsReducer from './ducks/levels';
import learningMaterialsReducer from './ducks/learningMaterials';
import questionsReducer from './ducks/questions';

export default combineReducers({
    authReducer,
    topicsReducer,
    levelsReducer,
    learningMaterialsReducer,
    questionsReducer,
});