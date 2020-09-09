import React from 'react';
import {
  Form,
  Row,
  Col,
  Button,
  Input,
  InputNumber,
  Select,
  Radio,
  Checkbox,
  DatePicker,
} from 'antd';

const { RangePicker } = DatePicker;
import AREANO_LIST from './areanoList';
import MuiltInput from '@gui/muilt-input';

export const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

interface FormItemProps {
  key: string;
  label: string;
  type?: string;
  keys?;
  multiple?: boolean;
  placeholder?: string;
  moreOptions?;
  options?;
  style?;
  notForm?;
  rules?;
  isRequired?;
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

interface OptionProps {
  label: string;
  value: string;
}

// 渲染表单元素
interface ChildTempProps {
  t?;
  value?;
  onChange?: (value) => void;
  item?: FormItemProps;
  isSeniorForm?;
}

const prefixSelector = (key) => (
  <Form.Item noStyle name={key} initialValue="+1">
    <Select
      dropdownClassName="phone-pre"
      optionLabelProp="label"
      // style={{width: '20%'}}
      maxTagTextLength={200}
    >
      {AREANO_LIST?.map((item) => (
        <Select.Option key={item.country_id} value={item.country_code}>
          <span style={{ color: '#666', fontSize: '12px' }}>{item.country_name_cn}</span>
          <span style={{ float: 'right', color: '#333', fontSize: '12px' }}>
            ({item.country_code})
          </span>
        </Select.Option>
      ))}
    </Select>
  </Form.Item>
);

export const RenderComp = ({ t, item, value, onChange, isSeniorForm }: ChildTempProps) => {
  const { type, label, options, placeholder, style = {}, moreOptions = {}, multiple } = item || {};
  switch (type) {
    case 'select':
      return (
        <Select
          allowClear
          style={{ ...style }}
          value={value}
          onChange={onChange}
          showSearch
          filterOption={(input, option) =>
            option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          placeholder={placeholder ?? t('common:placeholder.select', { name: label })}
          {...moreOptions}
        >
          {options?.map((o) => (
            <Select.Option key={o.value} value={o.value}>
              {o.label}
            </Select.Option>
          ))}
        </Select>
      );
    case 'date':
      return (
        <RangePicker
          allowClear
          style={{ ...style }}
          format="YYYY-MM-DD"
          value={value}
          onChange={onChange}
          placeholder={
            placeholder ?? [
              t('common:placeholder.start', { name: label }),
              t('common:placeholder.end', { name: label }),
            ]
          }
          {...moreOptions}
        />
      );
    case 'date-time':
      return (
        <DatePicker
          allowClear
          style={{ ...style }}
          format="YYYY-MM-DD HH:mm:ss"
          value={value}
          onChange={onChange}
          showTime
          placeholder={placeholder ?? t('common:placeholder.select', { name: label })}
          {...moreOptions}
        />
      );
    case 'password':
      return (
        <Input.Password
          value={value}
          onChange={onChange}
          placeholder={t('common:placeholder.input', { name: label })}
          autoComplete="new-password"
          {...moreOptions}
        />
      );
    case 'number':
      return (
        <InputNumber
          value={value}
          onChange={onChange}
          placeholder={label}
          {...moreOptions}
        />
      );
    case 'select':
      return (
        <Select
          value={value}
          onChange={onChange}
          placeholder={t('common:placeholder.select', { name: label })}
          {...moreOptions}
        >
          {options?.map((item: OptionProps) => (
            <Select.Option key={item.value} value={item.value}>
              {item.label}
            </Select.Option>
          ))}
        </Select>
      );
    case 'textarea':
      return (
        <Input.TextArea
          value={value}
          onChange={onChange}
          autoSize={{ minRows: 3, maxRows: 8 }}
          placeholder={t('common:placeholder.input', { name: label })}
          {...moreOptions}
        />
      );
    case 'radio':
      return (
        <Radio.Group value={value} onChange={onChange} {...moreOptions}>
          {options?.map((item: OptionProps) => (
            <Radio key={item.value} value={item.value}>
              {item.label}
            </Radio>
          ))}
        </Radio.Group>
      );
    case 'checkbox':
      return (
        <Checkbox.Group value={value} onChange={onChange} {...moreOptions}>
          {options?.map((item: OptionProps) => (
            <Checkbox key={item.value} value={item.value}>
              {item.label}
            </Checkbox>
          ))}
        </Checkbox.Group>
      );
    case 'phone':
      const { showPrefixSelector, prefixKey = '_phone_prefix', ...otherOptions } = moreOptions;
      return (
        <>
          <Input
            addonBefore={showPrefixSelector ? prefixSelector(prefixKey) : null}
            value={value}
            onChange={onChange}
            autoComplete="off"
            placeholder={t('common:placeholder.input', { name: label })}
            {...otherOptions}
          />
        </>
      );
    case 'muilt-input':
      return (
        <MuiltInput
          value={value}
          onChange={onChange}
          placeholder={placeholder ?? t('common:placeholder.input', { name: label })}
          {...moreOptions}
        />
      );
    default:
      if (isSeniorForm && multiple) {
        return (
          <Input.TextArea
            allowClear
            style={{ ...style }}
            value={value}
            onChange={onChange}
            placeholder={placeholder ?? t('common:placeholder.input', { name: label })}
            {...moreOptions}
          />
        );
      }
      return (
        <Input
          allowClear
          style={{ ...style }}
          value={value}
          onChange={onChange}
          placeholder={placeholder ?? t('common:placeholder.input', { name: label })}
          {...moreOptions}
        />
      );
  }
};
export const RenderFormBody = (t, formItems, defaultVal?) => (
  <>
    {formItems.map((item: FormItemProps) =>
      item.notForm ? (
        <Row style={{ lineHeight: 38 }} key={item.key}>
          <Col span={7} style={{
            textAlign: 'right',
            paddingRight: '10px',
            color: '#333'
          }}>
            {item.label}
          </Col>
          <Col span={16}>{defaultVal && defaultVal[item.key]}</Col>
        </Row>
      ) : (
          <Form.Item
            key={item.key}
            style={{ marginBottom: 10 }}
            label={item.label}
            colon={false}
            name={item.key}
            rules={
              item.isRequired
                ? [
                  {
                    required: true,
                    message: t(
                      item.type && ['select', 'radio'].includes(item.type)
                        ? 'common:placeholder.select'
                        : 'common:placeholder.input',
                      { name: item.label }
                    ),
                  },
                  ...(item.rules ?? []),
                ]
                : item.rules
            }
          >
            <RenderComp t={t} item={item} />
          </Form.Item>
        )
    )}
  </>
);

// eslint-disable-next-line
const DynamicForm = (props: Props & any) => {
  const {
    t,
    formItems,
    submitFn,
    cancelFn,
    defaultVal,
    subBtn = {
      type: 'primary',
      label: '确认',
    },
    cancelBtn = {
      type: 'default',
      label: '取消',
    },
  } = props;
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    submitFn(values);
  };

  // 默认数据修改后同步修改表单对应的项

  return (
    <Form
      form={form}
      style={{
        width: 400,
        margin: 'auto'
      }}
      {...formItemLayout}
      onFinish={handleSubmit}
      initialValues={defaultVal}
    >
      {RenderFormBody(t, formItems, defaultVal)}
      <Form.Item wrapperCol={{ offset: 7 }} style={{ marginTop: '2em' }}>
        <Button type={subBtn.type} style={{ marginRight: '24px' }} htmlType="submit">
          {subBtn.label}
        </Button>
        {!!cancelBtn && <a onClick={cancelFn}>{cancelBtn.label}</a>}
      </Form.Item>
    </Form>
  );
};

export default DynamicForm;
