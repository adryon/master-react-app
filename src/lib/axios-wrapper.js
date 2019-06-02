import axios from 'axios';
import config from './config';

function requestHeaders() {
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  return defaultHeaders
}

function post(url, data, options) {
  const headers = requestHeaders();
  const apiUrl = options && options.isRoot ? config.SERVER_ROOT : config.API_URL;
  return axios({method: 'post', url: `${apiUrl}/${url}`, data, headers})
    .then(res => res.data);
}

function get(url, params, options) {
  const headers = requestHeaders();
  const apiUrl = options && options.isRoot ? config.SERVER_ROOT : config.API_URL;
  return axios({method: 'get', url: `${apiUrl}/${url}`, params, headers})
    .then(res => res.data);
}

function put(url, data) {
  const headers = requestHeaders();
  return axios({method: 'put', url: `${config.API_URL}/${url}`, data, headers})
    .then(res => res.data);
}

function patch(url, data) {
  const headers = requestHeaders();
  return axios({method: 'patch', url: `${config.API_URL}/${url}`, data, headers})
    .then(res => res.data);
}

function deleteRequest(url, params) {
  const headers = requestHeaders();
  return axios({method: 'delete', url: `${config.API_URL}/${url}`, params, headers})
    .then(res => res.data);
}

export default {
  post: post,
  get: get,
  put: put,
  patch: patch,
  delete: deleteRequest
};