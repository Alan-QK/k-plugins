import axios from 'axios';
import { defaultOptions, get, post, put, del } from './index';

jest.mock('axios');
axios.mockReturnValue('whatever');

test('expose default axios options', () => {
  expect(defaultOptions).toEqual({
    withCredentials: false,
    headers: {
      Accept: 'application/json'
    }
  });
});

function genCases(fn, method, paramsKeyName) {
  const url = '/api';
  test('with default options', async () => {
    await fn(url);

    expect(axios).toHaveBeenCalledWith({
      ...defaultOptions,
      method,
      url
    });
  });

  test('with params', async () => {
    const params = { a: 1 };
    await fn(url, params);

    expect(axios).toHaveBeenCalledWith({
      ...defaultOptions,
      method,
      url,
      [paramsKeyName]: params
    });
  });

  test('with custom options', async () => {
    const customOptions = { custom: true };
    await fn(url, {}, customOptions);

    expect(axios).toHaveBeenCalledWith({
      ...customOptions,
      method,
      url,
      [paramsKeyName]: {}
    });
  });
}

describe('get', () => {
  genCases(get, 'GET', 'params');
});

describe('post', () => {
  genCases(post, 'POST', 'data');
});

describe('put', () => {
  genCases(put, 'PUT', 'data');
});

describe('del', () => {
  const url = '/api';

  test('with default options', async () => {
    await del(url);

    expect(axios).toHaveBeenCalledWith({
      ...defaultOptions,
      method: 'DELETE',
      url
    });
  });

  test('with custom options', async () => {
    const customOptions = { custom: true };
    await del(url, customOptions);

    expect(axios).toHaveBeenCalledWith({
      ...customOptions,
      method: 'DELETE',
      url
    });
  });
});
