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

const selectClips = () => knex.select().from('clips');

db.getClip = uid => selectClips().where('uid', uid)
    .then(clips => {
        if(clips.length === 0) throw Error('clip not found');
        return clips[0];
    });

db.getClips = limit => selectClips().limit(limit);

db.insertClip = clip => knex('clips').insert({ ...clip }).returning('*').then(rows=> rows[0]);

db.init = () => knex.schema // TODO: Create actual migrations
    .hasTable('clips').then(exists => {
        return exists || knex.schema.createTable('clips', table => {
            table.increments();
            table.string('uid', 8);
            table.unique('uid');
            table.string('title', 100);
            table.string('description', 2000);
            table.string('original_file_name');
            table.string('original_file_type', 8);
            table.integer('duration').unsigned();
            table.integer('file_size').unsigned();
            table.timestamps(true, true);
            table.dateTime('recorded_at');
            table.integer('uploader').unsigned();
            table.index(['uploader']);
            table.binary('icon');
        });
    })
    .then((initResult) => {
        return { initResult, db };
    })
    .catch(err => {
        console.log('database error!', err);
    });

export default db;
