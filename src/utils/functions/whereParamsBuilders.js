export function handleRentalsWhereParams({
  status = "",
  gameId = "",
  customerId = "",
  startDate = "",
}) {
  const params = [];

  if (status)
    params.push(`"returnDate" IS ${status === "open" ? "" : "NOT"} NULL`);

  if (gameId) params.push(`rentals."gameId" = ${gameId}`);

  if (customerId) params.push(`rentals."customerId" = ${customerId}`);

  if (startDate) params.push(`"rentDate" >= '${startDate}'`);

  return params;
}

export function handleCustomersWhereParams({ cpf = "" }) {
  const params = [];

  if (cpf) params.push(`cpf ILIKE '${cpf}%'`);
  
  return params;
}

export function handleGamesWhereParams({ name = "" }) {
  const params = [];

  if (name) params.push(`name ILIKE '${name}%'`);

  return params;
}
