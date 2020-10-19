import React from "react";
import { Popover } from 'antd';
import './style.css';

interface Props {
  title?: string;
  titleExtra?: any;
  items: Array<any>;
  children?;
  position?;
  t;
}

const TipBtn = ({ t, title, titleExtra, items, children, position = 'bottom' }: Props) => {
  return (
    <Popover
      className="tip-btn-wrapper"
      placement={position}
      title={
        <div className="fz-12 d-flex j-between align-center">
          <span>
            <i className="iconfont icon-tips c-warn mr-5"></i>
            {title || t('common:action-tip')}
          </span>
          <span>{titleExtra}</span>
        </div>
      }
      content={
        <ul className="fz-12">
          {items.map((rule, idx) => (
            <li
              key={idx}
              style={{ marginBottom: '0.5em' }}
              className={rule.isDanger ? 'c-danger' : ''}
            >
              <span className="f-b">{idx + 1}.</span>
              {rule?.cot}
            </li>
          ))}
        </ul>
      }
    >
      {children}
    </Popover>
  );
};
export default TipBtn;
