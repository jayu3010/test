'use client'

import React, { useState, useRef, useEffect } from 'react'

import {
  Button,
  Collapse,
  Form,
  Popconfirm,
  Tag,
  Flex,
  Radio,
} from 'antd'
import CommonForm from '@/app/layout/commonForm/commonForm'
import Filter from '@/app/layout/filter/filter'
import CommonHeader from '@/component/commonHeader/CommonHeader'
import TableComponent from '@/component/tableComponent/TableComponent'
import service from '@/utils/service/service';
import useFetchData from '@/utils/useFetchData/customFetchData'

import { useDispatch, useSelector } from 'react-redux';
import { SubmitHandler } from 'react-hook-form'

import SelectBox from '@/component/selectbox/selectbox';
import { openModal } from '@/utils/redux/features/reduxData';
import { dltIcon, editIcon, timeIcon } from '@/utils/icons/icons';
import InputBox from '@/component/input/Input';
import CommonInput from '@/component/commonInput/commonInput';
import CommonSwitch from '@/component/commonSwitch/CommonSwitch';
import { FilterCommanFunction } from '@/utils/useFetchData/FilterCommanFunction';
import { filterOptiondata } from '@/utils/useFetchData/FilterOptionData';
import { commonSorter } from '@/utils/functions/commonFunction';
import SwitchComponent from '@/app/layout/switchComponent/SwitchComponent';
import ImportFile from '@/component/fileUpload/ImportFile';
import DeleteModal from '@/app/layout/deleteModal/DeleteModal'

const WorkCenter = () => {
  const openAddModal = useSelector((state: any) => state.isModalOpen);
  const filterData = useSelector((state: any) => state.filterData);
  console.log('🚀 ~ WorkCenter ~ filterData:', filterData);

  const dispatch = useDispatch();
  const [workCenterId, setWorkCenterId] = useState('');
  const [unitId, setUnitId] = useState();
  const [machineShopId, setMachineShopId] = useState();
  const [shiftData, setShiftData] = useState([]);
  const [mainCategory, setMainCategory] = useState([]);
  const [assistantManager, setAssistantManager] = useState([]);

  const [form] = Form.useForm();
  const pageUrl=true
  const {
    listData,
    addData,
    getListData,
    updateData,
    
    getQueryFetch,
  }: any = useFetchData(service?.API_URL?.manageworkcenter?.listing, pageUrl);

  //  const fetchAllData = async ()=>{
  //   const queryParams = { pageIndex: 1, pageSize:2}
  //   const editMachineRes = await getQueryFetch(queryParams, service?.API_URL?.manageworkcenter?.listing);
  //   console.log("🚀 ~ fetchAllData ~ editMachineRes----:", editMachineRes)

  //  }

  //  useEffect(()=>{
  //   fetchAllData();
  //  },[])

  const filterItems = [
    {
      key: '1',
      label: 'Filter',
      children: (
        <Filter
          data={FilterCommanFunction(filterOptiondata.workCenter[0])}
          url={service?.API_URL?.manageworkcenter?.listing}
          exportUrl={service?.API_URL?.manageworkcenter?.export}
        />
      ),
    },
  ];
  const columns = [
    {
      title: 'Unit Name',
      dataIndex: 'unitName',
      sorter: {
        compare: commonSorter('unitName'),
        multiple: 3,
      },
    },
    {
      title: 'Machine Shop',
      dataIndex: 'machineShopName',
      sorter: {
        compare: commonSorter('machineShopName'),
        multiple: 3,
      },
    },
    {
      title: 'Line',
      dataIndex: 'lineName',
      sorter: {
        compare: commonSorter('lineName'),
        multiple: 3,
      },
    },
    {
      title: 'Work Center Name',
      dataIndex: 'workCenterName',
      sorter: {
        compare: commonSorter('workCenterName'),
        multiple: 3,
      },
      className: 'common-width',
    },
    {
      title: 'Work Center Description',
      dataIndex: 'description',
      sorter: {
        compare: commonSorter('description'),
        multiple: 3,
      },
      className: 'common-width',
    },
    {
      title: 'Work Center Type',
      dataIndex: 'workCenterTypeName',
      sorter: {
        compare: commonSorter('workCenterTypeName'),
        multiple: 3,
      },
      className: 'common-width',
    },
    {
      title: 'Asst. Manager',
      dataIndex: 'asstManagerFirstName',
      sorter: {
        compare: commonSorter('asstManagerFirstName'),
        multiple: 3,
      },
    },
    {
      title: 'Supervisor Group',
      dataIndex: 'supervisorGroupName',
      sorter: {
        compare: commonSorter('supervisorGroupName'),
        multiple: 3,
      },
      className: 'common-width',
    },
    {
      title: 'Machine Category',
      dataIndex: 'mainCategory',
      sorter: {
        compare: commonSorter('mainCategory'),
        multiple: 3,
      },
      className: 'common-width',
    },
    {
      title: 'Cell Eligible',
      dataIndex: 'cellEligible',
      render: (_, record) => (record.cellEligible ? 'Yes' : 'No'),
      sorter: {
        comparecommonSorter: commonSorter('vehicleName'),
        multiple: 3,
      },
      className: 'common-width',
    },
    {
      title: 'Pallet Name',
      dataIndex: 'palletName',
      sorter: {
        compare: commonSorter('palletName'),
        multiple: 3,
      },
    },
    {
      title: 'Shift',
      dataIndex: 'palletName',
      sorter: false,
      render: (_, record: any) => (
        <>
          {record?.shifts?.map((item: any, index: any) => {
            return (
              <Tag color="#f50" key={index}>
                {item?.shiftName}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Condition For Operational Review',
      dataIndex: 'considerOperationReview',
      render: (_, record: any) =>
        record.considerOperationReview ? 'Yes' : 'No',

      sorter: {
        compare: commonSorter('considerOperationReview'),
      },
      className: 'common-width',
    },
    {
      title: 'Customers',
      dataIndex: 'customers',
      sorter: {
        compare: commonSorter('customers'),
        multiple: 3,
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_: any, record: any) => (
        <SwitchComponent
            masterName="WorkCenters"
            idName="workCenterId"
            idValue={record.workCenterId}
            status={record.status}
            url={service?.API_URL?.manageworkcenter?.listing}
          />
      ),
    },

    {
      title: 'Action',
      dataIndex: 'action',
      width: 150,
      fixed: 'right',
      render: (_, record: any) => (
        <Flex gap={15} className="action-icon">
            <Button
              onClick={() => handleEdit(record.workCenterId)}
              className="btn-outline"
            >
              {editIcon}
            </Button>
            <Button className="btn-outline">{timeIcon}</Button>
            <DeleteModal id={record.workCenterId} deleteUrl={service?.API_URL?.manageworkcenter?.listing} />
          </Flex>
      ),
    },
  ];

  const onFinish: SubmitHandler<FormData> = async (data: any) => {
    delete data.machineShop;
    delete data.caution;
    delete data.cycleTimeSplitterSimulator;
    // delete data.downTimeReasons

    const body = {
      ...data,
      workCenterId: workCenterId || 0,
      isDelete: false,
      downTimeReasonIds:
        data?.downTimeReasonIds?.length > 0 ? data?.downTimeReasonIds : [],
      customerIds: data?.customerIds?.length > 0 ? data?.customerIds : [],
      shiftIds: data?.shiftIds?.length > 0 ? data?.shiftIds : [],
    };

    if (workCenterId) {
      let updateDataRes = await updateData(
        body,
        service?.API_URL?.manageworkcenter.update
      );
      if (updateDataRes.apiStatus) {
        form.resetFields();
        setWorkCenterId('');
      }
    } else {
      let addDataRes = await addData(
        body,
        service?.API_URL?.manageworkcenter.add
      );
      if (addDataRes.apiStatus) {
        form.resetFields();
      }
    }
  };

  const modalListing = async () => {
    const apiUrls = {
      materials: service?.API_URL?.materialsCode?.listing,
      unitList: service?.API_URL?.unitList?.listing,
      asstManager: service?.API_URL?.asstManagerMaster?.listing,
      supervisorGroup: service?.API_URL?.supervisoursGroup?.listing,
      machineMainCategory: service?.API_URL?.maincategories?.listing,
      workCenterType: service?.API_URL?.workType?.listing,
      palletd: service?.API_URL?.palletMaster.listing,
      shiftsData: service?.API_URL?.shiftManagement?.listing,
    };
    const enable = workCenterId ? true : false // Adjust this logic based on your requirements
    await getListData(apiUrls, enable);
  };

  useEffect(() => {
    if (openAddModal) {
      modalListing();
    } else {
      setWorkCenterId('');
    }
  }, [openAddModal]);
  useEffect(() => {
    if (unitId) {
      handleChangeUnit(unitId);
      handleChangeMainCat(unitId);
    }
  }, [unitId]);
  const handleChangeUnit = async (id: any) => {
    const queryParams = { unitId: id };
    const unitbyBreakData: any = await getQueryFetch(
      queryParams,
      service?.API_URL?.shiftManagement?.listing
    );
    if (unitbyBreakData?.length > 0) {
      setShiftData(formatBreakData(unitbyBreakData));
    }
  };
  const handleChangeMainCat = async (id: any) => {
    const queryParams = { unitId: id };
    const unitbyBreakData: any = await getQueryFetch(
      queryParams,
      service?.API_URL?.maincategories?.listing
    );
    if (unitbyBreakData?.length > 0) {
      setMainCategory(unitbyBreakData);
    }
  };
  const formatBreakData = (breakData: any) => {
    return breakData.map((breakItem: any) => ({
      ...breakItem,
      shiftName: `${breakItem.shiftName} (${breakItem.startTime} - ${breakItem.endTime})`,
    }));
  };
  const handleEdit = async (id: any) => {
    try {
      const queryParams = { workCenterId: id };
      const apiUrl = service.API_URL.manageworkcenter.getbyid;
      setWorkCenterId(id);

      const editMachineRes: any = await getQueryFetch(queryParams, apiUrl);

      if (editMachineRes) {
        dispatch(openModal());
        setUnitId(editMachineRes[0]?.unitId);
        setMachineShopId(editMachineRes[0]?.machineShopId);

        form.setFieldValue('machineShop', editMachineRes[0]?.machineShopId);

        form.setFieldValue(
          'shiftIds',
          editMachineRes[0]?.shifts?.map((item: any) => item.shiftId)
        );
        form.setFieldValue(
          'downTimeReasonIds',
          editMachineRes[0]?.downTimeReasons?.map(
            (item: any) => item.downtimeCategoryReasonId
          )
        );
        form.setFieldValue(
          'lineId',
          editMachineRes[0]?.machineShopLine?.lineId
        );
        form.setFieldValue(
          'asstManagerId',
          editMachineRes[0]?.asstManager?.asstManagerId
        );
        form.setFieldValue(
          'supervisorGroupId',
          Number(editMachineRes[0]?.supervisorGroup?.supervisorGroupId)
        );

        form.setFieldValue(
          'machineMainCategoryId',
          editMachineRes[0]?.machineMainCategory?.machineMainCategoryId
        );
        form.setFieldValue(
          'workCenterTypeId',
          editMachineRes[0]?.workCenterType?.workCenterTypeId
        );
        form.setFieldValue('palletId', editMachineRes[0]?.pallet?.palletId);
        form.setFieldsValue(editMachineRes[0]);
      } else {
        // Handle the case where apiStatus is false
        // You can set some error state here if needed
      }
    } catch (error) {
      // Handle the error
      // You can set some error state here if needed
    } finally {
    }
    // Perform your edit actions here
  };
  return (
    <div>
      <CommonHeader
        addBtnTitle="Add Work Center"
        exportUrl={service.API_URL.manageworkcenter.export}
      />
      <ImportFile
        importUrl={service?.API_URL?.manageworkcenter.import}
        fetchUrl={service?.API_URL?.manageworkcenter.listing}
      />

      <CommonForm
        open={openAddModal}
        mdlTitle={workCenterId ? 'Edit Work Center' : 'Add Work Center'}
        btnSubmit="Save"
        form={form}
        onFinish={onFinish}
        body={
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <CommonInput
                openAddModal={openAddModal}
                required={true}
                id={workCenterId}
                // value={form.getFieldValue('unitId')}
                unit
                unitId={unitId}
                machineShopId={machineShopId}
                machineShop
                machineShopLine
                setUnitId={setUnitId}
                setAssistantManager={setAssistantManager}
              />
              <InputBox
                label="Work Center Name"
                name="workCenterName"
                required={true}
                inputPlaceholder="Work Center Name"
                validateAsNumber={false}
                validateAsString={false}
                max={20}
              />
              <InputBox
                label="Work Center Description"
                name="description"
                required={true}
                inputPlaceholder="Work Center Description"
                validateAsNumber={false}
                validateAsString={false}
                max={50}
              />

              <SelectBox
                label="Asst Manager"
                name="asstManagerId"
                keyField="empId"
                valueField="firstName"
                mode={false}
                required={true}
                selectOptions={assistantManager || []}
                disabled={!assistantManager?.length}
                selectPlaceholder="Select Asst Manager"
              />
              <SelectBox
                label="Supervisor Group"
                name="supervisorGroupId"
                keyField="supervisorGroupId"
                valueField="supervisorGroupName"
                mode={false}
                required={true}
                selectOptions={listData.supervisorGroup}
                selectPlaceholder="Select Supervisor"
              />
              <SelectBox
                label="Machine Main Category"
                name="machineMainCategoryId"
                keyField="machineMainCategoryId"
                valueField="mainCategory"
                mode={false}
                required={true}
                selectOptions={mainCategory}
                disabled={!mainCategory?.length}

                selectPlaceholder="Select Main Category"
              />
              <SelectBox
                label="Work Center Type"
                name="workCenterTypeId"
                keyField="workCenterTypeId"
                valueField="workCenterTypeName"
                mode={false}
                required={true}
                selectOptions={listData.workCenterType}
                selectPlaceholder="Select Work Center"
              />
              <Form.Item
                label="Cell Eligible"
                name="cellEligible"
                className="form-item"
                rules={[{ required: false }]}
              >
                <Radio.Group name='cellEligible' defaultValue={true}>
                  <Radio value={true}>Yes</Radio>
                  <Radio value={false}>No</Radio>
                </Radio.Group>
              </Form.Item>

              <SelectBox
                label="Pallet Name"
                name="palletId"
                keyField="palletId"
                valueField="palletName"
                mode={false}
                required={true}
                selectOptions={listData.palletd}
                selectPlaceholder="Select Pallet"
              />
              <SelectBox
                label="Shifts"
                name="shiftIds"
                keyField="shiftId"
                valueField="shiftName"
                mode={true}
                required={true}
                selectOptions={shiftData}
                selectPlaceholder="Select Shifts"
              />
              <Form.Item
                label="Consider for Operational Review"
                name="considerOperationReview"
                className="form-item"
                rules={[{ required: false }]}
              >
                <Radio.Group name="considerOperationReview" defaultValue={true}>
                  <Radio value={true}>Yes</Radio>
                  <Radio value={false}>No</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                label="Quality Checker"
                name="qualityChecker"
                className="form-item"
                rules={[{ required: false }]}
              >
                <Radio.Group name="qualityChecker" defaultValue={true} >
                  <Radio value={true}>Yes</Radio>
                  <Radio value={false}>No</Radio>
                </Radio.Group>
              </Form.Item>

              <SelectBox
                label="Customer"
                name="customerIds"
                keyField="shiftId"
                valueField="shiftName"
                mode={true}
                required={false}
                selectOptions={[]}
                selectPlaceholder="Select Customer"
              />
              <InputBox
                label="Cycle Time Splitter % (Machine shop + Future Planning) CAUTION"
                name="caution"
                required={false}
                inputPlaceholder="Work Center Description"
                validateAsNumber={false}
                validateAsString={false}
              />
              <InputBox
                label="Cycle Time Splitter % (Future Planning Simulator) CAUTION"
                name="cycleTimeSplitterSimulator"
                required={false}
                inputPlaceholder="Cycle Time Splitter % (Future Planning Simulator) CAUTION"
                validateAsNumber={false}
                validateAsString={false}
              />
              <CommonSwitch
                label="Status"
                name="status"
                checkedChildren="Active"
                unCheckedChildren="InActive"
              />
              <div></div>
            </div>
        }
      />
      <div className="block-main__filter border-y-[1px] border-border py-4">
        <Collapse items={filterItems} className="block-dropdown block-filter" />
      </div>
      <TableComponent columns={columns} data={filterData} />
    </div>
  );
};

export default WorkCenter;
