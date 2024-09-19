'use client';

import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ColumnsType, TableProps } from 'antd/lib/table';

import { pagination } from '@/utils/redux/features/reduxData';

import Loader from '../loader/Loader';
interface TableComponentProps<T> {
  columns: ColumnsType<T>;
  data: T[];
  expandable?: TableProps<T>['expandable'];
  rowSelection?: TableProps<T>['rowSelection'];
}

const TableComponent = <T extends object>({
  columns,
  data,
  expandable,
  rowSelection,
}: TableComponentProps<T>) => {
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(process.env.NEXT_PUBLIC_TABLE_PAGE);

  const [loading, setLoading] = useState(!data || data.length === 0);
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (page: any, pageSize: any) => {
    dispatch(pagination({ pageIndex: page, pageSize }));

    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const handleChange = (currentpagination: any, filters: any, sorter: any) => {
    const { current: pageIndex, pageSize } = currentpagination;
    const sortColumn = sorter?.column?.dataIndex;
    const sortOrder = sorter.order === 'descend' ? 'desc' : 'asc';

    const payload: any = { pageIndex, pageSize };

    if (sortColumn) {
      payload.sortColumn = sortColumn;
      payload.sortOrder = sortOrder;
    }
    dispatch(pagination(payload));
  };

  const handlePageSizeChange = (current: any, size: any) => {
    setPageSize(size);
  };
  const getColumns = () => {
    return [
      {
        title: '#',
        dataIndex: 'index',
        key: 'index',
        render: (text: any, record: any, index: any) =>
          (currentPage - 1) * pageSize + index + 1,
      },
      // Spread your other column definitions here
      ...columns,
    ];
  };
  useEffect(() => {
    // If there's no data, set loading to true
    if (!data || data.length === 0) {
      setLoading(true);

      // Set a timeout to update loading after 3 seconds
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);

      // Cleanup the timeout if the component unmounts before the timeout completes
      return () => clearTimeout(timer);
    }
    // If data exists, ensure loading is false
    setLoading(false);
  }, [data]);
  const totalRecords =
    data && data.length > 0 && data[0].totalRecords !== undefined
      ? data[0].totalRecords
      : data?.length || 0;

  return (
    <Table
      expandable={expandable}
      columns={getColumns()}
      dataSource={data && data.length > 0 ? data : []}
      loading={{ spinning: loading, indicator: <Loader /> }}
      onChange={handleChange}
      {...(rowSelection && { rowSelection })}
      pagination={{
        total: totalRecords,
        current: currentPage,
        pageSize,
        pageSizeOptions: ['10', '20', '30', '40'],
        showSizeChanger: true,
        onChange: handlePageChange,
        onShowSizeChange: handlePageSizeChange,
        position: ['bottomCenter'],
      }}
      className="block-table overflow-auto"
    />
  );
};

export default TableComponent;
