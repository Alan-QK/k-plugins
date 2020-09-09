
import styled from 'styled-components';
import { Form, Button } from "antd";

export const TopSearch = styled.div`
  position: relative;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  .pull-left {
    flex-flow: row wrap;
    align-items: center;
  }
  .mb-10 {
    margin-bottom: 10px;
  }
  .ant-btn,
  .ant-btn .iconfont {
    font-size: 13px;
  }
  .ant-btn-icon-only {
    font-size: 14px;
  }
  .ant-btn:not(.ant-btn-icon-only) {
    padding: 0px 10px;
  }
`

// export const AntdBtn = styled(Button)`
//   .ant-btn,
//   .ant-btn .iconfont {
//     font-size: 13px;
//   }
//   .ant-btn-icon-only {
//     font-size: 14px;
//   }
//   .ant-btn:not(.ant-btn-icon-only) {
//     padding: 0px 10px;
//   }
// `

export const SearchForm = styled(Form)`
  display: flex;
  margin-bottom: 10px;
  .ant-form-item {
    margin-bottom: 0;
  }

  &[class^='ant-'] {
    border-radius: 0 !important;
  }

  .ant-form-item.mult [class^='ant-'] {
    border-left: none;
  }
`