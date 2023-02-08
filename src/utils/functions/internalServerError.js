const internalServerError = (res, error) => {
  return res.status(500).send(`Servidor com problemas! ${error}`);
};

export default internalServerError;
