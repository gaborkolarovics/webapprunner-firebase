/**
 * WebAppRunner - sendPushNotification cloud function
 * 
 * @author Gábor KOLÁROVICS
 * @since 2020.07.19
 */
const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Initialize Firebase admin
admin.initializeApp();

/**
 * Checks if a CharSequence is empty (""), null or whitespace only.
 * 
 * isBlank(null)      = true
 * isBlank("")        = true
 * isBlank(" ")       = true
 * isBlank("bob")     = false
 * isBlank("  bob  ") = false
 * 
 * @param {String} str 
 */
function isBlank(str) {
  if (str === null || str === undefined || str.length === 0) {
    return true;
  }
  if (str.length === 0) {
    return true;
  }
  for (let i = 0; i < str.length; i++) {
    if (str[i] !== '' && str[i] !== ' ' && str[i] !== '\n' && str[i] !== '\t') {
      return false;
    }
  }
  return true;
}

/**
 * Resolve FCM message from http request
 * 
 * @param {Request} request 
 */
function resolveNotificationFromRequest(request) {
  if (isBlank(request.body.token)) {
    throw new Error('Token is empty!');
  }
  if (isBlank(request.body.title)) {
    throw new Error('Title is empty!');
  }
  if (isBlank(request.body.message)) {
    throw new Error('Message is empty!');
  }

  let fcmMessage = {
    token: request.body.token,
    notification: {
      title: request.body.title,
      body: request.body.message
    }
  };
  if (!isBlank(request.body.link)) {
    fcmMessage.android = {
      data: {
        link: request.body.link
      }
    };
  }

  return fcmMessage;
}

/**
 * SendPusNotification cloud function
 */
exports.sendPushNotification = functions.https.onRequest((request, response) => {

  response.set('Access-Control-Allow-Origin', '*');
  if (request.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    response.set('Access-Control-Allow-Methods', 'POST');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.status(204).send('');
  } else {
    let message;
    try {
      message = resolveNotificationFromRequest(request);
    } catch (error) {
      // Send bad request, because somethig input field is empty
      response.status(400).json({ message: 'Error resolve message: ' + error });
      return;
    }
    admin.messaging().send(message)
      .then((result) => {
        // Send success response
        response.status(200).json({ message: 'Successfully sent message: ' + result });
        return result;
      })
      .catch((error) => {
        // Send server error response
        console.log('Error sending message:', error);
        response.status(500).json({ message: 'Error sending message: ' + error });
        return error;
      });
  }

});
