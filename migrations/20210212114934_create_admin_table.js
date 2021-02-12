
exports.up = function(knex) {
  return knex.schema.createTable('admin', function(table) {
    table.increments()
    table.string('user')
    table.string('password')
    table.timestamp('created_at', { useTz: true });
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('admin')
};
