import 'isomorphic-fetch';

let API = process.env.BROWSER ? '/api/' : 'http://localhost:4444/api/';

function handleFetch(endpoint, options, type, customHeaders) {
    let data = {};
    return fetch(API + endpoint, options)
        .then(res => {
            // for(let pair of res.headers.entries()) console.log(...pair);
            if(customHeaders) data.customHeaders = getCustomHeaders(res.headers, customHeaders);
            let contentType = res.headers.get('content-type');
            if(contentType && contentType.includes('application/json')) return res.json();
            if(type === 'blob' && process.env.BROWSER) return res.blob();
            return res.text();
        })
        .then(res => {
            if(res.error) throw res.error;
            data.res = res;
            return data;
        });    
}

function getCustomHeaders(headers, list) {
    let obj = {};
    if(process.env.BROWSER) {
        for(let pair of headers.entries()) {
            if(list.includes(pair[0])) obj[pair[0]] = pair[1];
        }
    } else {
        for(let key in headers) {
            if(list.includes[key]) obj[key] = headers[key];
        }
    }
    return obj;
}

export const upload = (file, fileName, title) => {
    let fd = new FormData();
    fd.append('audio', file, fileName);
    fd.append('title', title);
    return handleFetch('upload', { method: 'post', body: fd }, 'json');
};

export const get = id => {
    return handleFetch('get/' + id, { method: 'get' }, 'blob',
        ['created', 'updated', 'title', 'file_name', 'duration', 'file_size']);
};