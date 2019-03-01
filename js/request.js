const BASE_URL = 'http://127.0.0.1:3000/';

const request = (type, urlString, payload = {}) => {
  const url = `${BASE_URL}${urlString}`;
  const headers = { 'Content-Type': 'application/json' };
  try {
    if (type === 'get') {
      return fetch(url, {
        method: 'GET',
        headers,
      }).then((res) => {
        return res.json();
      }).then((res) => {
        return { status: 'success', data: res };
      }, (error) => {
        throw error;
      });
    }
    if (type === 'post') {
      return fetch(url, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers,
      }).then((res) => {
        return res.json();
      }).then((res) => {
        return { status: 'success', data: res };
      }, (error) => {
        throw error;
      });
    }
    if (type === 'put') {
      return fetch(url, {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers,
      }).then((res) => {
        return res.json();
      }).then((res) => {
        return { status: 'success', data: res };
      }, (error) => {
        throw error;
      });
    }
    if (type === 'patch') {
      return fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(payload),
        headers,
      }).then((res) => {
        return res.json();
      }).then((res) => {
        return { status: 'success', data: res };
      }, (error) => {
        throw error;
      });
    }
    if (type === 'delete') {
      return fetch(url, {
        method: 'DELETE',
        body: JSON.stringify(payload),
        headers,
      }).then((res) => {
        return res.json();
      }).then((res) => {
        return { status: 'success', data: res };
      }, (error) => {
        throw error;
      });
    }
  } catch (error) {
    return { status: 'error', message: 'some unknown errors occured' };
  }
  return { status: 'error', message: 'specify a valid request method' };
}