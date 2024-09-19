import { Button, Flex, Popconfirm } from 'antd';

import SwitchComponent from '@/app/layout/switchComponent/SwitchComponent';
import { formatDateTime } from '@/utils/functions/commonFunction';
import { dltIcon, editIcon, timeIcon } from '@/utils/icons/icons';
import service from '@/utils/service/service';

const Columns = ({ handleEdit, handleConfirmDelete }: any) => {
  return [
    {
      title: 'Part No.',
      dataIndex: 'partNo',
    },
    {
      title: 'Part Name',
      dataIndex: 'partName',
    },
    {
      title: 'Cell Name',
      dataIndex: 'cellName',
    },
    {
      title: 'Min Order Qty.',
      dataIndex: 'minOrderQty',
    },
    {
      title: 'Max Order Qty.',
      dataIndex: 'maxOrderQty',
    },
    {
      title: 'Work MSQ',
      dataIndex: 'msq',
    },
    {
      title: 'Total Production Time',
      dataIndex: 'totalProductionTime',
      render: (_: any, record: any) =>
        record?.totalProductionTime != null
          ? `${record.totalProductionTime} Min`
          : null,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_: any, record: any) => (
        <SwitchComponent
          masterName="machineParts"
          idName="partId"
          idValue={record.partId}
          status={record.status}
          url={service?.API_URL?.machineparts?.listing}
        />
      ),
    },
    {
      title: 'Last Changed',
      dataIndex: 'lastModifiedTime',
      render: (_: any, record: any) =>
        record?.lastModifiedTime != null &&
        formatDateTime(record?.lastModifiedTime),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: 150,
      fixed: 'right',
      render: (_: any, record: any) => (
        <Flex gap={15} className="action-icon">
          <Button
            onClick={() => handleEdit(record.partId)}
            className="btn-outline"
          >
            {editIcon}
          </Button>
          <Button className="btn-outline">{timeIcon}</Button>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleConfirmDelete(record.partId)}
            className="btn-outline"
          >
            <Button> {dltIcon}</Button>
          </Popconfirm>
        </Flex>
      ),
    },
  ];
};

const expandedRowColumns = () => {
  return [
    {
      title: 'OP No.',
      dataIndex: 'operationNo',
    },
    {
      title: 'Operation Name',
      dataIndex: 'operationName',
    },
    {
      title: 'Work Center Name',
      dataIndex: 'workCenterName',
    },
    {
      title: 'Program Name',
      dataIndex: 'programName',
    },
    {
      title: 'Fixture Setup Time',
      dataIndex: 'fixtureSetupTime',
      render: (_: any, record: any) =>
        record?.fixtureSetupTime != null
          ? `${record.fixtureSetupTime} Min`
          : null,
    },
    {
      title: 'Tool Setup Time',
      dataIndex: 'toolSetupTime',
      render: (_: any, record: any) =>
        record?.toolSetupTime != null ? `${record.toolSetupTime} Min` : null,
    },
    {
      title: 'Part Loading Time',
      dataIndex: 'partLoadingTime',
      render: (_: any, record: any) =>
        record?.partLoadingTime != null
          ? `${record.partLoadingTime} Min`
          : null,
    },
    {
      title: 'Cycle Time',
      dataIndex: 'cycleTime',
      render: (_: any, record: any) =>
        record?.cycleTime != null ? `${record.cycleTime} Min` : null,
    },
    {
      title: 'Part Unloading Time',
      dataIndex: 'partUnloadingTime',
      render: (_: any, record: any) =>
        record?.partUnloadingTime != null
          ? `${record.partUnloadingTime} Min`
          : null,
    },
    {
      title: 'Fixture Unloading Time',
      dataIndex: 'fixtureUnloadingTime',
      render: (_: any, record: any) =>
        record?.fixtureUnloadingTime != null
          ? `${record.fixtureUnloadingTime} Min`
          : null,
    },
    {
      title: 'Transit Time',
      dataIndex: 'transitTime',
      render: (_: any, record: any) =>
        record?.transitTime != null ? `${record.transitTime} Min` : null,
    },
  ];
};

export default { Columns, expandedRowColumns };
