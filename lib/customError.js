function customError(status, code, message) {
  let error = Object.assign(new Error(message), { code: code, status: status });
  return error;
}

  const unAuthError = customError(
    401,
    "unauthorized",
    "invalid username or password"
  );
  const accessDeniedError = customError(
    403,
    "forbidden",
    "you are not authorized to do this "
  );
  
  module.exports = { customError, unAuthError, accessDeniedError };
  