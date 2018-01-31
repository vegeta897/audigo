import { combineReducers } from 'redux';
import { recorderReducer, stageReducer, uploadReducer } from './studioReducers';

export default combineReducers({
    recorder: recorderReducer,
    stage: stageReducer,
    upload: uploadReducer
});