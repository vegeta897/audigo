import { combineReducers } from 'redux';
import { recorderReducer, stageReducer, uploadReducer } from './studioReducers';
import { playReducer } from './playReducers';

export default combineReducers({
    recorder: recorderReducer,
    stage: stageReducer,
    upload: uploadReducer,
    play: playReducer
});