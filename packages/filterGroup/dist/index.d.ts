/// <reference types="react" />
export interface FilterItemProp {
    key: string;
    label: string;
    type?: string;
    keys?: any;
    multiple?: boolean;
    placeholder?: string;
    moreOptions?: any;
    options?: any;
    style?: any;
}
interface FilterGroupProps {
    t?: any;
    items: Array<FilterItemProp>;
    callbackFn?: any;
    extraActions?: any;
    extra2Actions?: any;
    ref?: any;
    refreshCallback?: any;
    defaultVal?: any;
    showSeniorSearch?: any;
    mref?: any;
    showBatchSearch?: any;
    handleVals?: any;
}
declare const FilterGroup: ({ t, items, callbackFn, extraActions, extra2Actions, refreshCallback, showSeniorSearch, handleVals, defaultVal, showBatchSearch, }: FilterGroupProps & any) => JSX.Element;
export default FilterGroup;
