import { studioOnUpload } from 'store/actions';
const middleware = store => next => action => {
    const { payload, meta = {} } = action;
    if(meta.thunk === 'clipsUpload') {
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
    if(meta.thunk && meta.thunk.startsWith('clipsUpload') && payload.id) {
        // Tell studio about uploaded clip
        store.dispatch(studioOnUpload(payload.id));
    }
    return next(action);
};

export default middleware;
