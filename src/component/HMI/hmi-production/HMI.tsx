'use client';

import React, { useState, useEffect } from 'react';
import { Button, Form, Tabs, TabsProps } from 'antd';
import { SubmitHandler } from 'react-hook-form';

import service from '@/utils/service/service';
import SelectBox from '@/component/selectbox/selectbox';
import CommonHeader from '@/component/commonHeader/CommonHeader';
import { CurrentDate, getCurrentMonthDates } from '@/utils/functions/commonFunction';
import useFetchData from '@/utils/useFetchData/customFetchData';
import {
  loadIcon,
  reloadIcon,
  scanIcon,
  searchIcon,
  stopIcon,
  viewIcon,
} from '@/utils/icons/icons';

import Production from './Production';
import { useDispatch } from 'react-redux';
import { clearAll, reduxSliceData } from '@/utils/redux/features/reduxData';
import ViewHMI from './ViewHMI/ViewHMI';
import Downtime from './Downtime/Downtime';
import HMIFetch from '@/utils/useFetchData/HMIFetch';

const HMIProduction = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [workcenterArray, setWorkcenterArray] = useState([]);
  const [machinePartData, setMachinePartData] = useState<any>([])
  const { listData, getListData, getQueryFetch }: any = useFetchData();
  const { addData }: any = HMIFetch();
  const [hmiDowntimeData, setHmiDowntimeData] = useState<any>([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [activeTab, setActiveTab] = useState<any>('1');


  const handleChangeTab = (key: string) => {
    setActiveTab(key);
  };
  const modalListing = async () => {

    const apiUrls = {
      unitList: service?.API_URL?.unitList?.listing,
    };
    const enable = true;
    await getListData(apiUrls, enable);
  };

  const handleMultiSelectChange = async (selectedValues: any) => {
    const queryParams = { unitId: selectedValues };
    const workCenterRes: any = await getQueryFetch(
      queryParams,
      service?.API_URL?.manageworkcenter?.listing
    );
    setWorkcenterArray(workCenterRes || []);
  };

  useEffect(() => {
    modalListing();
   
    dispatch(clearAll()) //not remove
    // dispatch(reduxSliceData({ key: 'isStartOparation', data: [] }));
    // dispatch(reduxSliceData({ key: 'workCenterDowntimes', data: [] }));
    // dispatch(reduxSliceData({ key: 'downtimeData', data: [] }));
    // dispatch(reduxSliceData({key: 'startOparation', data: false}));
    // dispatch(reduxSliceData({key: 'activeOperation', data: []}));
    // dispatch(reduxSliceData({key: 'machinePartData', data: []}));

    
    

  }, []);

  useEffect(() => {
    tabChange()
  }, [activeTab,hmiDowntimeData])

  const tabChange = async () => {
    const queryParams = {
      workCenterId: hmiDowntimeData?.workCenterId,
      unitId: hmiDowntimeData.unitId,
    }

    const apiUrl = service?.API_URL?.hmi?.downtimes
    if (activeTab == '2') {
      const downtimeData = await getQueryFetch(queryParams, apiUrl);
      dispatch(reduxSliceData({ key: 'downtimeData', data: downtimeData }))

    } else if (hmiDowntimeData?.workCenterId && activeTab == '1'){
      const { startDate, endDate } = getCurrentMonthDates();
      const body = {
        startDate: null,
        endDate: endDate,
        workCenterId: hmiDowntimeData?.workCenterId,

      };
      const machinePartDataGet = await addData(body, service?.API_URL?.hmi?.listing);

      if (machinePartDataGet) {
        setMachinePartData(machinePartDataGet?.apiData?.hmiProductionOrders)
        dispatch(reduxSliceData({ key: 'machinepart', data: machinePartDataGet?.apiData?.hmiProductionOrders }))
        dispatch(reduxSliceData({ key: 'workCenterDowntimes', data: machinePartDataGet?.apiData?.workCenterDowntimes }))
        dispatch(reduxSliceData({ key: 'workCenterId', data: hmiDowntimeData?.workCenterId }));
        dispatch(reduxSliceData({ key: 'activeOperation', data: machinePartDataGet?.apiData?.activeOperation}));
       
      }
    }
  }
  const onFinish: SubmitHandler<FormData> = async (data: any) => {
    setHmiDowntimeData(data)
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Production',
      children: <Production />,
    },
    {
      key: '2',
      label: 'Downtime',
      children: <Downtime />,
    },
    {
      key: '3',
      label: 'OEE',
      // children: <Production />
    },
    {
      key: '4',
      label: 'Operator Corner',
      children: 'dataaa 22333',
    },
  ];

  const showModal = () => {
    setIsModalVisible(true)
  }


  return (
    <div className="block-hmi-ctnt">
      <div className="w-full resulted-data-table">
        <CommonHeader breadCum="HMI" />
        <div className="block-top-meterial flex">
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className="flex"
          >
            <SelectBox
              label=""
              name="unitId"
              keyField="unitId"
              valueField="unitName"
              mode={false}
              required
              selectOptions={listData?.unitList}
              selectPlaceholder="Select Unit"
              handleMultiSelectChange={(value: any) =>
                handleMultiSelectChange(value)
              }
            />
            <SelectBox
              label=""
              name="workCenterId"
              keyField="workCenterId"
              valueField="workCenterName"
              mode={false}
              required
              selectOptions={workcenterArray}
              selectPlaceholder="Work Center"
              disabled={!(workcenterArray?.length > 0)}
            />
            <Button type="primary" htmlType="submit" className="btn-main">
              {searchIcon} Search
            </Button>

            <div className='right-meterial-btn flex'>
              <Button
                className="btn-outline"
                onClick={showModal}
                disabled={machinePartData?.length > 0 ? false : true}
              >
                {viewIcon}View HMI
              </Button>
            </div>

          </Form>

          <div className="block-right-meterial">
            <div className="right-meterial-part flex">
              <p>
                Make:<strong>Rail Mounting Plate</strong>{' '}
              </p>
              <p>
                Model:<strong>D8320110200</strong>{' '}
              </p>
              <p>
                Machine Sr. No.:<strong>#20394722</strong>{' '}
              </p>
            </div>
            <div className="right-meterial-btn flex">
              <Button className="btn-outline">{scanIcon}Scan</Button>
              <Button className="btn-outline">{reloadIcon}Reload</Button>
              <Button className="btn-outline">{searchIcon}Search</Button>
              <Button className="btn-outline" style={{ color: '#F04438' }}>
                {stopIcon}STOP
              </Button>
            </div>

          </div>
        </div>
        {
          // machinePartData.length>0 && <>
          <Tabs defaultActiveKey="1" items={items} onChange={handleChangeTab} />
          // </>
        }
        <ViewHMI
          title='HMI'
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          body={<>
            <div className="block-hmi-ctnt">
              <div className="w-full resulted-data-table">
                <Tabs defaultActiveKey="1" items={items} /></div></div></>}
        />
      </div>
    </div>
  );
};

export default HMIProduction;
