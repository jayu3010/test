'use client'

import React, { useState, useRef, useEffect, useMemo } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import CommonForm from '@/app/layout/commonForm/commonForm'
import Filter from '@/app/layout/filter/filter'
import CommonHeader from '@/component/commonHeader/CommonHeader'
import TableComponent from '@/component/tableComponent/TableComponent'
import './App.css'
import {
  Button,
  Collapse,
  Form,
  Popconfirm,
  Tag,
  Flex,
} from 'antd'
import service from '@/utils/service/service'
import useFetchData from '@/utils/useFetchData/customFetchData'
import { SubmitHandler } from 'react-hook-form'

import { openModal } from '@/utils/redux/features/reduxData';
import InputBox from '@/component/input/Input'

import { HTML5Backend } from 'react-dnd-html5-backend'

import { dltIcon, editIcon, timeIcon } from '@/utils/icons/icons'

import SelectBox from '@/component/selectbox/selectbox'
import MovableItem from './MovableItem'
import { DndProvider } from 'react-dnd'

import Column from './Column'

import CommonSwitch from '@/component/commonSwitch/CommonSwitch';
import { FilterCommanFunction } from '@/utils/useFetchData/FilterCommanFunction';
import { filterOptiondata } from '@/utils/useFetchData/FilterOptionData';
import { commonSorter } from '@/utils/functions/commonFunction';
import SwitchComponent from '@/app/layout/switchComponent/SwitchComponent';
import DeleteModal from '@/app/layout/deleteModal/DeleteModal'

const ManageCell = () => {
  const COLUMN_NAMES = {
    DO_IT: 'Doit',
    IN_PROGRESS: 'In Progress',
  };

  const openAddModal = useSelector((state: any) => state.isModalOpen);
  const filterData = useSelector((state: any) => state.filterData);

  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [cellId, setCellId] = useState('');
  const [deleteId, setDeleteId] = useState('');
  const [items, setItems] = useState<any>([]);
  const [workCenterId, setWorkCenterIds] = useState([]);
  const [multipleMoveItems, setMultipleMoveItems] = useState([]);
  const [comman, setCommanData] = useState({
    Unit: [],
    CellOwnerPlanner: [],
    WorkCenter: [],
  });

  const {
    addData,
    updateData,
    commonAPI,
    
    getQueryFetch,
    getListData,
    listData,
  } = useFetchData(service?.API_URL?.cell.listing);

  const modalListing = async () => {
    try {
      const body = ['Unit', 'CellOwnerPlanner', 'WorkCenter'];
      setCommanData(await commonAPI(body, service?.API_URL?.common?.listing));
    } catch (error) {}
  };

  useEffect(() => {
    if (openAddModal) {
      modalListing();
    } else {
      setItems([]);
      setCellId('');
    }
  }, [openAddModal]);


  const filterItems = [
    {
      key: '1',
      label: 'Filter',
      children: (
        <Filter
          data={FilterCommanFunction(filterOptiondata.manageCell[0])}
          url={service?.API_URL?.cell?.listing}
          exportUrl={service?.API_URL?.cell?.export}
        />
      ),
    },
  ];

  const columns = [
    {
      title: 'Unit Name',
      dataIndex: 'unitName',
      sorter: false,
      render: (_, record: any) => (
        <>
          {record?.workCenters?.map((unitItem: any, index: any) => {
            return (
              <Tag color="#f50" key={index}>
                {unitItem?.unitName}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Work Center',
      dataIndex: 'workCenters',
      sorter: false,
      render: (_, record: any) => (
        <>
          {record?.workCenters?.map((workCenterItem: any, index: any) => {
            return (
              <Tag color="#f50" key={index}>
                {workCenterItem?.workCenterName}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Cell Name',
      dataIndex: 'cellName',
      sorter: {
        compare: commonSorter('cellName'),
        multiple: 3,
      },
    },
    {
      title: 'Cell Owner',
      dataIndex: 'cellOwner',
      sorter: {
        compare: (a: any, b: any) =>
          a?.cellOwner?.cellOwnerName?.localeCompare(
            b?.cellOwner?.cellOwnerName
          ),
        multiple: 3,
      },
      render: (_: any, record: any) => (
        <>
          {record?.cellOwner && (
            <Tag color="#f50">{record?.cellOwner?.cellOwnerName}</Tag>
          )}
        </>
      ),
    },
    {
      title: 'Cell Planner',
      dataIndex: 'cellPlanner',
      sorter: {
        compare: (a: any, b: any) =>
          a?.cellPlanner?.cellPlannerName.localeCompare(
            b?.cellPlanner?.cellPlannerName
          ),
      },
      sortDirections: ['descend', 'ascend'],

      render: (_: any, record: any) => (
        <>
          {record?.cellPlanner && (
            <Tag color="#f40">{record?.cellPlanner?.cellPlannerName}</Tag>
          )}
        </>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_: any, record: any) => (
        <SwitchComponent
            masterName="Cells"
            idName="cellId"
            idValue={record.cellId}
            status={record.status}
            url={service?.API_URL?.cell?.listing}
          />
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: 150,
      fixed: 'right',
      render: (_: any, record: any) => (
        <Flex gap={15} className="action-icon">
            <Button
              onClick={() => handleEdit(record.cellId)}
              className="btn-outline"
            >
              {editIcon}
            </Button>
            <Button className="btn-outline">{timeIcon}</Button>
            <DeleteModal id={record.cellId} deleteUrl={service?.API_URL?.cell?.listing} />
          </Flex>
      ),
    },
  ];

  const onFinish: SubmitHandler<FormData> = async (data: any) => {
    const body = {
      cellId: cellId || 0,
      workCenterIds: workCenterId || [],
      ...data,
    };
    if (cellId) {
      await updateData(body, service?.API_URL?.cell.update);
      setCellId('');
    } else {
      await addData(body, service?.API_URL?.cell.add);
    }
  };

  const handleEdit = async (id: any) => {
    try {
      setCellId(id);
      const queryParams = { cellId: id };
      const apiUrl = service.API_URL.cell.listing;

      const editCellRes = await getQueryFetch(queryParams, apiUrl);

      if (editCellRes[0]) {
        const workCenterInfo =
          editCellRes[0].workCenters.length > 0
            ? editCellRes[0].workCenters?.map((item: any) => ({
                name: item?.workCenterName,
                id: item?.workCenterId,
                column: 'In Progress',
              }))
            : [];
        setItems(workCenterInfo);

        dispatch(openModal());
        form.setFieldsValue(editCellRes[0]);
        form.setFieldsValue({
          cellOwnerId: editCellRes[0].cellOwner.cellOwnerId,
        });
        form.setFieldsValue({
          cellPlannerId: editCellRes[0].cellPlanner.cellPlannerId,
        });
      } else {
      }
    } catch (error) {
      // Handle the error
      // You can set some error state here if needed
    } finally {
    }
    // Perform your edit actions here
  };


  const handleMultiSelectChange = async (selectedValues: any, action: any) => {
    const lastValue = selectedValues[selectedValues.length - 1]

    // setUnitIdArray(selectedValues)
    const queryParams = { unitId: lastValue };
    const apiUrl = service.API_URL.manageworkcenter.listing;
    const data = await getQueryFetch(queryParams, apiUrl);

    const dataArray = Array.isArray(data) ? data : [data];

    if (dataArray === null || dataArray.includes(null)) {
      setItems(items.filter((item: any) => item?.column !== 'Doit'));
    }

    if (dataArray.length > 0) {
      // Transform the array
      const workCenterInfo =
        dataArray.length > 0
          ? dataArray
              .filter((item) => item?.workCenterName && item?.workCenterId) // Filter out items with blank workCenterName or workCenterId
              .map((item) => ({
                name: item.workCenterName,
                id: item.workCenterId,
                column: 'Doit',
              }))
          : [];

      const uniqueWorkCenterInfo = workCenterInfo.filter(
        (newItem) =>
          !items.some((existingItem: any) => existingItem.id === newItem.id)
      );

      if (uniqueWorkCenterInfo.length > 0) {
        setItems((prevItems: any) => [...prevItems, ...uniqueWorkCenterInfo]);
      }
    } else {
      console.log('else', dataArray, items);
    }
  };

  const moveCardHandler = (dragIndex: any, hoverIndex: any, id: any) => {
    const dragItem = items[dragIndex];
    if (dragItem) {
      setItems((prevState: any) => {
        const updatedStateArray = [...prevState];

        // Swap the items at dragIndex and hoverIndex
        [updatedStateArray[dragIndex], updatedStateArray[hoverIndex]] = [
          updatedStateArray[hoverIndex],
          updatedStateArray[dragIndex],
        ];

        return updatedStateArray;
      });
    }
  };

  const handleDelete = (id: any) => {
    setItems((prevItems: any) =>
      prevItems.map((item: any) =>
        item.id === id && item.column === 'In Progress'
          ? { ...item, column: 'Doit' }
          : item
      )
    );
  };

  const handleMultipleMove = (id: any) => {
    setMultipleMoveItems((prevState: any) => {
      const updatedCheckedItems = { ...prevState };

      if (updatedCheckedItems[id]) {
        delete updatedCheckedItems[id]; // Remove unchecked item
      } else {
        updatedCheckedItems[id] = true; // Add checked item
      }
      return updatedCheckedItems;
    });
  };

  const filterOb1 = (ob1: any, a1: any) => {
    const inProgressIds = a1
      .filter((item: any) => item.column === 'In Progress')
      .map((item: any) => item.id.toString());
    // Create a new ob1 object excluding those ids
    const filteredOb1 = Object.keys(ob1)
      .filter((key: any) => !inProgressIds.includes(key))
      .reduce((acc: any, key: any) => {
        acc[key] = ob1[key];
        return acc;
      }, {});
    setMultipleMoveItems(filteredOb1);
  };

  useEffect(() => {
    const updatedArray = items.map((item: any) => {
      if (multipleMoveItems[item.id]) {
        return {
          ...item,
          column: 'In Progress',
        };
      }
      return item;
    });
    setItems(updatedArray);
    filterOb1(multipleMoveItems, items);
  }, [items.map((item: any) => item.column).join(',')]);

  const returnItemsForColumn: any = (columnName: any) => {
    const mappedItems = useMemo(() => {
      return items
        ?.filter((item: any) => item?.column === columnName)
        .map((item: any, index: any) => (
          <MovableItem
            key={item?.id}
            name={item?.name}
            currentColumnName={item?.column}
            setItems={setItems}
            index={index}
            moveCardHandler={moveCardHandler}
            handleDelete={() => handleDelete(item?.id)}
            handleMultipleMove={() => handleMultipleMove(item?.id)}
          />
        ));
    }, [columnName, items]);

    // return { mappedItems }
    return { mappedItems };
  };
  const { DO_IT, IN_PROGRESS } = COLUMN_NAMES;

  const commanListing = async () => {
    const apiUrls = {
      workCenter: service?.API_URL?.manageworkcenter?.listing,
      cellOwner: service?.API_URL?.employees?.listing,
    };
    await getListData(apiUrls);
  };

  useEffect(() => {
    commanListing();
  }, [openAddModal]);


  return (
    <div>
      <CommonHeader
        addBtnTitle="Add Cell"
        exportUrl={service.API_URL.cell.export}
      />
      <CommonForm
        open={openAddModal}
        mdlTitle={cellId ? 'Edit Cell' : 'Add Cell'}
        btnSubmit="Save"
        form={form}
        onFinish={onFinish}
        body={
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <InputBox
                label="Cell Name"
                name="cellName"
                required={true}
                inputPlaceholder="Cell Name"
                validateAsNumber={false}
                validateAsString={false}
                max={100}
              />
              <SelectBox
                label="Cell Owner"
                name="cellOwnerId"
                keyField="empId"
                valueField="firstName"
                mode={false}
                required={true}
                selectOptions={listData.cellOwner}
                selectPlaceholder="Cell Owner"
              />
              <SelectBox
                label="Cell Planner"
                name="cellPlannerId"
                keyField="empId"
                valueField="firstName"
                mode={false}
                required={true}
                selectOptions={listData.cellOwner}
                selectPlaceholder="Cell Planner"
              />

              <CommonSwitch
                label="Status"
                name="status"
                checkedChildren="Active"
                unCheckedChildren="InActive"
              />

              <SelectBox
                label="Unit Name"
                name="unitName"
                keyField="value"
                valueField="text"
                mode={true}
                required={false}
                selectOptions={comman.Unit}
                selectPlaceholder="Unit Name"
                handleMultiSelectChange={handleMultiSelectChange}
              />
              <div></div>
              <div className="">
                <div className="form-item">
                  <label htmlFor="inputText3" className="block text-gray-700 mb-2 mt-2">
                    Work Center
                  </label>
                </div>

                <DndProvider backend={HTML5Backend}>
                  <Column
                    title={DO_IT}
                    className="column do-it-column"
                    setWorkCenterIds={setWorkCenterIds}
                  >
                    {returnItemsForColumn(DO_IT)}
                  </Column>
                </DndProvider>
              </div>

              <div className="mt-7">
                <DndProvider backend={HTML5Backend}>
                  <Column
                    title={IN_PROGRESS}
                    className="column in-progress-column"
                    setWorkCenterIds={setWorkCenterIds}
                  >
                    {returnItemsForColumn(IN_PROGRESS)}
                  </Column>
                </DndProvider>
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

export default ManageCell;
