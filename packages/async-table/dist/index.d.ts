/// <reference types="react" />
import "antd/lib/table/style/index.css";
interface AysncTableProps {
    t: any;
    notRequest?: boolean;
    apiMethod?: any;
    apiUrl: any;
    myRef?: any;
    params?: any;
    listName?: any;
    uniqueKey?: any;
    toggleRefresh?: any;
    options?: any;
    refreshTableCurrentPageDataProps?: any;
    defaultPagination?: any;
    selectionChange?: any;
    confs?: {
        columns?: Array<any>;
        size?: 'middle' | 'small' | 'large';
        [paramname: string]: any;
    };
    callbackFn?: any;
    initTableHeaderParams?: any;
}
declare const _default: ({ t, notRequest, apiMethod, apiUrl, params, listName, uniqueKey, toggleRefresh, initTableHeaderParams, options, refreshTableCurrentPageDataProps, defaultPagination, selectionChange, confs, myRef, callbackFn, }: AysncTableProps) => JSX.Element;
export default _default;
