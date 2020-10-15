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

      <style jsx>{`
        ul {
          list-style: none;
        }
        .title {
          display: flex;
          flex-flow: row wrap;
          justify-content: space-between;
          align-items: center;
        }
        .fz-12 {
          font-size: 12px;
        }
        .f-b {
          font-weight: bold;
        }
        .c-warn {
          color: #faad14;
        }
        .c-danger {
          color: #d26363;
        }
        .mr-5 {
          margin-right: 5px;
        }
      `}</style>
    </Popover>
  );
};
export default TipBtn;
