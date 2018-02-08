import Knex from 'knex';
import { dbHost, dbPort, dbUser, dbName, dbPass } from 'config';

const knex = new Knex({
    client: 'pg',
    connection: {
        host: dbHost,
        port: dbPort,
        user: dbUser,
        password: dbPass,
        database: dbName
    }
});

const db = { knex };

db.init = () => knex.schema // TODO: Create actual migrations
    .hasTable('clips').then(exists => {
        return exists || knex.schema.createTable('clips', table => {
            table.increments();
            table.string('uid', 5);
            table.unique('uid');
            table.string('title', 100);
            table.string('description', 2000);
            table.string('original_file_name');
            table.string('original_file_type', 8);
            table.integer('duration').unsigned();
            table.integer('file_size').unsigned();
            table.timestamps();
            table.dateTime('recorded_at');
            table.integer('uploader').unsigned();
            table.index(['uploader']);
            table.binary('icon');
        });
    });

export default db;
