const baseURL = 'http://localhost:8080/';

/**
 * A class to support the fetch function for GET and POST
 */
export default class HttpService {
  /**
   * GET request as JOSON from the REST API point
   * @param {string} url conatins the url and all query parameters
   * @param {object} query conatins the query parameter for the rest call
   * @returns {Promise<Response>}
   */
  static getJSON(url, query) {
    let urlBuild;
    if (!query || (typeof query === 'object' && Object.keys(query).length === 0)) {
      urlBuild = baseURL + url;
    } else {
      let suburl = '/?';
      Object.keys(query).forEach((element) => {
        suburl = `${suburl}${element}=${query[element]}&`;
      });
      suburl = suburl.slice(0, -1);
      urlBuild = baseURL + url + suburl;
    }
    return fetch(urlBuild, {
      credentials: 'include',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  /**
   * POST request as JOSON to the REST API point
   * @param {string} url contains the url
   * @param {object} body contains all body parameters as object
   * @returns {Promise<Response>}
   */
  static postJSON(url, body) {
    return fetch(baseURL + url, {
      credentials: 'include',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
  }
  /**
   * PATCH request as JOSON to the REST API point
   * @param {string} url conatins the url
   * @param {object} body contains all body parameters as object
   * @returns {Promise<Response>}
   */
  static patchJSON(url, body) {
    url = baseURL + url;
    return fetch(url, {
      credentials: 'include',
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
  }
}
