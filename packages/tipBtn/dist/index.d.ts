/// <reference types="react" />
import './style.css';
interface Props {
    title?: string;
    titleExtra?: any;
    items: Array<any>;
    children?: any;
    position?: any;
    t: any;
}
declare const TipBtn: ({ t, title, titleExtra, items, children, position }: Props) => JSX.Element;
export default TipBtn;
