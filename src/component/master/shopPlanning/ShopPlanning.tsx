'use client'

import React, { useEffect, useState } from 'react'

import CommonHeader from '@/component/commonHeader/CommonHeader'
import { Button, Collapse, Form, Table, Flex, Space, Tabs, Input, message, DatePicker } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import UnplannedPO from './addUnplannedPO/AddUnplannedPO'
import BulkUnplannedPO from './addBulkUnplannedPO/AddBulkUnplannedPO'

import AddBulkToQueue from './addBulkToQueue/AddBulkToQueue'

import useFetchData from '@/utils/useFetchData/customFetchData'
import service from '@/utils/service/service'
import { SearchOutlined } from '@ant-design/icons'
import { TabsProps } from 'antd/lib'
import Filter from '@/app/layout/filter/filter'

import AddBulkPO from './addBulkPO/AddBulkPO'

import EditPOtoQueue from './editPOtoQueue/EditPOtoQueue'
import { addOpenModal } from '@/utils/redux/features/reduxData'
import SelectBox from '@/component/selectbox/selectbox'
import SplitQueue from './splitQueue/SplitQueue'
import { FilterCommanFunction } from '@/utils/useFetchData/FilterCommanFunction'
import { filterOptiondata } from '@/utils/useFetchData/FilterOptionData'
import AddPOtoQueue from './addPOtoQueue/AddPOtoQueue'
import MultipleColums from './columns/Columns';
import DeadlineFormComponent from './deadlineFormComponent/DeadlineFormComponent'
import StatusChangeComponent from './statusChangeComponent/StatusChangeComponent'

const { TabPane } = Tabs;
const ShopPlanning = () => {
  const [shopResponse, setShopResponse] = useState([]);
  const { getItemById }: any = useFetchData();
  const filterData = useSelector((state: any) => state.filterData);

  const [activeTab, setActiveTab] = useState<any>('Plan');
  const [expandedRowKey, setExpandedRowKey] = useState('');
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [queueData, setQueueData] = useState([]);
  const [swichToggle, setSwichToggle] = useState('');

  const [selectedItems, setSelectedItems] = useState([]);

  const [statusData, setStatusData] = useState('');
  const { getShopData, updateShopData, loading }: any = useFetchData(
    service?.API_URL?.machineparts.listing
  );

  const filterItems = [
    {
      key: '1',
      label: 'Filter',
      children: (
        <Filter
          data={FilterCommanFunction(filterOptiondata.machineshopplanning[0])}
          url={service?.API_URL?.machineparts?.listing}
          searchData={filterData}
        />
      ),
    },
  ];

  const handleExpand = (expanded: boolean, record: any) => {
    setExpandedRowKey(expanded ? record?.key : '');
  };
  const handleEdit = async (id: any) => {
    try {
      const apiUrl = service.API_URL.productionOrder.getbyid;
      const editMachineRes = await getItemById(id, apiUrl);
      if (editMachineRes) {
        dispatch(addOpenModal('editQueue'));
        form.setFieldsValue(editMachineRes[0]);
        setQueueData(editMachineRes[0]);
      }
    } catch (error) {
      // Handle the error
      // You can set some error state here if needed
    }
  };
  const handleSplit = async (id: any) => {
    const apiUrl = service.API_URL.productionOrder.getbyid;
    const editMachineRes = await getItemById(id, apiUrl);
    if (editMachineRes) {
      dispatch(addOpenModal('splitQueue'));
      form.setFieldsValue(editMachineRes[0]);
      setQueueData(editMachineRes[0]);
    }
  };
  const rowSelection = {
    onSelect: (record, selected, selectedRows) => {
      setSelectedItems((prevSelectedItems: any) => {
        if (selected) {
          // Add the selected row
          return [...prevSelectedItems, record.prodOrderId];
        } else {
          // Remove the unselected row
          return prevSelectedItems.filter((id: any) => id !== record.prodOrderId);
        }
      });
      console.log("Selected Record:", record, "Selected Rows:", selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      setSelectedItems((prevSelectedItems: any) => {
        if (selected) {
          // Add all selected rows
          const allSelectedIds = selectedRows.map(row => row.prodOrderId);
          return [...prevSelectedItems, ...allSelectedIds];
        } else {
          // Remove all unselected rows
          const changeRowIds = changeRows.map(row => row.prodOrderId);
          return prevSelectedItems.filter((id: any) => !changeRowIds.includes(id));
        }
      });
      console.log("All Selected:", selected, "Selected Rows:", selectedRows, "Changed Rows:", changeRows);
    },
  };
  const columns = MultipleColums.TableColumns();
  const QueueColumns = MultipleColums.QueueColumns({
    handleEdit,
    handleSplit,
  });
  const expandedRowRender = MultipleColums.expandedRowRenderColumns({ shopResponse });

  const items: TabsProps['items'] = MultipleColums.CustomTabs({
    columns,
    shopResponse,
    expandedRowRender,
    expandedRowKey,
    handleExpand,
    rowSelection
  });
  const secondTabItems = MultipleColums.secondTabItems({
    columns,
    shopResponse,
    expandedRowRender,
    expandedRowKey,
    handleExpand,
    rowSelection
  });


  const thirdTabItems = MultipleColums.thirdTabItems({
    QueueColumns,
    columns,
    shopResponse,
    rowSelection,
    expandedRowRender,
    expandedRowKey,
    handleExpand,
  });

  const getTabData = async () => {
    const body = {
      // "poOrderNo": [
      //   "string"
      // ],
      // "partIds": [
      //   0
      // ],
      // "model": "string",
      // "subAssemblyCode": "string",
      // "startDate": "2024-09-05T05:58:56.692Z",
      // "endDate": "2024-09-05T05:58:56.692Z",
      pageModel: [
        {
          screenName: activeTab,
          pageIndex: 1,
          pageSize: 10,
        },
      ],
    };
    const shopData: any = await getShopData(
      body,
      service?.API_URL?.shopPlanning.listing
    );

    if (shopData != null) {
      const updatedShopData = Object.keys(shopData).reduce(
        (acc: any, key: string) => {
          acc[key] = shopData[key]?.map((item: any, index: number) => ({
            ...item,
            key: index + 1,
          }));
          return acc;
        },
        {}
      );

      setShopResponse(updatedShopData);
    }
  };

  useEffect(() => {
    getTabData();
  }, [activeTab]);

  const handleChangeTab = (key: string) => {
    setActiveTab(key);
  };

  const onChangeStatus = async () => {
    if (!statusData) {
      message.warning('Please select a status');
      return;
    }
    if (selectedItems.length === 0) {
      message.warning('Please select at least one item');
      return;
    }
    const body = {
      status: statusData,
      productionOrderIds: selectedItems,
    };
    const res = await updateShopData(
      body,
      service?.API_URL?.productionOrder.statusUpdate,
      true
    );

    if (res?.apiStatus) {
      // Add a delay before fetching and setting the shop data
      setTimeout(async () => {
        const data = {
          queueType: activeTab,
        };
        setSelectedItems([]);
        const shopData = await getShopData(
          data,
          service?.API_URL?.shopPlanning.listing
        );
        const updatedShopData = shopData?.map((item: any, index: any) => ({
          ...item,
          key: index + 1,
        }));
        setShopResponse(updatedShopData);
      }, 2000); // 2000 milliseconds delay (2 seconds)
    }
  };
  // const handleSwitchChange = () => {
  //   setSwichToggle(!swichToggle)
  // }
  return (
    <div>
      <CommonHeader />
      <AddPOtoQueue />
      <UnplannedPO />
      <AddBulkPO />
      <EditPOtoQueue form={form} queueData={queueData} />
      <BulkUnplannedPO />
      {/* <UpdateQty /> */}
      <AddBulkToQueue />
      {/* <AddCellPlannedPO /> */}
      <SplitQueue splitData={queueData} setQueueData={setQueueData} />

      <div className="block-main__filter border-y-[1px] border-border">
        <Collapse items={filterItems} className="block-dropdown block-filter" />
      </div>

      <Form.Item className="form-item">Deadline Date</Form.Item>
      <div className="flex items-center justify-between deadline-main">
        <DeadlineFormComponent />
        <StatusChangeComponent setStatusData={(value:any) => setStatusData(value)} onChangeStatus={onChangeStatus} />

      </div>
      <div className="block-sidebar__search deadline-search">
        <div className="deadline-search-select flex items-center gap-3">
          <Input
            placeholder="Search..."
            prefix={<SearchOutlined />}
            className="tabup-search"
          />
          {/* <CommonSwitch
            label=""
            name="status"
            checkedChildren="Show"
            unCheckedChildren="Hide"
            handleSwitchChange={handleSwitchChange}
          /> */}
        </div>

        {/*  */}
        <div className="overflow-auto">
          <Tabs
            defaultActiveKey={activeTab}
            onChange={handleChangeTab}
            className="operation-tabs"
          >
            <div className="group-header">Group 1</div>
            {thirdTabItems.map((tabItem) => {
              return (
                <TabPane
                  active={activeTab}
                  tab={tabItem.label}
                  key={tabItem.key}
                >
                  {tabItem.children}
                </TabPane>
              );
            })}

            <div className="group-header">Group 2</div>
            {items.map((tabItem) => {
              return (
                <TabPane
                  active={activeTab}
                  tab={tabItem.label}
                  key={tabItem.key}
                >
                  {tabItem.children}
                </TabPane>
              );
            })}

            <div className="group-header">Group 2</div>
            {secondTabItems.map((tabItem) => {
              return (
                <TabPane
                  active={activeTab}
                  tab={tabItem.label}
                  key={tabItem.key}
                >
                  {tabItem.children}
                </TabPane>
              );
            })}
          </Tabs>
        </div>

      </div>
    </div>
  );
};

export default ShopPlanning;
