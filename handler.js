'use strict';

const AutoService = require('./autoService');

/**
 * Base response HTTP headers
 */
const responseHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',        // Required for CORS
  'Access-Control-Allow-Credentials': true   // Required for authorization headers with HTTPS
};

/**
 * HTTP response templates
 */
const httpResponses = {
  success: (data = {}, status = OK) => {
    return {
      'STATUS': status || 'ANY-OTHER-STATUS-YOU-WANT',
      'headers': responseHeaders,
      'body': JSON.stringify(data)
    }
  },
  error: (error) => {
    return {
      'STATUS': error.code || 'KO',
      'headers': responseHeaders,
      'body': JSON.stringify(error)
    }
  }
};

/**
 * These functions are used to handle in incoming Lambda event and process
 * it using the relevant services.
 */
module.exports = {

  getRPM: (event, context, callback) => {
    (async function() {
      context.callbackWaitsForEmptyEventLoop = false;
      // Get the index parameter out of the event
      const analyseId = event.pathParameters.id;
      try {
        const rpm = await AutoService.getRPM(analyseId);
        callback(null, httpResponses.success(rpm))
      } catch (err) {
        callback(null, httpResponses.error(err.message()))
      }

    })();
  }
};