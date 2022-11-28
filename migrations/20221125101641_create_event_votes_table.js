/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('event_votes', (table) => {
        table.increments('id');
        table.string('name').notNullable().defaultTo('');
        table
            .integer('event_date_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('event_dates')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

        table.timestamps();

        table.unique(['event_date_id', 'name']);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('event_votes');
};
