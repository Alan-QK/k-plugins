/// <reference types="react" />
export declare const formItemLayout: {
    labelCol: {
        xs: {
            span: number;
        };
        sm: {
            span: number;
        };
    };
    wrapperCol: {
        xs: {
            span: number;
        };
        sm: {
            span: number;
        };
    };
};
interface FormItemProps {
    key: string;
    label: string;
    type?: string;
    keys?: any;
    multiple?: boolean;
    placeholder?: string;
    moreOptions?: any;
    options?: any;
    style?: any;
    notForm?: any;
    rules?: any;
    isRequired?: any;
}
interface Props {
    t: any;
    formItems: Array<FormItemProps | any>;
    submitFn: (param?: any) => void;
    cancelFn: (param?: any) => void;
    defaultVal?: any;
    subBtn?: {
        type: any;
        label: any;
    };
    cancelBtn?: {
        type: any;
        label?: any;
    };
}
interface ChildTempProps {
    t?: any;
    value?: any;
    onChange?: (value: any) => void;
    item?: FormItemProps;
    isSeniorForm?: any;
}
export declare const RenderComp: ({ t, item, value, onChange, isSeniorForm }: ChildTempProps) => JSX.Element;
export declare const RenderFormBody: (t: any, formItems: any, defaultVal?: any) => JSX.Element;
declare const DynamicForm: (props: Props & any) => JSX.Element;
export default DynamicForm;
