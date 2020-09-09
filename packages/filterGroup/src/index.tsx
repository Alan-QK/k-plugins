import React, { useState, useEffect, useMemo, createRef, CSSProperties } from 'react';
import { isString, isUndefined, isNumber, every, isArray, has, find, omit } from 'lodash';
import moment, { isMoment } from 'moment';

import { Form, Button, Select, Tooltip, Row, Col, Drawer } from 'antd';
import {
  RedoOutlined,
  FilterOutlined,
  SearchOutlined,
  CloseOutlined,
  DoubleRightOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';
import BatchSearchModal from './BatchSearchModal';
import { TopSearch, SearchForm, FiltersReview } from "./styles";

export interface FilterItemProp {
  key: string;
  label: string;
  type?: string;
  keys?;
  multiple?: boolean;
  placeholder?: string;
  moreOptions?;
  options?;
  style?;
}

interface FilterGroupProps {
  t?;
  items: Array<FilterItemProp>;
  callbackFn?;
  extraActions?;
  extra2Actions?;
  ref?;
  refreshCallback?;
  defaultVal?;
  showSeniorSearch?;
  mref?;
  showBatchSearch?;
  handleVals?;
}

import { RenderComp } from '@gui/dynamic-form';

function renderVal(param) {
  const { val, moreOptions, options, type } = param;
  if (options?.length && type === 'select') {
    let display = options.find((i) => i.value === val)?.label || val;
    return display;
  }
  if (isString(val) || isNumber(val)) return val;

  if (isArray(val)) {
    if (every(val, isMoment)) {
      return val.map((v) => v.format(moreOptions?.format || 'YYYY-MM-DD')).join('/');
    } else {
      return val.join('/');
    }
  }

  return '---';
}

function isEmptyValsObj(obj = {}, items) {
  const newObj = Object.keys(obj).reduce((o, k) => {
    if (!!obj[k] || obj[k] === 0) {
      const item = items.find((i) => i.key === k) ?? {};
      return {
        ...o,
        [k]: {
          val: obj[k],
          ...item,
        },
      };
    } else return o;
  }, {});

  if (!Object.keys(newObj).length) return false;
  return newObj;
}

// 渲染已有的过滤条件
const FilteredItems = ({ t, params, handleParam }) => {
  return (
    <FiltersReview>
      <span className="label mr-5">
        <FilterOutlined className="mr-5" />
        {t('common:filter_conditions')}
        {t('common:colon')}
      </span>

      {Object.keys(params).map((key) => {
        if (!params[key]?.label) return null;
        return (
          <span className="tag-item" key={key}>
            <span onClick={() => handleParam(key)}>
              {params[key]?.label ?? key}: <span className="val">{renderVal(params[key])}</span>
            </span>
            <CloseOutlined className="item-icon" onClick={() => handleParam(key, true)} />
          </span>
        );
      })}

      <Button size="small" className="fz-12" type="dashed" onClick={() => handleParam()}>
        {t('common:reset')}
      </Button>
    </FiltersReview>
  );
};

const FilterGroup = ({
  t,
  items = [],
  callbackFn = () => { },
  extraActions,
  extra2Actions,
  refreshCallback,
  showSeniorSearch,
  handleVals,
  defaultVal = {},
  showBatchSearch,
}: FilterGroupProps & any) => {
  const thisRef = createRef<HTMLDivElement>();
  // 初始化过滤条件
  const initVal = Object.keys(defaultVal).reduce((obj, key) => {
    if (find(items, ['key', key]) && defaultVal[key]) {
      return { ...obj, [key]: defaultVal[key] };
    } else {
      return obj;
    }
  }, {});

  const [form] = Form.useForm();
  const initParam = items[0]?.key;
  const [currentFilter, setCurrentFilter] = useState<string>(initParam);
  const [params, setParams] = useState({ ...initVal });
  const [seniorSearchFormState, setSeniorSearchFormState] = useState(false);
  const [seniorInitVal, setSeniorInitVal] = useState({ ...initVal });
  const [batchSearchModalVisible, setBacthSearchModalVisible] = useState(false);

  useEffect(() => {
    setSeniorInitVal({ ...params });
    let finalParams = Object.assign(params);

    //判别搜索参数中有没有日期数组
    if (has(finalParams, 'date') && every(finalParams['date'], isMoment) && finalParams['date']) {
      const filterItem = items.find((item) => item.key === 'date');
      finalParams = {
        ...finalParams,
        [filterItem?.keys[0]]: moment(finalParams['date'][0]).format('X'),
        [filterItem?.keys[1]]: moment(finalParams['date'][1]).format('X'),
      };

      delete finalParams.date;
    }

    finalParams = Object.keys(finalParams).reduce((newObj, key) => {
      if (!isString(finalParams[key])) return { ...newObj, [key]: finalParams[key] };
      return { ...newObj, [key]: finalParams[key].trim() };
    }, {});

    let nextParams = Object.assign(finalParams);
    if (handleVals) {
      nextParams = handleVals(finalParams);
    }

    callbackFn(nextParams, thisRef.current?.offsetHeight);
  }, [params]);

  // 表单提交
  const submitFn = (values: { [param: string]: any }) => {
    if (isUndefined(values[currentFilter]) || values[currentFilter] === '') return false;
    setParams({
      ...params,
      ...values,
    });
  };

  // 处理搜索记录的点击事件
  // 普通点击 & 删除过滤条件
  const handleParam = (key, isDel) => {
    if (!key) {
      setCurrentFilter(initParam);
      form.setFieldsValue({
        [initParam]: undefined,
      });
      setParams({});
      return;
    }

    setCurrentFilter(key);

    if (isDel) {
      const nextParams = Object.assign(params);
      delete nextParams[key];
      // 删除的为当前搜索条件时重置表单
      form.setFieldsValue({
        [key]: undefined,
      });

      setParams({ ...nextParams });
    } else {
      setCurrentFilter(key);
    }
  };

  const seniorSearch = (isChangedParams, vals) => {
    isChangedParams && setParams(vals);
    setSeniorSearchFormState(false);
  };

  // 批量搜索
  function batchSearch(flag, data) {
    if (flag) {
      setParams({ ...params, ...data });
    }
    setBacthSearchModalVisible(false);
  }

  // 表单元素
  const memoChildTemp = useMemo(() => {
    const currentFormItem = items.find((o) => o.key === currentFilter);
    if (!currentFormItem) return null;

    return (
      <RenderComp
        t={t}
        item={{ ...currentFormItem, style: { ...currentFormItem.style, width: 240 } }}
      />
    );
  }, [currentFilter, items, t]);

  const renderSeniorSearchForm = useMemo(
    () => (
      <SeniorSearchForm
        t={t}
        visible={seniorSearchFormState}
        initialValues={seniorInitVal}
        items={items}
        seniorCallbackFn={seniorSearch}
      />
    ),
    [items, seniorInitVal, seniorSearchFormState]
  );

  const renderFilterItems = useMemo(() => {
    const renderParams = isEmptyValsObj(params, items);
    if (!renderParams) return null;
    return <FilteredItems t={t} params={renderParams} handleParam={handleParam} />;
  }, [params, items, t]);

  return (
    <TopSearch ref={thisRef}>
      <div className="pull-left d-flex">
        {!!items.length && (
          <SearchForm form={form} onFinish={submitFn} className="search-form">
            {items.length > 1 && (
              <Form.Item>
                <Select
                  style={{ width: 110, fontSize: 12 }}
                  defaultValue={items[0].key}
                  value={currentFilter}
                  onChange={(val) => {
                    setCurrentFilter(val);
                  }}
                >
                  {items?.map((i) => (
                    <Select.Option key={i.key} value={i.key} className="fz-12">
                      {i.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            )}
            <Form.Item name={currentFilter} className={items!.length > 1 ? 'mult' : ''}>
              {memoChildTemp}
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ padding: '0 0.8em', marginRight: 10 }}
              >
                <SearchOutlined />
              </Button>
            </Form.Item>
          </SearchForm>
        )}
        <div className="mb-10 d-flex">
          {showBatchSearch && (
            <Button
              key="batchSearch"
              className="mr-10 fz-12"
              onClick={() => setBacthSearchModalVisible(true)}
            >
              {t('common:search.batch')}
            </Button>
          )}
          {extraActions}
        </div>
      </div>

      <div className="pull-right mb-10">
        {/* <Tooltip key="expand" title={'全页面显示'} className="mr-10">
          <Button className="mr-10" onClick={refreshCallback} icon={<FullscreenOutlined />}></Button>
        </Tooltip> */}
        {refreshCallback && (
          <Tooltip key="refresh" title={t('common:refresh')} className="mr-10">
            <Button className="mr-10" onClick={refreshCallback} icon={<RedoOutlined />}></Button>
          </Tooltip>
        )}
        {extra2Actions}
        {showSeniorSearch && (
          <Button
            type="link"
            className="fz-12"
            onClick={() => {
              setSeniorSearchFormState(!seniorSearchFormState);
            }}
          >
            {t('common:search.senior')}
            <DoubleRightOutlined />
          </Button>
        )}
      </div>

      {/* 已有的过滤条件 */}
      {renderFilterItems}

      {renderSeniorSearchForm}

      <BatchSearchModal
        t={t}
        visible={batchSearchModalVisible}
        batchCallbackFn={batchSearch}
        params={params}
        filterItems={items.filter((i) => i.multiple)}
      />
    </TopSearch>
  );
};

export default FilterGroup;

// 高级搜索表单
const SeniorSearchForm = ({ t, initialValues, items, seniorCallbackFn, visible }) => {
  const [form] = Form.useForm();
  const formSubmit = () => {
    const values = form.getFieldsValue();
    seniorCallbackFn(
      true,
      omit(
        values,
        Object.keys(values).filter((k) => isUndefined(values[k]))
      )
    );
  };

  const resetForm = () => {
    form.resetFields();
  };

  const closeCallback = () => {
    seniorCallbackFn(false, {});
  };

  useEffect(() => {
    if (visible) {
      form.setFieldsValue(initialValues);
    }
  }, [visible]);

  return (
    <Drawer
      title={t('common:search.senior')}
      visible={visible}
      width={560}
      onClose={closeCallback}
      footer={
        <div className="t-right">
          <Button type="primary" onClick={formSubmit} className="mr-10">
            {t('common:search.label')}
          </Button>
          <Button onClick={resetForm}>{t('common:reset')}</Button>
        </div>
      }
    >
      <Form form={form} layout="vertical">
        <Row gutter={24}>
          {items.map((item) => (
            <Col key={item.key} lg={12} md={12}>
              <Form.Item
                name={item.key}
                label={
                  <span>
                    {item.label}
                    {item.multiple && (
                      <Tooltip
                        placement="right"
                        title={<span className="fz-12">{t('search.senior-tip')}</span>}
                      >
                        <QuestionCircleOutlined className="ml-10 fz-12 c-warn" />
                      </Tooltip>
                    )}
                  </span>
                }
              >
                {<RenderComp t={t} isSeniorForm item={{ ...item, style: { width: '100%' } }} />}
              </Form.Item>
            </Col>
          ))}
        </Row>
      </Form>
    </Drawer>
  );
};
