'use client'
import React, { useState, useRef, useEffect } from 'react'
import CommonForm from '@/app/layout/commonForm/commonForm'
import Filter from '@/app/layout/filter/filter'
import CommonHeader from '@/component/commonHeader/CommonHeader'
import TableComponent from '@/component/tableComponent/TableComponent'
import {Collapse, Form ,Table } from 'antd'
import service from '@/utils/service/service'
import useFetchData from '@/utils/useFetchData/customFetchData'
import { useDispatch, useSelector } from 'react-redux'
import { SubmitHandler } from 'react-hook-form'
import { openModal } from '@/utils/redux/features/reduxData'
import MachinePartAddMore from './MachinePartAddMore'
import { convertNumericStringsToNumbers, transformData, transformedData } from '@/utils/functions/commonFunction'
import ImportFile from '@/component/fileUpload/ImportFile'
import { FilterCommanFunction } from '@/utils/useFetchData/FilterCommanFunction'
import { filterOptiondata } from '@/utils/useFetchData/FilterOptionData'
import column from './Columns'

const MachineParts = () => {
  const [form] = Form.useForm()
  const openAddModal = useSelector((state: any) => state.isModalOpen)
  const filterData = useSelector((state: any) => state.filterData)
  const dispatch = useDispatch()
  const [partId, setPartId] = useState('')
  const [oprationWorkCenter, setOprationWorkCenter] = useState([])
  const [fileList, setFileList] = useState([]);
  const {
    addData,
    updateData,
    getItemById,
    deleteItem
  }: any = useFetchData(service?.API_URL?.machineparts.listing)

  const filterItems = [
    {
      key: '1',
      label: 'Filter',
      children: (
        <Filter
          data={FilterCommanFunction(filterOptiondata.machinePartsFilter[0])}
          url={service?.API_URL?.machineparts?.listing}
        />
      ),
    },
  ]

  const onFinish: SubmitHandler<FormData> = async (data: any) => {
    convertNumericStringsToNumbers(data);
    const output = transformData(data);
 
    const body = {
      ...output[0],
      partId: partId ? partId : 0,
      activePartForCurrentQuarter: true,
      activeForPlan: true,
      status: data?.status === 0 ? false : true,
      // partOperations: dataToPost,
      partIntermediateProcesses: [],
      partPreProcesses:[]
    };


    if (partId) {
     let updateDataRes = await updateData(body,service?.API_URL?.machineparts.update)
      if(updateDataRes?.apiStatus)
      {
        setPartId('')
        form.resetFields();
      }

    } else {
      let addDataRes =  await addData(body,service?.API_URL?.machineparts.add)
      if (addDataRes?.apiStatus) 
      {
        form.resetFields();
      }
    }
  }

  const handleEdit = async (id: any) => {
    try {
      setPartId(id)
      const editPartRes = await getItemById(id, service.API_URL.machineparts.listing);
      if (editPartRes) {
        dispatch(openModal())

        form.setFieldsValue(editPartRes)
      } else {
        console.error('API call was not successful:', editPartRes)
      }
    } catch (error) {

    } finally {
    }
  }

  useEffect(() => {
    form.setFieldsValue({
      partOperations: [
        {
           operationNo:10,
          partOperationWorkCenters: [{}]
        }
      ],
      partPreProcesses: [{}],
      partIntermediateProcesses: [{}]
    });
  }, [form]);
  


  const handleConfirmDelete = async (id: any) => {
    if (id) {
      await deleteItem(id)
    }
  }

  const columns = column.Columns({handleEdit,handleConfirmDelete});

  useEffect(() => {
    if (!openAddModal) {
      setPartId('');
    }
    
  }, [openAddModal])

  const [expandedRowKey, setExpandedRowKey] = useState(null);

  const handleExpand = async (expanded: any, record: any) => {
    setExpandedRowKey(expanded ? record.key : null);
    const editMachineRes = await getItemById(record.partId, service.API_URL.machineparts.expand);
    if (editMachineRes) {
      setOprationWorkCenter(editMachineRes || []);

    }
    else {
      setOprationWorkCenter([]);
    }
  };

  const expandedRowRender = (record: any) => {
    const rowClassName = (record: any) => {
      return record.selectionOrder>1 ? 'even-row' : 'odd-row'; // Example condition
    };
    return <Table 
     columns={column.expandedRowColumns()} 
     dataSource={oprationWorkCenter} 
     pagination={false} 
     rowClassName={rowClassName}
     />;
  };
 
  return (
    <div>
      <CommonHeader addBtnTitle="Add Machine Part" exportUrl={service.API_URL.machineparts.export}/>
      <ImportFile importUrl={service?.API_URL?.machineparts.import} fetchUrl={service?.API_URL?.machineparts.listing} />
      <CommonForm
        open={openAddModal}
        mdlTitle={partId ? 'Edit Machine Part' : 'Add Machine Part'}
        btnSubmit="Save"
        form={form}
        width="1200"
        onFinish={onFinish}
        initialValues={{
          partOperations: [{ partOperationWorkCenters: [{}] }], partPreProcesses: [{}], partIntermediateProcesses: [{}]
        }}
        body={
          <>
            <div className="main-operation-part">
              <MachinePartAddMore partId={partId} setFileList={setFileList} form={form} />
            </div>
          </>
        }
      />
      <div className="block-main__filter border-y-[1px] border-border py-4">
        <Collapse items={filterItems} className="block-dropdown block-filter" />
      </div>

       {/* <ShedulingChart /> */}

      <TableComponent
        columns={columns}
        data={transformedData(filterData)}
        expandable={{
          expandedRowRender,
          expandedRowKeys: expandedRowKey ? [expandedRowKey] : [],
          onExpand: handleExpand,
        }}
      />

      {/* <Scheduler /> */}

      {/* <TableAddMore /> */}
    </div>
  )
}

export default MachineParts
