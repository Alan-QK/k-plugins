import React from "react";
import { Popover } from 'antd';

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
      placement={position}
      title={
        <div style={{ fontSize: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>
            <i className="iconfont icon-tips" style={{ color: '#faad14', marginRight: 5 }}></i>
            {title || t('common:action-tip')}
          </span>
          <span>{titleExtra}</span>
        </div>
      }
      content={
        <ul style={{ listStyle: 'none', fontSize: 12 }}>
          {items.map((rule, idx) => (
            <li
              key={idx}
              style={{ marginBottom: '0.5em', color: rule.isDanger ? '#d26363' : '' }}
            >
              <span style={{ fontWeight: 'bold' }}>{idx + 1}.</span>
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
