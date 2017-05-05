import _ from 'lodash';
import logger from './logger';

function Responder() {}

/*
 * This method sends the response to the client.
 */
function sendResponse(res, status, body) {
  if (!res.headersSent) {
    if (body) {
      return res.status(status).json(body);
    }
    return res.status(status).send();
  }
  return logger.error('Response already sent.');
}

/*
 * These methods are called to respond to the API user with the information on
 * what is the result of the incomming request
 */
Responder.success = (res, message) => {
  const body = _.isString(message) ? { message } : message;
  return sendResponse(res, 200, body);
};

Responder.created = (res, object) => sendResponse(res, 201, object);

Responder.deleted = res => sendResponse(res, 204);

Responder.operationFailed = (res, message) => {
  const status = message.status;
  logger.error(message);
  const reason = message.message || message;
  return sendResponse(res, status || 400, { reason });
};

export default Responder;
