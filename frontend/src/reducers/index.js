// combine reducer
import { combineReducers } from 'redux';
import auth from './reducer/auth';
import alert from './reducer/alert';

export default combineReducers({
    auth: auth,
    alert: alert,
});
