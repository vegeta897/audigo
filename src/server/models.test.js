import { models, bindExpress, downloadPath } from './models';
import { protocol, host, port, apiPath } from '../config';
const downloadUrl = protocol + host + ':' + port + downloadPath;

jest.mock('server/db', () => ({
    knex: ({
        select: (...cols) => ({
            from: (table) => ({
                where: (col, val) => new Promise((resolve, reject) => {
                    resolve(val === 'abc' ? [{ id: 'abc' }] : []);
                }),
                limit: limit => new Promise((resolve, reject) => {
                    resolve([{},{},{}].splice(0, limit))
                })
            })
        })
    })
}));

describe('bindExpress', () => {
    it('creates endpoints', () => {
        let get = jest.fn();
        bindExpress({ get });
        expect(get.mock.calls.length).toBe(models.size);
        let i = 0;
        models.forEach((val, key) => {
            expect(get.mock.calls[i][0]).toBe(apiPath + key);
            expect(get.mock.calls[i][1]).toBeInstanceOf(Function);
            i++;
        });
    });
});

describe('models /clips', () => {
    it('gets a clip by id', () => {
        expect(models.get('/clips')( { id: 'abc' } )).resolves.toEqual({
            id: 'abc',
            url: `${downloadUrl}/abc.mp3`
        });
    });

    it('throws an error for missing clip id', () => {
        expect(models.get('/clips')( { id: 'def' } )).rejects.toThrow('clip not found');
    });

    it('gets clip list', () => {
        expect(models.get('/clips')({})).resolves.toEqual([{},{},{}]);
    });

    it('gets clip list with limit', () => {
        expect(models.get('/clips')({ limit: 1 })).resolves.toEqual([{}]);
    });
});
