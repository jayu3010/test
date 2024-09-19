import React, { useEffect, useMemo, useState } from 'react';
import {
  Form,
  Button,
  DatePicker,
  Flex,
  TimePicker,
  Select,
  message,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';

import useFetchData from '@/utils/useFetchData/customFetchData';
import InputBox from '@/component/input/Input';
import SelectBox from '@/component/selectbox/selectbox';
import { exportFilterData, filterData } from '@/utils/redux/features/reduxData';
import { exportIcon, refreshIcon, searchIcon } from '@/utils/icons/icons';

interface FilterProps {
  data: any;
  setFilterData?: any;
  url: string;
  searchData?: any;
  exportUrl?: any;
}

const Filter: React.FC<FilterProps> = ({
  data,
  url,
  searchData,
  exportUrl,
}) => {
  const { getQueryFetch, getExport }: any = useFetchData();
  const tabledata = useSelector((state: any) => state.tableData);
  console.log("🚀 ~ tabledata:", tabledata)

  const dispatch = useDispatch();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  // Initialize the form instance
  const [form] = Form.useForm();
  const onFinish = async (data: any) => {
    const queryParams = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== undefined)
    );
    if (Object.keys(queryParams).length === 0) {
      message.warning('Please fill in some data before submitting.');
      return;
    }
    try {
      const queryParam = {
        ...queryParams,
        ...(queryParams.hasOwnProperty('startDate') ||
        queryParams.hasOwnProperty('endDate')
          ? {
              startDate: queryParams.startDate
                ? queryParams.startDate.format('YYYY-MM-DD')
                : '',
              endDate: queryParams.endDate
                ? queryParams.endDate.format('YYYY-MM-DD')
                : '',
            }
          : {}),
        ...(queryParams.empType === 'Supervisor' ? { supervisor: true } : {}),
        ...(queryParams.empType === 'Operator' ? { isOperator: true } : {}),
        ...(queryParams.empType === 'AssistantManager'
          ? { assistantManager: true }
          : {}),
      };
      dispatch(exportFilterData(queryParams));
      const dataFilter = await getQueryFetch(queryParam, url);
      const dataArray: any = Array.isArray(dataFilter)
        ? dataFilter
        : dataFilter
          ? [dataFilter]
          : [];
      dispatch(filterData(dataArray));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const debouncedSearch = useMemo(
    () =>
      debounce((keyword) => {
        const results = searchData?.filter(
          (item: any) =>
            item?.partNo?.toLowerCase().includes(keyword.toLowerCase()) ||
            item?.partName?.toLowerCase().includes(keyword.toLowerCase())
        );
        setFilteredData(results);
      }, 300),
    [searchData]
  );

  useEffect(() => {
    if (searchKeyword) {
      debouncedSearch(searchKeyword);
    } else {
      setFilteredData(searchData);
    }
  }, [searchKeyword, debouncedSearch, searchData]);

  const handleSearch = (value: any) => {
    setSearchKeyword(value);
  };

  const handleValuesChange = (changedValues: any, allValues: any) => {
    const hasValue = Object.values(allValues).some(
      (value) => value !== undefined && value !== null && value !== ''
    );
    setIsButtonDisabled(!hasValue);
  };
  const handleReset = () => {
    form.resetFields();
    setIsButtonDisabled(true); // Disable the search button after reset
    dispatch(filterData(tabledata || []));
  };

  return (
    <Form
      form={form}
      layout="vertical"
      className="main-form"
      onFinish={onFinish}
      onValuesChange={handleValuesChange}
    >
      <div className="grid grid-cols-4 gap-x-6 gap-y-4">
        {data?.map((item: any, index: any) => {
          return (
            <div className="ml-2 md:ml-0 sm:ml-0" key={index}>
              {item.type === 'text' && item.showSearch === true ? (
                <Form.Item
                  label={item.displayName}
                  name={item.name}
                  className="form-item select-search"
                >
                  <Select
                    showSearch
                    placeholder="Search "
                    defaultActiveFirstOption
                    suffixIcon={null}
                    className="form-multi-select"
                    mode="multiple"
                    onSearch={handleSearch}
                    notFoundContent={null}
                    filterOption={false}
                    options={filteredData?.map((item: any) => ({
                      value: item.partId,
                      label: `${item.partNo} - ${item.partName}`,
                    }))}
                  />
                </Form.Item>
              ) : item.type === 'text' ? (
                <InputBox
                  label={item.displayName}
                  name={item.name}
                  inputPlaceholder={item.placeholder}
                  validateAsNumber={false}
                  validateAsString={false}
                />
              ) : item.type === 'date' ? (
                <Form.Item
                  label={item.displayName}
                  name={item.name}
                  className="form-item"
                >
                  <DatePicker
                    format="DD-MMM-YYYY"
                    className="date-picker"
                    placeholder={item.placeholder}
                    showTime={item.format}
                  />
                </Form.Item>
              ) : item.type === 'time' ? (
                <Form.Item
                  label={item.displayName}
                  name={item.name}
                  className="form-item"
                >
                  <TimePicker className="date-picker" />
                </Form.Item>
              ) : item.type === 'selectbox' ? (
                <SelectBox
                  label={item.displayName}
                  name={item.name}
                  keyField={item.keyField}
                  valueField={item.valueField}
                  mode={false}
                  selectOptions={item.options}
                  selectPlaceholder={item.placeholder}
                />
              ) : null}
            </div>
          );
        })}
      </div>
      <div className="mt-5">
        <Flex className="gap-4">
          <Button
            type="primary"
            htmlType="submit"
            // className={`btn-main ${isButtonDisabled ? 'disable-btn' : ''}`}
            className="btn-main"
            // disabled={isButtonDisabled}
          >
            {searchIcon} Search{' '}
          </Button>
          <Button
            type="primary"
            htmlType="button"
            className="btn-main"
            onClick={handleReset}
          >
            {refreshIcon} Reset{' '}
          </Button>
        </Flex>
      </div>
    </Form>
  );
};

export default Filter;
