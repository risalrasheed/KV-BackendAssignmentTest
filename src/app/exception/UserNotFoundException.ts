import HttpException from "./HttpException";
import { ErrorCodes } from "../util/errorCode";

/**
 * This exception can use used in case a user is not authorized to perform an action.
 */
class UserNotAuthorizedException extends HttpException {
  constructor() {
    const errorDetail = ErrorCodes.USER_WITH_ID_NOT_FOUND;
    super(404, errorDetail.MESSAGE, errorDetail.CODE);
  }
}

export default UserNotAuthorizedException;