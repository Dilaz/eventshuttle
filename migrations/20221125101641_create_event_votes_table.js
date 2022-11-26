/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('event_votes', (table) => {
        table.increments('id');
        table.string('name').notNullable().defaultTo('');
        table
            .integer('eventId')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('events')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

        table.timestamps();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('event_votes');
};
