import db from './db';

describe('init', () => {
    it('builds the schema', () => {
        expect.assertions(1);
        return db.init().then(data => {
            expect(data[0].constructor.name).toBe('Result');
        });
    });
});

describe('knex', () => {
    it('is using the test database', () => {
        expect.assertions(1);
        return db.knex.raw('SELECT current_database();').then(({ rows: [row] }) => {
            expect(row.current_database).toBe('audigo_test');
        });
    });

    it('can run a query', () => {
        expect.assertions(1);
        return db.knex.raw('select now();').then(data => {
            expect(data.rowCount).toBe(1);
        });
    });
});

afterAll(() => {
    db.knex.schema.dropTable('clips')
        .then(() => db.knex.destroy());
}, 30000);
