import React, { useState, useEffect, useImperativeHandle } from 'react';
import { isArray, omitBy, isNull, isUndefined } from 'lodash';
import { get, useRequest } from '@gui/request';

import "antd/lib/table/style/index.css";

function omitObj(obj) {
  return omitBy(obj, (v) => isNull(v) || isUndefined(v));
}

import { Table } from 'antd';

interface AysncTableProps {
  t;
  notRequest?: boolean;
  apiMethod?;
  apiUrl;
  myRef?: any;
  params?;
  listName?;
  uniqueKey?;
  toggleRefresh?;
  options?;
  refreshTableCurrentPageDataProps?;
  defaultPagination?;
  selectionChange?;
  confs?: {
    columns?: Array<any>;
    size?: 'middle' | 'small' | 'large';
    [paramname: string]: any;
  };
  callbackFn?;
  initTableHeaderParams?;
}

var timeoutTask;

const AsyncTable = ({
  t,
  notRequest,
  apiMethod = 'GET',
  apiUrl,
  params,
  listName = 'results',
  uniqueKey = 'id',
  toggleRefresh = false,
  initTableHeaderParams,
  options = {
    currentKey: 'index',
    pagesizeKey: 'limit',
    totalKey: 'total',
  },
  refreshTableCurrentPageDataProps,
  defaultPagination,
  selectionChange,
  confs = {
    size: 'middle',
    hidePagination: false,
  },
  myRef,
  callbackFn,
}: AysncTableProps) => {
  const { hidePagination, columns, ...tableSelfConfs } = confs;

  const paginationInitial = {
    simple: false,
    current: 1,
    showSizeChanger: true,
    total: 0,
    showTotal: (totalNum) => t('paginationTotalText', { total: totalNum }),
    pageSize: 10,
    pageSizeOptions: [10, 20, 50, 100],
    position: ['bottomCenter', 'bottomCenter'],
  };

  const [tableHeaderQueryParams, setTableHeaderQueryParams] = useState({
    sortField: null,
    sortOrder: null,
    ...initTableHeaderParams,
    ...(!hidePagination
      ? {
        [options.currentKey]: paginationInitial.current,
        [options.pagesizeKey]: paginationInitial.pageSize,
      }
      : {}),
  });

  const [pagination, setPagination] = useState({
    ...paginationInitial,
    [options.currentKey]: paginationInitial.current,
    [options.pagesizeKey]: paginationInitial.pageSize,
    ...defaultPagination,
  });

  const [dataSource, setDataSource] = useState<Array<any>>([]);

  const [selectedKeys, setSelectedKeys] = useState([]);
  const [selectedPageRows, setSelectedPageRows] = useState<Array<any>>([]);

  const [query, setQuery] = useState(params);

  function toggleTableData(datas) {
    const { reqUrl, paramsKey, conditions, searchKey } = refreshTableCurrentPageDataProps;
    setDataSource(datas);
    const doingItems = datas.filter((i) => conditions(i));
    if (doingItems?.length) {
      timeoutTask = setTimeout(() => {
        get(reqUrl, {
          [searchKey ?? paramsKey]: doingItems.map((i) => i[paramsKey]).join(','),
        }).then((res: any) => {
          toggleTableData(
            datas.map((item) => {
              let newItem = res.find((r) => r[paramsKey] === item[paramsKey]);
              if (newItem) return { ...item, ...newItem };
              return item;
            })
          );
        });
      }, 5000);
    }
  }

  const { loading } = notRequest
    ? { loading: false }
    : useRequest(apiUrl, {
      axiosOptions: {
        [apiMethod === 'POST' ? 'data' : 'params']: omitObj({
          ...query,
          ...tableHeaderQueryParams,
        }),
        method: apiMethod,
        withCredentials: true,
      },
      trigger: {
        ...query,
        ...tableHeaderQueryParams,
        toggleRefresh,
      },
      forceDispatchEffect: () => {
        timeoutTask && clearTimeout(timeoutTask);
        return true;
      },
      onData: (res) => {
        let result = res?.data?.data ?? res;
        if (result) {
          !hidePagination &&
            setPagination({
              ...pagination,
              current: result[options.currentKey] - 0,
              pageSize: result[options.pagesizeKey] - 0,
              total: result.total,
            });

          let finallyDataSource = listName ? result[listName] : result;

          if (!!refreshTableCurrentPageDataProps) {
            toggleTableData(finallyDataSource);
          } else {
            setDataSource(finallyDataSource);
          }

          // 告诉父组件表格有更新（特定场景使用）
          callbackFn && callbackFn();
        }
      },
    });

  useEffect(() => {
    if (JSON.stringify(query || '') !== JSON.stringify(params || '')) {
      setTableHeaderQueryParams({
        ...tableHeaderQueryParams,
        ...(!hidePagination ? { [options.currentKey]: 1 } : {}),
      });
      setQuery(params);
    }
  }, [params]);

  const handleTableChange = (nextPagination, nextFilters, sorter) => {
    let nextQueryParams = Object.assign(tableHeaderQueryParams);
    if (
      (!hidePagination && nextPagination?.current !== pagination.current) ||
      nextPagination?.pageSize !== pagination.pageSize
    ) {
      nextQueryParams = omitObj({
        ...nextQueryParams,
        [options.currentKey]: nextPagination?.current,
        [options.pagesizeKey]: nextPagination?.pageSize,
      });
    }

    if (nextFilters) {
      nextQueryParams = omitObj({
        ...nextQueryParams,
        ...Object.keys(nextFilters).reduce((obj, key) => {
          return {
            ...obj,
            [key]: isArray(nextFilters[key]) ? nextFilters[key].join(',') : nextFilters[key],
          };
        }, {}),
      });
    }

    if (sorter) {
      nextQueryParams = omitObj({
        ...nextQueryParams,
        sortField: sorter.field,
        sortOrder: sorter.order,
      });
    }

    if (JSON.stringify(nextQueryParams) !== JSON.stringify(tableHeaderQueryParams)) {
      setTableHeaderQueryParams(nextQueryParams);
    }
  };

  useEffect(() => {
    return timeoutTask && clearTimeout(timeoutTask);
  }, []);

  // 暴露给父组件的接口
  if (myRef) {
    useImperativeHandle(myRef, () => ({
      getQuerys: () => {
        return tableHeaderQueryParams;
      },
      getTableData: () => {
        return {
          dataSource,
          total: pagination?.total,
        };
      },
    }));
  }

  function updateSelected(keys, rows) {
    setSelectedKeys(keys);
    setSelectedPageRows(rows);

    selectionChange?.fn(keys, rows);
  }

  return (
    <Table
      {...tableSelfConfs}
      loading={loading}
      pagination={!hidePagination ? pagination : false}
      dataSource={dataSource}
      onChange={handleTableChange}
      rowKey={(r) => r[uniqueKey]}
      columns={columns?.map(i => ({ ...i, align: 'center' }))}
      rowSelection={
        selectionChange
          ? {
            selectedRowKeys: selectedKeys,
            onChange: (selectedRowKeys, selectedRows) => {
              const currentPageKeys = dataSource.map((r) => r[uniqueKey]);
              const nextKeys = selectedKeys.filter((i) => !currentPageKeys.includes(i));
              const nextRows = selectedPageRows.filter(
                (i) => !currentPageKeys.includes(i[uniqueKey])
              );

              updateSelected([...selectedRowKeys, ...nextKeys], [...selectedRows, ...nextRows]);
            },
            ...(selectionChange?.props || {}),
            selections: selectedKeys?.length && [
              {
                key: 'cancel',
                text: '取消全部选中',
                onSelect: () => {
                  updateSelected([], []);
                },
              },
            ],
          }
          : confs.rowSelection || null
      }
    />
  );
};

// @ts-ignore
export default (AsyncTable);
