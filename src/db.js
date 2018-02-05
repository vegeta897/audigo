const { Pool } = require('pg');

const pool = new Pool();
const db = { pool };

db.query = (text, params, callback) => pool.query(text, params, callback);
db.getClient = callback => pool.connect() // https://node-postgres.com/guides/project-structure
    .then((err, client, done) => {
        const query = client.query.bind(client);
        // monkey patch the query method to keep track of the last query executed
        client.query = (...args) => {
            client.lastQuery = args;
            query(...args);
        };
        // set a timeout of 5 seconds, after which we will log this client's last query
        const timeout = setTimeout(() => {
            console.error('A client has been checked out for more than 5 seconds!');
            console.error(`The last executed query on this client was: ${client.lastQuery}`);
        }, 5000);
        const release = (err) => {
            // call the actual 'done' method, returning this client to the pool
            done(err);
            // clear our timeout
            clearTimeout(timeout);
            // set the query method back to its old un-monkey-patched version
            client.query = query;
        };
        callback(err, client, release);
    });

db.init = () => db.query(initSql).catch(console.log);

const initSql = `
    CREATE TABLE IF NOT EXISTS clips (
        id int PRIMARY KEY
    );
    CREATE TABLE IF NOT EXISTS brute (
        id text PRIMARY KEY,
        count int,
        first_request timestamptz,
        last_request timestamptz,
        expires timestamptz
    );
`;

export default db;
