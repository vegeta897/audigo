// Prepare clip upload into multipart form data
const middleware = store => next => action => {
    const { payload, meta } = action;

    if(meta.thunk === 'clipsUpload') {
        let { file, fileName, title, description, startTime } = payload.data;
        let data = new FormData();
        data.append('audio', file, fileName);
        if(title) data.append('title', title);
        if(description) data.append('description', description);
        if(startTime) data.append('recordDate', startTime);
        if(fileName) data.append('fileName', fileName);
        return next({ ...action, payload: { data } });
    }
    return next(action);
};

export default middleware;
