const DEFAULT_LIMIT = 5;

function extractPaginationInfo(queryParams) {
  // Extract pagination info
  let { page, limit, ...rest } = queryParams;

  // Set default values if not provided or invalid
  page = parseInt(page) || 1;
  limit = parseInt(limit) || DEFAULT_LIMIT;

  return [{ page, limit }, rest];
}

module.exports = { extractPaginationInfo };
