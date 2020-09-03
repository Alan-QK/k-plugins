export declare const defaultOptions: {
    withCredentials: boolean;
    headers: {
        Accept: string;
    };
};
export declare const interceptResponse: ({ handleUnauthorized, handleSuccess, handleError }: {
    handleUnauthorized: any;
    handleSuccess: any;
    handleError: any;
}) => void;
export declare const get: (apiUrl: any, params?: {}, options?: {
    withCredentials: boolean;
    headers: {
        Accept: string;
    };
}, rmEnd?: boolean) => import("axios").AxiosPromise<any>;
export declare const post: (apiUrl: any, params: any, options?: {
    withCredentials: boolean;
    headers: {
        Accept: string;
    };
}, rmEnd?: boolean) => import("axios").AxiosPromise<any>;
export declare const put: (apiUrl: any, params: any, options?: {
    withCredentials: boolean;
    headers: {
        Accept: string;
    };
}, rmEnd?: boolean) => import("axios").AxiosPromise<any>;
export declare const patch: (apiUrl: any, params: any, options?: {
    withCredentials: boolean;
    headers: {
        Accept: string;
    };
}, rmEnd?: boolean) => import("axios").AxiosPromise<any>;
export declare const del: (apiUrl: any, params: any, options?: {
    withCredentials: boolean;
    headers: {
        Accept: string;
    };
}, rmEnd?: boolean) => import("axios").AxiosPromise<any>;
export declare const useRequest: (url: any, opts?: {}) => any;
