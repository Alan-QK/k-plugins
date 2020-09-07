/// <reference types="react" />
interface AysncTableProps {
    t: any;
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
declare const AsyncTable: ({ t, apiMethod, apiUrl, params, listName, uniqueKey, toggleRefresh, initTableHeaderParams, options, refreshTableCurrentPageDataProps, defaultPagination, selectionChange, confs, myRef, callbackFn, }: AysncTableProps) => JSX.Element;
export default AsyncTable;
