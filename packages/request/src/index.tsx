import { useState } from 'react';
import axios from 'axios';
import useAxios from '@k/useAxios';
import Qs from 'qs';

export const defaultOptions = {
  withCredentials: true,
  headers: {
    Accept: 'application/json'
  }
};

let isFormData = v => {
  return Object.prototype.toString.call(v) === '[object FormData]';
};

function _transformUrl(origin_url, data = {}, rmEnd) {
  let reg = /\:[\w_\-.]+/g;
  let copiedUrl = origin_url;
  let copiedData = JSON.parse(JSON.stringify(data));

  let matched = copiedUrl.match(reg);
  /**
   * 判断目标字符串是否以指定字符串结尾
   * @param {*} endStr
   */
  String.prototype.endWith = function (endStr) {
    let d = this.length - endStr.length;

    return d >= 0 && this.lastIndexOf(endStr) === d;
  };
  // 处理指定参数
  if (matched && matched.length) {
    matched.forEach(item => {
      let key = item.replace(/\:/, '');
      let value = '';
      if (copiedData[key] !== undefined) {
        value = copiedData[key];
        delete copiedData[key];
      }
      // if (copiedUrl.endWith(item))
      //     copiedUrl = copiedUrl.replace(item, value)
      // else
      // 原有判断冗余，且影响url query添加变量
      copiedUrl = copiedUrl.replace(item, value);
    });
  }
  // 去除重复冗余的/
  copiedUrl = copiedUrl.replace(/\/\//g, '/');
  // 去除末尾冗余的/，可选
  if (rmEnd && copiedUrl.match(/.+\/$/)) copiedUrl = copiedUrl.substr(0, copiedUrl.length - 1);

  return {
    url: copiedUrl,
    data: copiedData
  };
}

export const interceptResponse = ({ handleUnauthorized, handleSuccess, handleError }) => {
  // Global response handler
  axios.interceptors.response.use(handleSuccess, function onError(error) {
    if (error && error.response && error.response.status === 401) {
      handleUnauthorized();
      return Promise.resolve();
    }
    if (typeof handleError === 'function') {
      handleError(error);
      return Promise.resolve();
    }
    return Promise.reject(error);
  });
};

export const get = (apiUrl, params = {}, options = defaultOptions, rmEnd = false) => {
  let { url, data } = _transformUrl(apiUrl, params, rmEnd);
  return axios({
    url,
    method: 'get',
    params: data,
    paramsSerializer: function (params) {
      return Qs.stringify(params);
    },
    ...{ ...defaultOptions, ...options }
  });
};

export const post = (apiUrl, params, options = defaultOptions, rmEnd = false) => {
  let { url, data = {} } = _transformUrl(apiUrl, params, rmEnd);
  if (data.user_id) url += `?user_id=${data.user_id}`;
  delete data.user_id;

  return axios({
    url,
    method: 'post',
    data: isFormData(params) ? params : data,
    ...{ ...defaultOptions, ...options }
  });
};

export const put = (apiUrl, params, options = defaultOptions, rmEnd = false) => {
  let { url, data = {} } = _transformUrl(apiUrl, params, rmEnd);
  if (data.user_id) url += `?user_id=${data.user_id}`;
  delete data.user_id;

  return axios({
    ...{ ...defaultOptions, ...options },
    url,
    method: 'put',
    data
  });
};

export const patch = (apiUrl, params, options = defaultOptions, rmEnd = false) => {
  let { url, data = {} } = _transformUrl(apiUrl, params, rmEnd);
  if (data.user_id) url += `?user_id=${data.user_id}`;
  delete data.user_id;

  return axios({
    ...{ ...defaultOptions, ...options },
    url,
    method: 'patch',
    data: data
  });
};

export const del = (apiUrl, params, options = defaultOptions, rmEnd = false) => {
  let { url, data = {} } = _transformUrl(apiUrl, params, rmEnd);
  if (data.user_id) url += `?user_id=${data.user_id}`;
  delete data.user_id;

  return axios({
    ...{ ...defaultOptions, ...options },
    url,
    method: 'delete',
    params: data
  });
};

export const useRequest = (url, opts = {}) => {
  const {
    onData = () => { },
    axiosOptions = {},
    handleResponseData = data => data,
    ...useAxiosOptions
  } = opts;
  const [data, setData] = useState(null);
  const defaultOpts = {
    url: url,
    method: 'GET',
    options: { ...defaultOptions, ...axiosOptions },
    // To trigger by conditions, custom `trigger` and `forceDispatchEffect`
    // See https://github.com/use-hooks/react-hooks-axios
    trigger: 'only once by default',
    customHandler: (error, _data) => {
      // result has been extracted by response interceptor
      if (!error) {
        const result = _data ? handleResponseData(_data) : _data;
        setData(result);
        if (result) onData(result);
      }
    }
  };
  return {
    ...useAxios({
      ...defaultOpts,
      ...useAxiosOptions
    }),
    data
  };
};
