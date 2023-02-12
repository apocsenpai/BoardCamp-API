export function buildListGamesQuery(req, res, next) {
  const queryParams = res.sanitizedParams;
  const mainQuery = `SELECT * FROM games`;

  if (!Object.keys(queryParams).length) {
    res.locals.query = mainQuery;
    return next();
  }

  const whereParams = [];
  let order = "";
  let paginationParams = [];

  Object.keys(queryParams).forEach((key) => {
    if (key === "order")
      order = queryParams["desc"]
        ? `ORDER BY ${queryParams[key]} DESC`
        : `ORDER BY ${queryParams[key]}`;

    if (key === "name") whereParams.push(`${key} ILIKE '${queryParams[key]}%'`);

    if (key === "limit") paginationParams.push(`LIMIT ${queryParams[key]}`);

    if (key === "offset") paginationParams.push(`OFFSET ${queryParams[key]}`);
  });

  const whereQuery = whereParams.length
    ? `WHERE ${whereParams.join(" AND ")}`
    : "";

  const paginationQuery = paginationParams.join(" ");

  res.locals.query = `${mainQuery} ${whereQuery} ${order} ${paginationQuery}`;

  next();
}
