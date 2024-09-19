import React from 'react';
import { Button, Checkbox, Flex, Popconfirm, Table } from 'antd';
import { PrinterOutlined } from '@ant-design/icons';

import { formatDateTime } from '@/utils/functions/commonFunction';
import { dltIcon, editIcon, splitIcon } from '@/utils/icons/icons';
import TableComponent from '@/component/tableComponent/TableComponent';

const TableColumns = () => {
  return [
    {
      title: 'Priority',
      dataIndex: 'priority1',
      sorter: {
        compare: (a: any, b: any) => a.priority - b.priority,
        multiple: 3,
      },
      Width: 50,
    },

    {
      title: 'Order No.',
      dataIndex: 'prodOrderNo',
      sorter: {
        compare: (a: any, b: any) => a.orderno - b.orderno,
        multiple: 3,
      },
      width: 50,
    },
    {
      title: 'Plan Type',
      dataIndex: 'planType',
      sorter: {
        compare: (a: any, b: any) => a.planType - b.planType,
        multiple: 3,
      },
      width: 500,
      className: 'common-width',
    },
    {
      title: 'Part No./Part Name',
      dataIndex: 'partName',
      sorter: {
        compare: (a: any, b: any) => a.partnopartname - b.partnopartname,
        multiple: 3,
      },
      className: 'common-width',
    },
    {
      title: 'Model Sub Assm. Code',
      dataIndex: 'subAssemblyHeader',
      sorter: {
        compare: (a: any, b: any) => a.subAssemblyHeader - b.subAssemblyHeader,
        multiple: 3,
      },
      className: 'common-width',

      width: 200,
    },
    {
      title: 'Cell Name',
      dataIndex: 'cellName',
      sorter: {
        compare: (a: any, b: any) => a.cellName - b.cellName,
        multiple: 3,
      },
      className: 'common-width',

      width: 80,
    },
    {
      title: 'Planned Start Time',
      dataIndex: 'scheduleStartDateTime',
      sorter: {
        compare: (a: any, b: any) =>
          a.scheduleStartDateTime - b.scheduleStartDateTime,
        multiple: 3,
      },
      render: (_, record: any) =>
        record.scheduleStartDateTime != null &&
        formatDateTime(record?.scheduleStartDateTime),

      className: 'common-width',
    },
    {
      title: 'Planned End Time',
      dataIndex: 'scheduleEndDateTime',
      sorter: {
        compare: (a: any, b: any) =>
          a.scheduleEndDateTime - b.scheduleEndDateTime,
        multiple: 3,
      },
      render: (_, record: any) =>
        record.scheduleEndDateTime != null &&
        formatDateTime(record?.scheduleEndDateTime),

      className: 'common-width',
    },
    {
      title: 'Actual Start Time',
      dataIndex: 'actualstarttime',
      sorter: {
        compare: (a: any, b: any) => a.actualstarttime - b.actualstarttime,
        multiple: 3,
      },
      render: (_, record: any) =>
        record.actualstarttime != null &&
        formatDateTime(record?.actualstarttime),
      className: 'common-width',
    },
    {
      title: 'Actual End Time',
      dataIndex: 'actualendtime',
      sorter: {
        compare: (a: any, b: any) => a.actualendtime - b.actualendtime,
        multiple: 3,
      },
      render: (_, record: any) =>
        record.actualendtime != null && formatDateTime(record?.actualendtime),
      className: 'common-width',
    },
    {
      title: 'Qty.',
      dataIndex: 'qty',
      sorter: {
        compare: (a: any, b: any) => a.qty - b.qty,
        multiple: 3,
      },
      width: 100,
    },
    {
      title: 'Finished Qty.',
      dataIndex: 'finishedQty',
      sorter: {
        compare: (a: any, b: any) => a.finishedqty - b.finishedqty,
        multiple: 3,
      },
      width: 100,
    },
    {
      title: 'WIP Qty.',
      dataIndex: 'wipQty',
      sorter: {
        compare: (a: any, b: any) => a.wipqty - b.wipqty,
        multiple: 3,
      },
      width: 100,
    },
    {
      title: 'Added By',
      dataIndex: 'addedby',
      sorter: {
        compare: (a: any, b: any) => a.addedby - b.addedby,
        multiple: 3,
      },

      width: 100,
    },
    {
      title: 'Production Confirmation',
      dataIndex: 'productionConfirmation',
      sorter: {
        compare: (a: any, b: any) =>
          a.productionConfirmation - b.productionConfirmation,
        multiple: 3,
      },
      width: 100,
    },
    Table.SELECTION_COLUMN,
    {
      title: 'All',
      dataIndex: 'all',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      className: 'common-width',

      fixed: 'right',
      render: (_, record: any) => <PrinterOutlined />,
    },
  ];
};

const QueueColumns = ({ handleEdit, handleSplit }: any) => {
  return [
    {
      title: 'Priority',
      dataIndex: 'priority1',
      sorter: {
        compare: (a: any, b: any) => a.priority - b.priority,
        multiple: 3,
      },
      width: 100,
    },

    {
      title: 'Order No.',
      dataIndex: 'prodOrderNo',
      sorter: {
        compare: (a: any, b: any) => a.orderno - b.orderno,
        multiple: 3,
      },
      width: 100,
    },
    {
      title: 'Plan Type',
      dataIndex: 'planType',
      sorter: {
        compare: (a: any, b: any) => a.planType - b.planType,
        multiple: 3,
      },
      className: 'min-w-3',
      width: 130,
    },
    {
      title: 'Part No./Part Name',
      dataIndex: 'partName',
      sorter: {
        compare: (a: any, b: any) => a.partnopartname - b.partnopartname,
        multiple: 3,
      },
      className: 'common-width',
    },
    {
      title: 'Model Sub Assm. Code',
      dataIndex: 'subAssemblyHeader',
      sorter: {
        compare: (a: any, b: any) => a.subAssemblyHeader - b.subAssemblyHeader,
        multiple: 3,
      },
      width: 200,
    },
    {
      title: 'Cell Name',
      dataIndex: 'cellName',
      sorter: {
        compare: (a: any, b: any) => a.cellName - b.cellName,
        multiple: 3,
      },
      width: 80,
    },
    {
      title: 'Production Order DateTime',
      dataIndex: 'prodOrderDateTime',
      sorter: {
        compare: (a: any, b: any) => a.prodOrderDateTime - b.prodOrderDateTime,
        multiple: 3,
      },
      render: (_, record: any) =>
        record.prodOrderDateTime != null &&
        formatDateTime(record?.prodOrderDateTime),

      className: 'common-width',
    },
    {
      title: 'Qty.',
      dataIndex: 'qty',
      sorter: {
        compare: (a: any, b: any) => a.qty - b.qty,
        multiple: 3,
      },
      width: 100,
    },
    {
      title: 'Added By',
      dataIndex: 'createdBy',
      sorter: {
        compare: (a: any, b: any) => a.createdBy - b.createdBy,
        multiple: 3,
      },
      width: 100,
    },
    {
      title: 'Order Status',
      dataIndex: 'orderStatus',
      sorter: {
        compare: (a: any, b: any) =>
          a.orderStatus - b.orderStatus,
        multiple: 3,
      },
      width: 100,
    },
    Table.SELECTION_COLUMN,
    {
      title: 'All',
      dataIndex: 'all',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      className: 'common-width',

      fixed: 'right',
      render: (_, record: any) => (
        <Flex gap={15} className="action-icon">
          <Button
            className="btn-outline"
            onClick={() => handleEdit(record.prodOrderId)}
          >
            {editIcon}
          </Button>
          {record?.moveOn == false && (
            <Button
              className="btn-outline"
              onClick={() => handleSplit(record?.prodOrderId)}
            >
              {splitIcon}
            </Button>
          )}

          <Popconfirm title="Sure to delete?" className="btn-outline">
            <Button>{dltIcon}</Button>
          </Popconfirm>
        </Flex>
      ),
    },
  ];
};
const expandedRowRenderColumns = ({ record }: any) => {
  let columns = [

    { title: 'Work Allocation', dataIndex: 'date', key: 'date' },
    {
      title: 'Work Allocation',
      dataIndex: 'workAllocation',
      width: 120,
      sorter: {
        compare: (a: any, b: any) => a.workAllocation - b.workAllocation,
        multiple: 3,
      },
    },
    {
      title: 'Priority',
      dataIndex: 'priority2',
      width: 120,
      sorter: {
        compare: (a: any, b: any) => a.priority2 - b.priority2,
        multiple: 3,
      },
    },
    {
      title: 'Work Center',
      dataIndex: 'workCenterName',
      width: 100,
      sorter: {
        compare: (a: any, b: any) => a.workCenter - b.workCenter,
        multiple: 3,
      },
    },
    {
      title: 'Op. No.',
      dataIndex: 'operationNo',
      width: 100,
      sorter: {
        compare: (a: any, b: any) => a.workCenter - b.workCenter,
        multiple: 3,
      },
    },
    {
      title: 'Operator',
      dataIndex: 'operator',
      width: 100,
      sorter: {
        compare: (a: any, b: any) => a.operator - b.operator,
        multiple: 3,
      },
    },
    {
      title: 'Plan Start Date Time',
      dataIndex: 'scheduleStartDateTime',
      width: 120,
      sorter: {
        compare: (a: any, b: any) =>
          a.scheduleStartDateTime - b.scheduleStartDateTime,
        multiple: 3,
      },
      render: (_, record: any) => <>{formatDateTime(record?.scheduleStartDateTime)}</>,

    },
    {
      title: 'Plan End Date Time',
      dataIndex: 'scheduleEndDateTime',
      width: 120,
      sorter: {
        compare: (a: any, b: any) =>
          a.scheduleEndDateTime - b.scheduleEndDateTime,
        multiple: 3,
      },
      render: (_, record: any) => <>{formatDateTime(record?.scheduleEndDateTime)}</>,
    },
    {
      title: 'Actual Start Date Time',
      dataIndex: 'actualStartDateTime',
      width: 120,
      sorter: {
        compare: (a: any, b: any) =>
          a.actualStartDateTime - b.actualStartDateTime,
        multiple: 3,
      },
      render: (_, record: any) => <>{formatDateTime(record?.actualStartDateTime)}</>,

    },
    {
      title: 'Actual End Date Time',
      dataIndex: 'actualEndDateTime',
      width: 120,
      sorter: {
        compare: (a: any, b: any) =>
          a.actualEndDateTime - b.actualEndDateTime,
        multiple: 3,
      },
      render: (_, record: any) => <>{formatDateTime(record?.actualEndDateTime)}</>,

    },
    {
      title: 'Actual Duration',
      dataIndex: 'actualDuration',
      width: 120,
      sorter: {
        compare: (a: any, b: any) => a.actualDuration - b.actualDuration,
        multiple: 3,
      },
    },
    {
      title: 'Qty.',
      dataIndex: 'qty',
      width: 80,
      sorter: {
        compare: (a: any, b: any) => a.qty - b.qty,
        multiple: 3,
      },
    },
    {
      title: 'To Produced',
      dataIndex: 'toProduced',
      width: 120,
      sorter: {
        compare: (a: any, b: any) => a.toProduced - b.toProduced,
        multiple: 3,
      },
    },
    {
      title: 'Produced Qty.',
      dataIndex: 'producedQty',
      width: 120,
      sorter: {
        compare: (a: any, b: any) => a.producedQty - b.producedQty,
        multiple: 3,
      },
    },
    {
      title: 'Good Parts.',
      dataIndex: 'goodParts',
      width: 100,
      sorter: {
        compare: (a: any, b: any) => a.goodParts - b.goodParts,
        multiple: 3,
      },
    },
    {
      title: 'Scrapped Parts.',
      dataIndex: 'scrappedPart',
      width: 100,
      sorter: {
        compare: (a: any, b: any) => a.scrappedPart - b.scrappedPart,
        multiple: 3,
      },
    },
    {
      title: 'Defect Qty.',
      dataIndex: 'defectedQty',
      width: 100,
      sorter: {
        compare: (a: any, b: any) => a.defectedQty - b.defectedQty,
        multiple: 3,
      },
    },
    {
      title: 'Schedule Status',
      dataIndex: 'scheduleStatus',
      width: 120,
      sorter: {
        compare: (a: any, b: any) => a.scheduleStatus - b.scheduleStatus,
        multiple: 3,
      },
    },
    {
      title: 'Work Center Status',
      dataIndex: 'workCenterStatus',
      width: 100,
      sorter: {
        compare: (a: any, b: any) => a.workCenterStatus - b.workCenterStatus,
        multiple: 3,
      },
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={record?.allocations}
      pagination={false}
    />
  );
};

const CustomTabs = ({
  columns,
  shopResponse,
  expandedRowRender,
  expandedRowKey,
  handleExpand,
}: any) => {
  return [
    {
      key: 'Pending',
      label: 'Pending',
      children: (
        <TableComponent
          columns={columns}
          data={shopResponse?.pending}
          expandable={{
            expandedRowRender,
            expandedRowKeys: expandedRowKey ? [expandedRowKey] : [],
            onExpand: handleExpand,
          }}
        />
      ),
    },
    {
      key: 'Running',
      label: 'Running',
      children: (
        <TableComponent
          columns={columns}
          data={shopResponse?.running}
          expandable={{
            expandedRowRender,
            expandedRowKeys: expandedRowKey ? [expandedRowKey] : [],
            onExpand: handleExpand,
          }}
        />
      ),
    },
    {
      key: 'Completed',
      label: 'Completed',
      children: (
        <TableComponent
          columns={columns}
          data={shopResponse?.completed}
          expandable={{
            expandedRowRender,
            expandedRowKeys: expandedRowKey ? [expandedRowKey] : [],
            onExpand: handleExpand,
          }}
        />
      ),
    },
    {
      key: 'Hold',
      label: 'Hold',
      children: (
        <TableComponent
          columns={columns}
          data={shopResponse?.hold}
          expandable={{
            expandedRowRender,
            expandedRowKeys: shopResponse?.hold
              ?.filter(
                (item: any) => item.allocations && item.allocations.length > 0
              )
              ?.map((item: any) => item.key), // Assuming each row has a unique 'key'
            onExpand: (expanded, record) => {
              if (record.allocations && record.allocations.length > 0) {
                handleExpand(expanded, record); // Your existing handleExpand logic
              }
            },
          }}
        />
      ),
    },
  ];
};
const secondTabItems = ({
  columns,
  shopResponse,
  expandedRowRender,
  expandedRowKey,
  handleExpand,
  rowSelection
}: any) => {
  return [
    {
      key: 'Cell',
      label: 'Cell',
      children: (
        <TableComponent
          columns={columns}
          data={shopResponse?.cell}
          expandable={{
            expandedRowRender,
            expandedRowKeys: expandedRowKey ? [expandedRowKey] : [],
            onExpand: handleExpand,
          }}
        />
      ),
    },
    {
      key: 'Cell Load Analysis',
      label: 'Cell Load Analysis',
      children: (
        <TableComponent
          columns={columns}
          data={shopResponse?.cellLoadAnalysis}
          expandable={{
            expandedRowRender,
            expandedRowKeys: expandedRowKey ? [expandedRowKey] : [],
            onExpand: handleExpand,
          }}
        />
      ),
    },
    {
      key: 'Work Center Load Analysis',
      label: 'Work Center Load Analysis',
      children: (
        <TableComponent
          columns={columns}
          data={shopResponse?.workCenterLoadAnalysis}
          expandable={{
            expandedRowRender,
            expandedRowKeys: expandedRowKey ? [expandedRowKey] : [],
            onExpand: handleExpand,
          }}
          rowSelection={rowSelection}
        />
      ),
    },
  ];
};
const thirdTabItems = ({
  QueueColumns,
  columns,
  shopResponse,
  rowSelection,
  expandedRowRender,
  expandedRowKey,
  handleExpand,
}: any) => {
  return [
    {
      key: 'Plan',
      label: 'Plan',
      children: (
        <TableComponent columns={QueueColumns} data={shopResponse?.plan} rowSelection={rowSelection} />
      ),
    },
    {
      key: 'Queue',
      label: 'Queue',
      children: (
        <TableComponent columns={QueueColumns} data={shopResponse?.queue} rowSelection={rowSelection} />
      ),
    },
    {
      key: 'UnplannedProductionOrder',
      label: 'Unplanned PO',
      children: (
        <TableComponent columns={columns} data={shopResponse?.unplannedPo} rowSelection={rowSelection} />
      ),
    },
  ];
};

export default {
  TableColumns,
  QueueColumns,
  expandedRowRenderColumns,
  CustomTabs,
  secondTabItems,
  thirdTabItems,
};
