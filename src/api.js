const API = process.env.API_HOST + ':' + process.env.API_PORT + '/api/';

function handleFetch(endpoint, options, type, customHeaders) {
    return fetch(API + endpoint, options)
        .then(res => {
            let data = { res };
            try {
                switch(type) {
                    case 'json': res.json();
                    case 'blob': res.blob();
                }
                if(res.error) data.error = res.error;
                if(customHeaders) data.customHeaders = getCustomHeaders(res.headers, customHeaders)
            } catch(err) {
                throw Error(err)
            }
            return data;
        })
        .then(data => {
            if(data.error) throw Error(data.error);
            return data;
        });    
}

function getCustomHeaders(headers, list) {
    let obj = {};
    for(let pair of headers.entries()) {
        if(list.includes(pair[0])) obj[pair[0]] = pair[1];
    }
    return obj;
}

export const upload = (file, fileName) => {
    let fd = new FormData();
    fd.append('audio', file, fileName);
    return handleFetch('upload', { method: 'post', body: fd }, 'json');
};

export const get = id => {
    return handleFetch('get/' + id, { method: 'post' }, 'blob',
        ['created', 'updated', 'filename', 'duration', 'filesize']);
};