!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("react"),require("lodash"),require("antd"),require("moment"),require("styled-components"),require("@ant-design/icons"),require("@gui/dynamic-form")):"function"==typeof define&&define.amd?define("ANTD_BASE_MODULE",["react","lodash","antd","moment","styled-components","@ant-design/icons","@gui/dynamic-form"],t):"object"==typeof exports?exports.ANTD_BASE_MODULE=t(require("react"),require("lodash"),require("antd"),require("moment"),require("styled-components"),require("@ant-design/icons"),require("@gui/dynamic-form")):e.ANTD_BASE_MODULE=t(e.React,e._,e.Antd,e.moment,e["styled-components"],e["@ant-design/icons"],e["@gui/dynamic-form"])}(this,function(n,r,a,l,i,o,u){return s={},c.m=f=[function(e,t){e.exports=n},function(e,t){e.exports=r},function(e,t){e.exports=a},function(e,t,n){"use strict";var r=this&&this.__makeTemplateObject||function(e,t){return Object.defineProperty?Object.defineProperty(e,"raw",{value:t}):e.raw=t,e},V=this&&this.__assign||function(){return(V=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)},a=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),l=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&a(t,e,n);return l(t,e),t},o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var I=i(n(0)),R=n(1),U=i(n(4)),u=o(n(5)),Y=n(2),L=n(6),X=o(n(7)),G=u.default.div(r(["\n  position: relative;\n  display: flex;\n  flex-flow: row wrap;\n  justify-content: space-between;\n  align-items: center;\n  .pull-left {\n    flex-flow: row wrap;\n    align-items: center;\n  }\n  .mb-10 {\n    margin-bottom: 10px;\n  }\n  .ant-btn,\n  .ant-btn .iconfont {\n    font-size: 13px;\n  }\n  .ant-btn-icon-only {\n    font-size: 14px;\n  }\n  .ant-btn:not(.ant-btn-icon-only) {\n    padding: 0px 10px;\n  }\n"],["\n  position: relative;\n  display: flex;\n  flex-flow: row wrap;\n  justify-content: space-between;\n  align-items: center;\n  .pull-left {\n    flex-flow: row wrap;\n    align-items: center;\n  }\n  .mb-10 {\n    margin-bottom: 10px;\n  }\n  .ant-btn,\n  .ant-btn .iconfont {\n    font-size: 13px;\n  }\n  .ant-btn-icon-only {\n    font-size: 14px;\n  }\n  .ant-btn:not(.ant-btn-icon-only) {\n    padding: 0px 10px;\n  }\n"])),H=u.default(Y.Form)(r(["\n  display: flex;\n  margin-bottom: 10px;\n  .ant-form-item {\n    margin-bottom: 0;\n  }\n\n  .ant-form-item.mult [class^='ant-'] {\n    border-left: none;\n  }\n"],["\n  display: flex;\n  margin-bottom: 10px;\n  .ant-form-item {\n    margin-bottom: 0;\n  }\n\n  .ant-form-item.mult [class^='ant-'] {\n    border-left: none;\n  }\n"])),c=u.default.div(r(["\n  width: 100%;\n  display: flex;\n  align-items: center;\n  background: #eee;\n  color: #999;\n  margin-bottom: 10px;\n  padding: 0.5em;\n  font-size: 12px;\n  .tag-item {\n    border: 1px solid #ddd;\n    padding: 2px 5px;\n    background: #fefefe;\n    margin-right: 1em;\n  }\n\n  .tag-item:hover {\n    color: #36cfc9;\n  }\n\n  .tag-item .item-icon {\n    cursor: pointer;\n    margin-left: 5px;\n  }\n  .tag-item .item-icon:hover {\n    color: red;\n  }\n\n  .val {\n    display: inline-block;\n    max-width: 300px;\n    overflow: hidden;\n    vertical-align: bottom;\n    text-overflow: ellipsis;\n  }\n"],["\n  width: 100%;\n  display: flex;\n  align-items: center;\n  background: #eee;\n  color: #999;\n  margin-bottom: 10px;\n  padding: 0.5em;\n  font-size: 12px;\n  .tag-item {\n    border: 1px solid #ddd;\n    padding: 2px 5px;\n    background: #fefefe;\n    margin-right: 1em;\n  }\n\n  .tag-item:hover {\n    color: #36cfc9;\n  }\n\n  .tag-item .item-icon {\n    cursor: pointer;\n    margin-left: 5px;\n  }\n  .tag-item .item-icon:hover {\n    color: red;\n  }\n\n  .val {\n    display: inline-block;\n    max-width: 300px;\n    overflow: hidden;\n    vertical-align: bottom;\n    text-overflow: ellipsis;\n  }\n"])),K=n(8);function Q(e){var t=e.t,f=e.params,s=e.handleParam;return I.default.createElement(c,null,I.default.createElement("span",{className:"label mr-5"},I.default.createElement(L.FilterOutlined,{className:"mr-5"}),t("common:filter_conditions"),t("common:colon")),Object.keys(f).map(function(e){var t,n,r,a,l,i,o,u,c;return null!==(t=f[e])&&void 0!==t&&t.label?I.default.createElement("span",{className:"tag-item",key:e},I.default.createElement("span",{onClick:function(){return s(e)}},null!==(r=null===(n=f[e])||void 0===n?void 0:n.label)&&void 0!==r?r:e,": ",I.default.createElement("span",{className:"val"},(a=f[e],i=a.val,o=a.moreOptions,u=a.options,c=a.type,null!=u&&u.length&&"select"===c?(null===(l=u.find(function(e){return e.value===i}))||void 0===l?void 0:l.label)||i:R.isString(i)||R.isNumber(i)?i:R.isArray(i)?R.every(i,U.isMoment)?i.map(function(e){return e.format((null==o?void 0:o.format)||"YYYY-MM-DD")}).join("/"):i.join("/"):"---"))),I.default.createElement(L.CloseOutlined,{className:"item-icon",onClick:function(){return s(e,!0)}})):null}),I.default.createElement(Y.Button,{size:"small",className:"fz-12",type:"dashed",onClick:function(){return s()}},t("common:reset")))}t.default=function(e){var t,n=e.t,r=e.items,l=void 0===r?[]:r,a=e.callbackFn,i=void 0===a?function(){}:a,o=e.extraActions,u=e.extra2Actions,c=e.refreshCallback,f=e.showSeniorSearch,s=e.handleVals,m=e.defaultVal,d=void 0===m?{}:m,p=e.showBatchSearch,b=I.createRef(),v=Object.keys(d).reduce(function(e,t){var n;return R.find(l,["key",t])&&d[t]?V(V({},e),((n={})[t]=d[t],n)):e},{}),y=Y.Form.useForm()[0],h=null===(t=l[0])||void 0===t?void 0:t.key,g=I.useState(h),x=g[0],E=g[1],k=I.useState(V({},v)),O=k[0],_=k[1],j=I.useState(!1),w=j[0],F=j[1],S=I.useState(V({},v)),C=S[0],N=S[1],M=I.useState(!1),P=M[0],B=M[1];I.useEffect(function(){var e,t;N(V({},O));var n,a=Object.assign(O);R.has(a,"date")&&R.every(a.date,U.isMoment)&&a.date&&(n=l.find(function(e){return"date"===e.key}),delete(a=V(V({},a),((e={})[null==n?void 0:n.keys[0]]=U.default(a.date[0]).format("X"),e[null==n?void 0:n.keys[1]]=U.default(a.date[1]).format("X"),e))).date),a=Object.keys(a).reduce(function(e,t){var n,r;return R.isString(a[t])?V(V({},e),((r={})[t]=a[t].trim(),r)):V(V({},e),((n={})[t]=a[t],n))},{});var r=Object.assign(a);s&&(r=s(a)),i(r,null===(t=b.current)||void 0===t?void 0:t.offsetHeight)},[O]);function z(e,t){var n,r,a;if(!e)return E(h),y.setFieldsValue(((n={})[h]=void 0,n)),void _({});E(e),t?(delete(a=Object.assign(O))[e],y.setFieldsValue(((r={})[e]=void 0,r)),_(V({},a))):E(e)}function q(e,t){e&&_(t),F(!1)}var D=I.useMemo(function(){var e=l.find(function(e){return e.key===x});return e?I.default.createElement(K.RenderComp,{t:n,item:V(V({},e),{style:V(V({},e.style||{}),{width:240})})}):null},[x,l,n]),T=I.useMemo(function(){return I.default.createElement(J,{t:n,visible:w,initialValues:C,items:l,seniorCallbackFn:q})},[l,C,w]),A=I.useMemo(function(){var e=function(l,i){void 0===l&&(l={});var e=Object.keys(l).reduce(function(e,t){var n,r;if(l[t]||0===l[t]){var a=null!==(r=i.find(function(e){return e.key===t}))&&void 0!==r?r:{};return V(V({},e),((n={})[t]=V({val:l[t]},a),n))}return e},{});return!!Object.keys(e).length&&e}(O,l);return e?I.default.createElement(Q,{t:n,params:e,handleParam:z}):null},[O,l,n]);return I.default.createElement(G,{ref:b},I.default.createElement("div",{className:"pull-left d-flex"},!!l.length&&I.default.createElement(H,{form:y,onFinish:function(e){if(R.isUndefined(e[x])||""===e[x])return!1;_(V(V({},O),e))}},1<l.length&&I.default.createElement(Y.Form.Item,null,I.default.createElement(Y.Select,{style:{width:110,fontSize:12},defaultValue:l[0].key,value:x,onChange:function(e){E(e)}},null==l?void 0:l.map(function(e){return I.default.createElement(Y.Select.Option,{key:e.key,value:e.key,className:"fz-12"},e.label)}))),I.default.createElement(Y.Form.Item,{name:x,className:1<l.length?"mult":""},D),I.default.createElement(Y.Form.Item,null,I.default.createElement(Y.Button,{type:"primary",htmlType:"submit",style:{padding:"0 0.8em",marginRight:10}},I.default.createElement(L.SearchOutlined,null)))),I.default.createElement("div",{className:"mb-10 d-flex"},p&&I.default.createElement(Y.Button,{key:"batchSearch",className:"mr-10 fz-12",onClick:function(){return B(!0)}},n("common:search.batch")),o)),I.default.createElement("div",{className:"pull-right mb-10"},c&&I.default.createElement(Y.Tooltip,{key:"refresh",title:n("common:refresh"),className:"mr-10"},I.default.createElement(Y.Button,{className:"mr-10",onClick:c,icon:I.default.createElement(L.RedoOutlined,null)})),u,f&&I.default.createElement(Y.Button,{type:"link",className:"fz-12",onClick:function(){F(!w)}},n("common:search.senior"),I.default.createElement(L.DoubleRightOutlined,null))),A,T,I.default.createElement(X.default,{t:n,visible:P,batchCallbackFn:function(e,t){e&&_(V(V({},O),t)),B(!1)},params:O,filterItems:l.filter(function(e){return e.multiple})}))};var J=function(e){var t=e.t,n=e.initialValues,r=e.items,a=e.seniorCallbackFn,l=e.visible,i=Y.Form.useForm()[0];return I.useEffect(function(){l&&i.setFieldsValue(n)},[l]),I.default.createElement(Y.Drawer,{title:t("common:search.senior"),visible:l,width:560,onClose:function(){a(!1,{})},footer:I.default.createElement("div",{className:"t-right"},I.default.createElement(Y.Button,{type:"primary",onClick:function(){var t=i.getFieldsValue();a(!0,R.omit(t,Object.keys(t).filter(function(e){return R.isUndefined(t[e])})))},className:"mr-10"},t("common:search.label")),I.default.createElement(Y.Button,{onClick:function(){i.resetFields()}},t("common:reset")))},I.default.createElement(Y.Form,{form:i,layout:"vertical"},I.default.createElement(Y.Row,{gutter:24},r.map(function(e){return I.default.createElement(Y.Col,{key:e.key,lg:12,md:12},I.default.createElement(Y.Form.Item,{name:e.key,label:I.default.createElement("span",null,e.label,e.multiple&&I.default.createElement(Y.Tooltip,{placement:"right",title:I.default.createElement("span",{className:"fz-12"},t("search.senior-tip"))},I.default.createElement(L.QuestionCircleOutlined,{className:"ml-10 fz-12 c-warn"})))},I.default.createElement(K.RenderComp,{t:t,isSeniorForm:!0,item:V(V({},e),{style:{width:"100%"}})})))}))))}},function(e,t){e.exports=l},function(e,t){e.exports=i},function(e,t){e.exports=o},function(e,t,n){"use strict";var u=this&&this.__assign||function(){return(u=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)},r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),a=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),l=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return a(t,e),t};Object.defineProperty(t,"__esModule",{value:!0});var c=l(n(0)),f=n(1),s=n(2);t.default=function(e){var t=e.t,n=e.visible,r=e.batchCallbackFn,a=e.params,l=void 0===a?{}:a,i=e.filterItems,o=s.Form.useForm()[0];return c.useEffect(function(){n&&o.setFieldsValue(i.reduce(function(e,t){var n,r=l[t.key];return f.isUndefined(r)||(r=r.trim().replace(/,/g,"\n")),u(u({},e),((n={})[t.key]=r,n))},{}))},[n]),c.default.createElement(s.Modal,{title:t("common:search.batch"),visible:n,onCancel:function(){return r(!1)},footer:[c.default.createElement(s.Button,{key:"reset",onClick:function(){o.resetFields(),r(!0,o.getFieldsValue())}},t("common:reset")),c.default.createElement(s.Button,{key:"cancel",onClick:function(){return r(!1)}},t("common:cancel")),c.default.createElement(s.Button,{key:"ok",type:"primary",onClick:function(){var a=o.getFieldsValue(),e=Object.keys(a).reduce(function(e,t){var n,r=a[t];return f.isUndefined(r)?e:(r=r.trim().replace(/(\r\n)|(\n)/g,",").replace(/,,/g,","),u(u({},e),((n={})[t]=r,n)))},{});r(!0,e)}},t("common:search.label"))]},c.default.createElement(s.Form,{form:o},c.default.createElement(s.Tabs,{defaultActiveKey:"order_ids",tabPosition:"left",tabBarGutter:0,size:"small"},i.map(function(e){return c.default.createElement(s.Tabs.TabPane,{key:e.key,tab:c.default.createElement("span",{style:{width:"100px"}},e.label)},c.default.createElement(s.Form.Item,{name:e.key,className:"full-width"},c.default.createElement(s.Input.TextArea,{placeholder:t("common:search.batch_tip"),rows:8})))}))))}},function(e,t){e.exports=u}],c.c=s,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(t,e){if(1&e&&(t=c(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)c.d(n,r,function(e){return t[e]}.bind(null,r));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="",c(c.s=3);function c(e){if(s[e])return s[e].exports;var t=s[e]={i:e,l:!1,exports:{}};return f[e].call(t.exports,t,t.exports,c),t.l=!0,t.exports}var f,s});