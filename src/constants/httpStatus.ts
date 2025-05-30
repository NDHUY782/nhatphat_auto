const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  FORBIDDEN: 403,
  UNPROCESSABLE_ENTITY: 422,
  UNAUTHORIZED: 401,
  INTERNAL_SERVER_ERROR: 500,
  PARTIAL_CONTENT: 206
} as const

export default HTTP_STATUS
