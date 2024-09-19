import { DatePicker, Form, TimePicker } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useSelector } from 'react-redux';

import CommonForm from '@/app/layout/commonForm/commonForm';
import InputBox from '@/component/input/Input';
import SelectBox from '@/component/selectbox/selectbox';
import service from '@/utils/service/service';
import useFetchData from '@/utils/useFetchData/customFetchData';

const EditSpecialWorkingDay = ({ specialDayId, form }: any) => {
  const { updateData, listData, getListData, getQueryFetch }: any =
    useFetchData();
  const modals = useSelector((state: any) => state.modals);
  const onFinish: SubmitHandler<FormData> = async (data: any) => {
    delete data.unitName;
    const body = {
      ...data,
      specialWorkingDayId: specialDayId,
      //  endDate : dayjs(endDate).format('MM-YYYY'),
      holidayDate: data.startDate ? data.startDate.format('YYYY-MM-DD') : '',
      dayName: data?.dayName,
      startTime: data?.startTime ? data?.startTime?.format('HH:mm:ss') : '',
      endTime: data?.endTime ? data?.endTime?.format('HH:mm:ss') : '',
      isDelete: false,
    };
    const updatedDataRes = await updateData(
      body,
      service?.API_URL?.specialWorking.update
    );
  };
  const modalListing = async () => {
    const apiUrls = {
      unitList: service?.API_URL?.unitList?.listing,
      workCenter: service?.API_URL?.manageworkcenter?.listing,
    };
    await getListData(apiUrls);
  };

  useEffect(() => {
    if (specialDayId) {
      handleEdit(specialDayId);
      modalListing();
    }
  }, [specialDayId]);

  const handleEdit = async (id: any) => {
    try {
      const queryParams = { specialWorkingDayId: id };
      const apiUrl = service.API_URL.specialWorking.listing;

      const editMachineRes = await getQueryFetch(queryParams, apiUrl);
      if (editMachineRes) {
        const dataWithMomentDates = {
          ...editMachineRes[0],
          startDate: dayjs(editMachineRes[0].startDate, 'YYYY-MM-DD'),
          startTime: editMachineRes[0].startTime
            ? dayjs(editMachineRes[0].startTime, 'HH:mm:ss')
            : null,
          endTime: editMachineRes[0].endTime
            ? dayjs(editMachineRes[0].endTime, 'HH:mm:ss')
            : null,
        };
        const workCenter = editMachineRes[0].workCenters.map(
          (unit) => unit.workCenterId
        );

        form.setFieldsValue({ workCenter });
        form.setFieldsValue(dataWithMomentDates);
      } else {
        // Handle the case where apiStatus is false
        console.error('API call was not successful:', editMachineRes);
        // You can set some error state here if needed
      }
    } catch (error) {
      // Handle the error
      // You can set some error state here if needed
    }
    // Perform your edit actions here
  };

  return (
    <CommonForm
      open={modals.editSpecialDay}
      mdlTitle="Edit Special Working Day"
      btnSubmit="Save"
      form={form}
      onFinish={onFinish}
      closeName="editSpecialDay"
      body={
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          <SelectBox
            label="Unit Name"
            name="unitId"
            keyField="unitId"
            valueField="unitName"
            mode={false}
            required
            selectOptions={listData?.unitList}
            selectPlaceholder="Select Unit"
            disabled
          />
          <Form.Item
            name="startDate"
            label="Start Date"
            className="form-item"
            rules={[{ required: false }]}
          >
            <DatePicker
              format="DD-MMM-YYYY"
              className="date-picker"
              name="startDate"
              disabled
            />
          </Form.Item>
          <SelectBox
            label="Work Center"
            name="workCenter"
            keyField="workCenterId"
            valueField="workCenterName"
            mode
            required
            selectOptions={listData.workCenter}
            selectPlaceholder="Select Work Center"
          />
          <InputBox
            label="Day Name"
            name="dayName"
            required={false}
            inputPlaceholder="Day Name"
            validateAsNumber={false}
            validateAsString={false}
            disabled
            max={15}
          />
          <Form.Item
            label="Start Time"
            name="startTime"
            className="form-item"
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <TimePicker className="date-picker" name="startTime" />
          </Form.Item>
          <Form.Item
            label="End Time"
            name="endTime"
            className="form-item"
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <TimePicker className="date-picker" name="endTime" />
          </Form.Item>
          <InputBox
            label="Reason"
            name="reason"
            required
            validateAsNumber={false}
            validateAsString={false}
            max={50}
          />
        </div>
      }
    />
  );
};

export default EditSpecialWorkingDay;
