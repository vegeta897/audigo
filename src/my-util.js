const padStart = require('lodash/padStart');

export const msToHMS = ms => {
    const s = Math.floor(ms / 1000) % 60;
    const m = Math.floor(ms / (60 * 1000)) % 60;
    const h = Math.floor(ms / (60 * 60 * 1000));
    let stamp = (h ? padStart(m, 2, '0') : m) + ':' + padStart(s, 2, '0');
    if(h) stamp = h + ':' + stamp;
    return stamp;
};
