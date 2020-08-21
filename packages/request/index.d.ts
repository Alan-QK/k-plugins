// Type definitions for ./packages/request/index.js
// Project: [LIBRARY_URL_HERE]
// Definitions by: [YOUR_NAME_HERE] <[YOUR_URL_HERE]>
// Definitions: https://github.com/borisyankov/DefinitelyTyped
// useRequest.!ret

/**
 *
 */
declare namespace defaultOptions {
  /**
   *
   */
  export var withCredentials: boolean;

  /**
   *
   */
  var headers: {
    /**
     *
     */
    Accept: string;
  };
}

/**
 *
 * @param undefined
 * @param undefined
 * @param handleError
 */
interface Props {
  handleUnauthorized?;
  handleSuccess?;
  handleError?;
}
declare function interceptResponse(props: Props): any;

/**
 *
 * @param api
 * @param params
 * @param options
 */
declare function get(api: any, params?: any, options?: any): any;

/**
 *
 * @param api
 * @param params
 * @param options
 */
declare function post(api: any, params?: any, options?: any): any;

/**
 *
 * @param api
 * @param params
 * @param options
 */
declare function put(api: any, params?: any, options?: any): any;

/**
 *
 * @param api
 * @param params
 * @param options
 */
declare function patch(api: any, params?: any, options?: any): any;

/**
 *
 * @param api
 * @param options
 */
declare function del(api: any, options?: any): any;

/**
 *
 * @param api
 * @param opts
 * @return
 */
declare function useRequest(api: any, opts?: any): Ret;

export { useRequest, get, post, put, patch, del, interceptResponse };
