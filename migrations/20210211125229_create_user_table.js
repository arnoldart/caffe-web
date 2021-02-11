
exports.up = function(knex) {
  return knex.schema.createTable('user', function(table) {
    table.increments()
    table.string('email')
    table.string('password')
    table.timestamp('created_at', { useTz: true });
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('user')
};
