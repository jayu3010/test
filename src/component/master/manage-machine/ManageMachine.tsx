'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button, Collapse, Form, Popconfirm, Flex, Switch } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { SubmitHandler } from 'react-hook-form';
import dayjs from 'dayjs';

import CommonForm from '@/app/layout/commonForm/commonForm';
import Filter from '@/app/layout/filter/filter';
import CommonHeader from '@/component/commonHeader/CommonHeader';
import TableComponent from '@/component/tableComponent/TableComponent';
import { dltIcon, editIcon, timeIcon } from '@/utils/icons/icons';
import service from '@/utils/service/service';
import useFetchData from '@/utils/useFetchData/customFetchData';
import SelectBox from '@/component/selectbox/selectbox';
import { openModal } from '@/utils/redux/features/reduxData';
import InputBox from '@/component/input/Input';
import CommonInput from '@/component/commonInput/commonInput';
import Datepicker from '@/component/commondatepicker/datepicker';
import CommonSwitch from '@/component/commonSwitch/CommonSwitch';
import { FilterCommanFunction } from '@/utils/useFetchData/FilterCommanFunction';
import { filterOptiondata } from '@/utils/useFetchData/FilterOptionData';
import {
  commonSorter,
  showFormattedDate,
} from '@/utils/functions/commonFunction';
import SwitchComponent from '@/app/layout/switchComponent/SwitchComponent';
import ImportFile from '@/component/fileUpload/ImportFile';
import DeleteModal from '@/app/layout/deleteModal/DeleteModal';

const ManageMachine = () => {
  const dispatch = useDispatch();
  const openAddModal = useSelector((state: any) => state.isModalOpen);
  const filterData = useSelector((state: any) => state.filterData);
  const [assistantManager, setAssistantManager] = useState([]);
  const [commanData, setCommanData] = useState({
    MachineShop: [],
    Unit: [],
    Pallet: [],
    MachineShopLine: [],
    MachineMainCategory: [],
    MachineModel: [],
    MachineSubCategory: [],
    MachineController: [],
    MachineMakes: [],
  });

  const {
    addData,
    updateData,
    
    commonAPI,
    getQueryFetch,
    getListData,
    listData,
  } = useFetchData(service?.API_URL?.manageMachine.listing);
  const [machineId, setMachineId] = useState('');
  const [unitId, setUnitId] = useState();
  const [mainCategoryId, setMainCategoryId] = useState();

  const [mainCategoryData, setMainCategory] = useState([]);
  const [subcateData, setSubcateData] = useState([]);
  const [workCenter, setWorkCenter] = useState([]);

  const [form] = Form.useForm();

  const filterItems = [
    {
      key: '1',
      label: 'Filter',
      children: (
        <Filter
          data={FilterCommanFunction(filterOptiondata.manageMachine[0])}
          url={service?.API_URL?.manageMachine?.listing}
          exportUrl={service?.API_URL?.manageMachine?.export}
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
      title: 'Work Center',
      dataIndex: 'workCenterName',
      sorter: {
        compare: commonSorter('workCenterName'),
        multiple: 3,
      },
    },
    {
      title: 'Machine Modal',
      dataIndex: 'modelName',
      sorter: {
        compare: commonSorter('modelName'),
        multiple: 3,
      },
    },
    {
      title: 'Machine Make',
      dataIndex: 'machineMake',
      sorter: {
        compare: commonSorter('machineMake'),
        multiple: 3,
      },
    },
    {
      title: 'Machine Code',
      dataIndex: 'machineCode',
      sorter: {
        compare: commonSorter('machineCode'),
        multiple: 3,
      },
    },
    {
      title: 'Pallet Count',
      dataIndex: 'palletCount',
      sorter: {
        compare: commonSorter('palletCount'),
        multiple: 3,
      },
    },
    {
      title: 'Machine Sr. No.',
      dataIndex: 'machineSrNo',
      sorter: {
        compare: commonSorter('machineSrNo'),
        multiple: 3,
      },
    },
    {
      title: 'Installation Date',
      dataIndex: 'installationDate',
      sorter: {
        compare: commonSorter('installationDate'),
        multiple: 3,
      },
      render: (_, record: any) => (
        <>{showFormattedDate(record?.installationDate)}</>
      ),
      className: 'common-width',
    },
    {
      title: 'Controller-Software Ver.',
      dataIndex: 'controllerVer',
      sorter: {
        compare: commonSorter('controllerVer'),

        multiple: 3,
      },
    },
    {
      title: 'Warranty Status',
      dataIndex: 'warrantyStatus',
      sorter: {
        compare: commonSorter('warrantyStatus'),

        multiple: 3,
      },
      render: (_, record: any) => (
        <Form.Item name="warrantyStatus" className="form-item">
          <Switch checked={record.warrantyStatus} />
        </Form.Item>
      ),
    },
    {
      title: 'Start Date',
      dataIndex: 'machineStartDate',
      sorter: {
        compare: commonSorter('machineStartDate'),

        multiple: 3,
      },
      render: (_, record: any) => (
        <>{showFormattedDate(record?.machineStartDate)}</>
      ),
      className: 'common-width',
    },
    {
      title: 'End Date',
      dataIndex: 'machineEndDate',
      sorter: {
        compare: commonSorter('machineEndDate'),

        multiple: 3,
      },
      render: (_, record: any) => (
        <>{showFormattedDate(record?.machineEndDate)}</>
      ),
      className: 'common-width',
    },
    {
      title: 'Remarks',
      dataIndex: 'remarks',
      sorter: {
        compare: commonSorter('remarks'),

        multiple: 3,
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_: any, record: any) => (
        <SwitchComponent
          masterName="Machines"
          idName="machineId"
          idValue={record.machineId}
          status={record.status}
          url={service?.API_URL?.machine?.listing}
        />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      width: 150,
      render: (_, record: any) => (
        <Flex gap={15} className="action-icon">
          <Button
            onClick={() => handleEdit(record.machineId)}
            className="btn-outline"
          >
            {editIcon}
          </Button>
          <Button className="btn-outline">{timeIcon}</Button>
          <DeleteModal id={record.machineId} deleteUrl={service?.API_URL?.machine?.listing} />
        </Flex>
      ),
    },
  ];

  const onFinish: SubmitHandler<FormData> = async (data: any) => {
    delete data.unitname;
    const body = {
      ...data,
      machineId: machineId || 0,
      installationDate: data.installationDate
        ? data.installationDate.format('YYYY-MM-DD')
        : '',
      machineStartDate: data.machineStartDate
        ? data.machineStartDate.format('YYYY-MM-DD')
        : '',
      machineEndDate: data.machineEndDate
        ? data.machineEndDate.format('YYYY-MM-DD')
        : '',
      billDate: data.billDate ? data.billDate.format('YYYY-MM-DD') : '',
      warrantyEndDate: data.warrantyEndDate
        ? data.warrantyEndDate.format('YYYY-MM-DD')
        : '',
      isDelete: false,
    };

    if (machineId) {
      console.log('updateDataRes', body);
      const updateDataRes = await updateData(
        body,
        service?.API_URL?.machine.update
      );

      if (updateDataRes?.apiStatus) {
        setMachineId('');
        form.resetFields();
      }
    } else {
      const addDataRes = await addData(body, service?.API_URL?.machine.add);
      if (addDataRes?.apiStatus) {
        form.resetFields();
      }
    }
  };

  const handleEdit = async (id: any) => {
    try {
      setMachineId(id);
      const queryParams = { machineId: id };
      const editMachineRes = await getQueryFetch(
        queryParams,
        service.API_URL.machine.listing
      );

      if (editMachineRes[0]) {
        if (editMachineRes[0]) {
          setUnitId(editMachineRes[0]?.unitId);
          setMainCategoryId(editMachineRes[0]?.machineMainCategoryId);

          const formattedRes = {
            ...editMachineRes[0],
            installationDate: editMachineRes[0].installationDate
              ? dayjs(editMachineRes[0].installationDate, 'YYYY-MM-DD')
              : null,
            machineStartDate: editMachineRes[0].machineStartDate
              ? dayjs(editMachineRes[0].machineStartDate, 'YYYY-MM-DD')
              : null,
            machineEndDate: editMachineRes[0].machineEndDate
              ? dayjs(editMachineRes[0].machineEndDate, 'YYYY-MM-DD')
              : null,
            warrantyEndDate: editMachineRes[0].warrantyEndDate
              ? dayjs(editMachineRes[0].warrantyEndDate, 'YYYY-MM-DD')
              : null,
            billDate: editMachineRes[0].billDate
              ? dayjs(editMachineRes[0].billDate, 'YYYY-MM-DD')
              : null,
          };
          form.setFieldValue('machineId', editMachineRes[0].machineId);
          // form.setFieldValue("machineMainCategoryId", editMachineRes[0].machineMainCategoryId)
          // form.setFieldValue("modelId", editMachineRes[0].modelName)
          // form.setFieldValue("machineSubCategoryId", editMachineRes[0].machineSubCategoryId);

          form.setFieldsValue(formattedRes);
        }

        dispatch(openModal());
      } else {
        console.error('API call was not successful:', editMachineRes);
      }
    } catch (error) {}
  };

  const modalListing = async () => {
    try {
      const body = ['MachineModel'];
      const apiUrls = {
        unitList: service?.API_URL?.machineShop?.listing,
        // workCenter: service?.API_URL?.manageworkcenter?.listing,
        pallet: service?.API_URL?.palletMaster?.listing,
        mainCategory: service?.API_URL?.maincategories?.listing,
        subCategory: service?.API_URL?.managesubcategory?.listing,
        controller: service?.API_URL?.controllerMaster?.listing,
        machineMake: service?.API_URL?.machineMake?.listing,
      };
      await getListData(apiUrls);
      setCommanData(await commonAPI(body, service?.API_URL?.common?.listing));
    } catch (error) {
      console.error('Error fetching common data:', error);
    }
  };

  useEffect(() => {
    if (openAddModal) {
      modalListing();
    } else {
      setMachineId('');
    }
  }, [openAddModal]);

  const handleChangeUnit = async (id: any) => {
    const queryParams = { unitId: id };
    const unitbyBreakData: any = await getQueryFetch(
      queryParams,
      service.API_URL.maincategories.listing
    );
    if (unitbyBreakData?.length > 0) {
      setMainCategory(unitbyBreakData);
    }
    const queryParam = { unitId: id };
    const UnitWiseWorkCenter: any = await getQueryFetch(
      queryParam,
      service.API_URL.manageworkcenter.listing
    );
    setWorkCenter(UnitWiseWorkCenter?.length > 0 ? UnitWiseWorkCenter : []);
  };

  const handleChangeMainCat = async (id: any) => {
    const queryParams = { machineMainCategoryId: id };
    const unitbyBreakData: any = await getQueryFetch(
      queryParams,
      service.API_URL.managesubcategory.listing
    );
    if (unitbyBreakData?.length > 0) {
      setSubcateData(unitbyBreakData);
    }
  };
  useEffect(() => {
    if (unitId) {
      handleChangeUnit(unitId);
      handleChangeMainCat(mainCategoryId);
    }
  }, [unitId, mainCategoryId]);

  let machineData: any = [];
  let controllerBrand: any = [];

  if (openAddModal) {
    machineData =
      commanData.MachineModel?.map((item: any) => ({
        modelId: Number(item?.value),
        modelName: item?.text.replace(/[\r\t]/g, '').trim(),
      })) || [];

    controllerBrand =
      listData?.controller?.map((item: any) => ({
        controllerBrand: Number(item?.controllerId),
        controllerName: item?.controllerName,
      })) || [];
  }

  return (
    <div>
      <CommonHeader
        addBtnTitle="Add Machine"
        exportUrl={service?.API_URL?.manageMachine.export}
      />
      <ImportFile
        importUrl={service?.API_URL?.manageMachine.import}
        fetchUrl={service?.API_URL?.manageMachine.listing}
      />
      <CommonForm
        open={openAddModal}
        mdlTitle={machineId ? 'Edit Machine' : 'Add Machine'}
        btnSubmit="Save"
        form={form}
        onFinish={onFinish}
        body={
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <InputBox
              label="Machine Sr. No."
              name="machineSrNo"
              required
              inputPlaceholder="Machine Sr. No."
              validateAsNumber={false}
              validateAsString={false}
            />
            <InputBox
              label="Machine Code"
              name="machineCode"
              required
              inputPlaceholder="Machine Code"
              validateAsNumber={false}
              validateAsString={false}
              max={50}
            />

            <CommonInput
              openAddModal={openAddModal}
              required
              id={machineId}
              // unitId={form.getFieldValue('unitId')}
              machineShopId={form.getFieldValue('machineShopId')}
              unit
              machineShop
              machineShopLine
              setUnitId={setUnitId}
              setAssistantManager={setAssistantManager}
            />

            <SelectBox
              label="Work Center"
              name="workCenterId"
              keyField="workCenterId"
              valueField="workCenterName"
              mode={false}
              required
              selectOptions={workCenter}
              selectPlaceholder="Work Center"
              disabled={!(workCenter.length > 0)}
            />

            <SelectBox
              label="Machine Main Category "
              name="machineMainCategoryId"
              keyField="machineMainCategoryId"
              valueField="mainCategory"
              mode={false}
              required
              disabled={!(mainCategoryData?.length > 0)}
              handleMultiSelectChange={(value: any) =>
                handleChangeMainCat(value)
              }
              selectOptions={mainCategoryData}
              selectPlaceholder="Machine Main Category"
            />

            <SelectBox
              label="Machine Sub Category"
              name="machineSubCategoryId"
              keyField="machineSubCategoryId"
              // selectDefaultValue={'HMC'}
              valueField="subCategory"
              mode={false}
              required
              selectOptions={subcateData}
              disabled={!(subcateData?.length > 0)}
              selectPlaceholder="Machine Sub Category"
            />

            <SelectBox
              label="Machine Make"
              name="makeId"
              keyField="machineMakeId"
              valueField="machineMake"
              mode={false}
              required
              selectOptions={listData?.machineMake}
              selectPlaceholder="Machine Make"
            />

            <SelectBox
              label="Machine Modal"
              name="modelId"
              keyField="modelId"
              valueField="modelName"
              mode={false}
              required
              selectOptions={machineData}
              selectPlaceholder="Machine Modal"
            />

            <Datepicker
              label="Bill Date"
              name="billDate"
              required={false}
              showTime={false}
              format="DD-MMM-YYYY"
              placeholder="Select date"
            />

            <Datepicker
              label="Installation Date"
              name="installationDate"
              required
              showTime={false}
              format="DD-MMM-YYYY"
              placeholder="Select Date"
            />

            <Datepicker
              label="Start Date"
              name="machineStartDate"
              required={false}
              showTime={false}
              format="DD-MMM-YYYY"
              placeholder="Select Date"
            />

            <Datepicker
              label="End date."
              name="machineEndDate"
              required={false}
              showTime={false}
              format="DD-MMM-YYYY"
              placeholder="Select date"
            />

            <Datepicker
              label="Warranty End Date"
              name="warrantyEndDate"
              required
              showTime={false}
              format="DD-MMM-YYYY"
              placeholder="Select date"
            />

            <InputBox
              label="AMC (only after U/W)"
              name="amc"
              required={false}
              inputPlaceholder="AMC (only after U/W)"
              validateAsNumber={false}
              validateAsString={false}
              max={50}
            />

            <SelectBox
              label=" Controller Brand "
              name="controllerBrand"
              keyField="controllerBrand"
              valueField="controllerName"
              mode={false}
              required
              selectOptions={controllerBrand}
              selectPlaceholder="Machine Modal"
            />

            <InputBox
              label="Controller Software Version"
              name="controllerVer"
              required={false}
              inputPlaceholder="Controller Software Version"
              validateAsNumber={false}
              validateAsString={false}
              max={30}
            />

            <InputBox
              label="Hourly Cost"
              name="hourlyCost"
              required
              inputPlaceholder="Hourly Cost"
              validateAsNumber
            />

            <InputBox
              label="Remark"
              name="remarks"
              required
              inputPlaceholder="Remark"
              validateAsNumber={false}
              validateAsString={false}
            />

            <div className="grid grid-cols-3">
              <CommonSwitch
                label="Warranty Status"
                name="warrantyStatus"
                checkedChildren="Warranty On"
                unCheckedChildren="Warranty Off"
              />

              <CommonSwitch
                label="Insured"
                name="insured"
                checkedChildren="Insured On"
                unCheckedChildren="Insured Off"
              />

              <CommonSwitch
                label="Status"
                name="status"
                checkedChildren="Active"
                unCheckedChildren="InActive"
              />
            </div>
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

export default ManageMachine;
