
exports.up = function(knex) {
  return knex.schema.createTable('minuman', function(table) {
    table.increments()
    table.enu('type', ['Milkshake', 'Coffe', 'Juice', 'Tea'])
    table.string('name')
    table.integer('harga')
    table.text('desc')
    table.timestamp('created_at', { useTz: true });
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('minuman')
};
