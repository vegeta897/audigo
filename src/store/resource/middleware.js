import { RESOURCE_UPLOAD_REQUEST, RESOURCE_UPLOAD_SUCCESS, studioOnUpload } from 'store/actions';
const middleware = store => next => action => {
    const { type, payload } = action;
    if(type === RESOURCE_UPLOAD_REQUEST) {
        // Prepare clip upload into multipart form data
        let { file, fileName, title, description, startTime } = payload.data;
        let data = new FormData();
        data.append('audio', file, fileName);
        if(title) data.append('title', title);
        if(description) data.append('description', description);
        if(startTime) data.append('recordDate', startTime);
        if(fileName) data.append('fileName', fileName);
        return next({ ...action, payload: { data } });
    }
    if(type === RESOURCE_UPLOAD_SUCCESS) {
        // Tell studio about uploaded clip
        store.dispatch(studioOnUpload(payload));
    }
    return next(action);
};

export default middleware;
