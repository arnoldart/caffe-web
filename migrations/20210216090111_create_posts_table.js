
exports.up = function(knex) {
  return knex.schema.createTable('posts', function(table) {
    table.increments()
    table.enu('product', ['makanan', 'minuman'])
    table.enu('makanan', ['Burger', 'Pasta', 'Dessert', 'Bakery'])
    table.enu('minuman', ['Milkshake', 'Coffe', 'Juice', 'Tea'])
    table.string('name')
    table.string('img')
    table.integer('harga')
    table.text('desc')
    table.timestamp('created_at', { useTz: true });
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('posts')
};
