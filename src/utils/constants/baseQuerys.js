const baseQuerys = {
  listRentals: `SELECT rentals.*, customers.name AS customer_name, games.name AS game_name FROM rentals
    INNER JOIN games ON rentals."gameId" = games.id
    INNER JOIN customers ON rentals."customerId" = customers.id`,
  listGames: `SELECT * FROM games`,
  listCustomers: `SELECT * FROM customers`,
};

export default baseQuerys;