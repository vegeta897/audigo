import { endpoints, request, bindExpress } from './models';
import { apiPath } from '../config';

jest.mock('server/db', () => {
    let clip = { id: 'abc', title: 'foo' };
    return {
        init: () => {},
        knex: ({
            select: (...cols) => ({
                from: (table) => ({
                    where: (col, val) => new Promise((resolve, reject) => {
                        resolve(val === 'abc' ? [clip] : []);
                    }),
                    limit: limit => new Promise((resolve, reject) => {
                        resolve([clip, clip, clip].splice(0, limit))
                    })
                })
            })
        })
    }
});

describe('bindExpress', () => {
    it('creates endpoints', () => {
        let get = jest.fn();
        bindExpress({ get });
        expect(get.mock.calls.length).toBe(endpoints.size);
        let i = 0;
        endpoints.forEach((val, key) => {
            expect(get.mock.calls[i][0]).toBe(apiPath + key);
            expect(get.mock.calls[i][1]).toBeInstanceOf(Function);
            i++;
        });
    });
});

describe('models /clips', () => {
    it('gets a clip by id', () => {
        return expect(request('/clips', 'get', { id: 'abc' })).resolves.toMatchObject({ id: 'abc' });
    });

    it('throws an error for missing clip id', () => {
        return expect(request('/clips', 'get', { id: 'def' })).rejects.toThrow('clip not found');
    });

    it('gets clip list', () => {
        return expect(request('/clips', 'get', {})).resolves.toHaveLength(3);
    });

    it('gets clip list with limit', () => {
        return expect(request('/clips', 'get', { limit: 1 })).resolves.toHaveLength(1);
    });
});
