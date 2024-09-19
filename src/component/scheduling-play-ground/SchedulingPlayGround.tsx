'use client';

import { Button, Checkbox, Flex, Form, Table, Tabs } from 'antd';
import { TabsProps } from 'antd/lib';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import useFetchData from '@/utils/useFetchData/customFetchData';
import service from '@/utils/service/service';

const SchedulingPlayGround = () => {
  const filterData = useSelector((state: any) => state.filterData);
  const [selectedSchedulers, setSelectedSchedulers] = useState([]);
  const [selectedScheduler, setSelectedScheduler] = useState([]);

  const { getQueryFetch } = useFetchData(
    service?.API_URL?.batchTimeScheduling?.schedulers
  );
  const onFinish = async (values: any) => {
    const initializationIds = filterData
      .filter(
        (item) =>
          !item.optimizer &&
          values?.initializationVehicles?.includes(item.schedulerName)
      )
      .map((item) => item?.schedulerId);
    const params = new URLSearchParams();

    initializationIds.forEach((value) => {
      params.append(`schedulerIds`, value);
    });
    // const optimizerIds = filterData
    //   .filter(item => item.optimizer && values.optimizerVehicles.includes(item.schedulerName))
    //   .map(item => item.schedulerId);

    const schedulingPlaygroundData: any = await getQueryFetch(
      params,
      service.API_URL.schedulingPlayground.update
    );
    console.log(
      '🚀 ~ onFinish ~ schedulingPlaygroundData:',
      schedulingPlaygroundData
    );
  };

  const onChange = (key: string) => {};
  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ];

  const columns = [
    {
      title: 'Part Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'End Date and Time - Selected Algorithm',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'End Date and Time - Machine Utilization',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'End Date and Time - Best Fit',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'End Date and Time - Best Fit + Tolerance',
      dataIndex: 'address',
      key: 'address',
    },
  ];
  const workSourceWise = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ];

  const workcolumns = [
    {
      title: 'Work Center Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Utilization- Selected Algorithm',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Utilization - Machine Utilization',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Utilization - Best Fit',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Utilization - Best Fit + Tolerance',
      dataIndex: 'address',
      key: 'address',
    },
  ];
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Part Wise',
      children: <Table dataSource={dataSource} columns={columns} />,
    },
    {
      key: '2',
      label: 'Work Center Wise',
      children: <Table dataSource={workSourceWise} columns={workcolumns} />,
    },
  ];
  // Define conflicting pairs
  const conflicts = {
    'Highest Priority': 'Lowest Priority',
    'Lowest Priority': 'Highest Priority',
    'Shortest Processing Time': 'Longest Processing Time',
    'Longest Processing Time': 'Shortest Processing Time',
    'Least Operations': 'Most Operations',
    'Most Operations': 'Least Operations',
    'Least Setup Time': 'Most Setup Time',
    'Most Setup Time': 'Least Setup Time',
    'Lowest Quantity': 'Highest Quantity',
    'Highest Quantity': 'Lowest Quantity',
  };

  const handleCheckboxChange = (checkedValues) => {
    // Only allow one selection at a time
    const latestSelected =
      checkedValues.length > 0 ? [checkedValues[checkedValues.length - 1]] : [];
    setSelectedScheduler(latestSelected);
  };
  const handleIntitialzation = (checkedValues) => {
    setSelectedSchedulers(checkedValues);
  };

  const isDisabled = (schedulerName) => {
    // Check if the current checkbox should be disabled based on selected values
    return selectedSchedulers.some(
      (selectedName) => conflicts[selectedName] === schedulerName
    );
  };
  return (
    <Flex>
      <div className="w-1/3 pb-6 mt-9 schede-table">
        <div className="intitialzation scheduling-data">
          <h3 className="font-bold mb-5">Initialization</h3>
          <div>
            <Form
              name="checkboxForm"
              onFinish={onFinish}
              initialValues={{ vehicles: [] }}
            >
              <Form.Item
                name="initializationVehicles"
                valuePropName="checked"
                style={{ marginBottom: '16px' }}
              >
                <Checkbox.Group
                  value={selectedSchedulers}
                  onChange={handleIntitialzation}
                >
                  {filterData
                    .filter((item) => !item.optimizer) // Filter to include only items where optimizer is false
                    .map((item) => (
                      <Checkbox
                        key={item.schedulerId}
                        value={item.schedulerName}
                        className="w-full mb-2"
                        disabled={isDisabled(item.schedulerName)}
                      >
                        {item.schedulerName}
                      </Checkbox>
                    ))}
                </Checkbox.Group>
              </Form.Item>

              <div className="optimize scheduling-data">
                <h3 className="font-bold mb-5">Optimizer</h3>
                <Form.Item
                  name="optimizerVehicles"
                  valuePropName="checked"
                  style={{ marginBottom: '16px' }}
                >
                  <Checkbox.Group
                    value={selectedScheduler}
                    onChange={handleCheckboxChange}
                  >
                    {filterData
                      .filter((item) => item.optimizer) // Include only items where optimizer is true
                      .map((item) => (
                        <Checkbox
                          key={item.schedulerId}
                          value={item.schedulerName}
                          className="w-full mb-2"
                        >
                          {item.schedulerName}
                        </Checkbox>
                      ))}
                  </Checkbox.Group>
                </Form.Item>
              </div>

              <div className="optimize-2 scheduling-data">
                <h3 className="font-bold mb-5">Optimize-2</h3>
                <Form.Item name="optimize2" style={{ marginBottom: '16px' }}>
                  <Checkbox value="Bike" className="w-full mb-2">
                    Scheduler Chart
                  </Checkbox>
                </Form.Item>
              </div>

              <div className="text-right">
                <Button className="btn-main text-white" htmlType="submit">
                  Analyze
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>

      <div className="w-full ml-5 overflow-auto resulted-data-table">
        <h3 className="resulted-data text-xl text-black font-bold">
          Resulted Data
        </h3>
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </div>
    </Flex>
  );
};

export default SchedulingPlayGround;
