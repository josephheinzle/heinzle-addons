// data parameter defaults to false if nothing is provided
import * as Types from "../../Types";

/**
 *
 * @param url The url to request.
 * @param method The method (handled by Fetcher functions).
 * @param data The data to send (POST & PUT requests).
 * @returns Returns JSON-parsed data in the response.
 */
const Fetcher = async (url: string, method: string, data?: any) => {
  // token is any JWT token in localStorage
  const token = localStorage.getItem(`token`);

  // fetchOptions provides the headers, authorization, and body parameters
  const fetchOptions: Types.IFetchOptions = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    // body will be stringified
    body: JSON.stringify(data),
  };

  // if there is no data passed in, delete the body from fetchOptions
  if (!data) {
    delete fetchOptions.body;
  }

  // if there is no token in localStorage, delete the token from fetchOptions
  if (!token) {
    delete fetchOptions.headers.Authorization;
  }

  // fetch with the given url, method, and fetchOptions
  try {
    const res = await fetch(url, { method, ...fetchOptions });
    // parse the response
    const data = await res.json();

    // if there is a good response, return the data
    if (res.ok) {
      return data;
      // if there is a bad response, return the data, and log
    } else {
      console.log(`res was bad here`);
      throw new Error(`Something went wrong`);
    }
  } catch (error) {
    // if an error occurs, log the error
    console.log(`Bad Fetcher Call - Error...\n`);
    console.error(error);

    // This throw will not be caught in this catch block, thus, ALL Fetcher calls need to end with a .catch
    throw new Error(`Something went wrong`);
  }
};

// Abstract Fetcher for get, post, put, delete methods

/**
 * Callback function to Fetcher, passing in the url, and supplying the method itself.
 * @param url The url to request.
 * @returns Returns a promise that resolves with JSON-parsed data in the response.
 */
export const GET = (url: string) => Fetcher(url, "GET");
/**
 * Callback function to Fetcher, passing in the url and data, and supplying the method itself.
 * @param url The url to request.
 * @param data The data to be sent.
 * @returns Returns a promise that resolves with JSON-parsed data in the response.
 */
export const POST = (url: string, data: any) => Fetcher(url, "POST", data);
/**
 * Callback function to Fetcher, passing in the url and data, and supplying the method itself.
 * @param url The url to request.
 * @param data The data to be sent.
 * @returns Returns a promise that resolves with JSON-parsed data in the response.
 */
export const PUT = (url: string, data: any) => Fetcher(url, "PUT", data);
/**
 * Callback function to Fetcher, passing in the url, and supplying the method itself.
 * @param url The url to request.
 * @returns Returns a promise that resolves with JSON-parsed data in the response.
 */
export const DELETE = (url: string) => Fetcher(url, "DELETE");

export default {
  GET,
  POST,
  PUT,
  DELETE,
};

/**
 * Must use a .catch after every Fetcher call as an error could potentially be thrown
 * Response is parsed via .json()
 * Body will be stringified
 */

/**
     * Sample Fetcher Requests:
     * 
     * Fetcher.GET("/your/route/here")
          .then((yourData) => {
            doSomethingWith(yourData);
          })
          .catch((error) => {
            console.log('your error message here');
            console.error(error);
          });
     * 
     * 
     * 
     * 
     * const yourData = { goes: 'here'};
     * Fetcher.POST("/your/route/here", yourData)
          .then(() => {
            // your next steps here
          })
          .catch((error) => {
            console.log('your error message here');
            console.error(error);
          });
     */