export function buildListGamesQuery(req, res, next) {
  const queryParams = res.sanitizedParams;
  const mainQuery = `SELECT * FROM games`;

  if (!Object.keys(queryParams).length) {
    res.locals.query = mainQuery;
    return next();
  }

  const whereParams = [];
  let order = "";

  Object.keys(queryParams).forEach((key) => {
    if (key === "order")
      order = queryParams["desc"]
        ? `ORDER BY ${queryParams[key]} DESC`
        : `ORDER BY ${queryParams[key]}`;

    if (key === "name") whereParams.push(`${key} ILIKE '${queryParams[key]}%'`);
  });

  const whereQuery = whereParams.length
    ? `WHERE ${whereParams.join(" AND ")}`
    : "";

  res.locals.query = `${mainQuery} ${whereQuery} ${order}`;

  next();
}
