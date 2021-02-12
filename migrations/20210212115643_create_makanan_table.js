
exports.up = function(knex) {
  return knex.schema.createTable('makanan', function(table) {
    table.increments()
    table.enu('type', ['Burger', 'Pasta', 'Dessert', 'Bakery'])
    table.string('name')
    table.integer('harga')
    table.text('desc')
    table.timestamp('created_at', { useTz: true });
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('makanan')
};
