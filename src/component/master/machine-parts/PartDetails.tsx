import InputBox from '@/component/input/Input'
import SelectBox from '@/component/selectbox/selectbox'
import { reduxSliceData } from '@/utils/redux/features/reduxData'
import service from '@/utils/service/service'
import useFetchData from '@/utils/useFetchData/customFetchData'
import { Checkbox, Form, Switch, } from 'antd'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

const PartDetails = ({ UnitData, setUnitId, form }: any) => {
  const [minOrderQty, setMinOrderQty] = useState('');
  const [maxOrderQty, setMaxOrderQty] = useState('');
  const [unitIdSelected, setUnitIdSelected] = useState('');

  const { getQueryFetch }: any = useFetchData();
  const [cell, setCell] = useState([])
  const dispatch = useDispatch();

  const handleMultiSelectChange = async (value: any, name: any) => {
    try {
      setUnitId(value)
      setUnitIdSelected(value)
      if (name == 'unitId') {
        const queryParams = { unitId: value };
        const apiUrl = service.API_URL.manageworkcenter.listing;
        const editWorkCenterRes = await getQueryFetch(queryParams, apiUrl);
        if (editWorkCenterRes) {
          dispatch(reduxSliceData({ key: 'WorkCenter', data: editWorkCenterRes }))
        }

        //  -----------------cell Data Get-----------------------
        const editCellRes = await getQueryFetch(queryParams, service.API_URL.cell.listing);
        if (editCellRes) {
          setCell(editCellRes)
        }
      }
      else if (unitIdSelected && name == 'cellId') {
        const queryParams = { unitId: unitIdSelected, cellId: value };
        const apiUrl = service.API_URL.manageworkcenter.listing;
        const editWorkCenterRes = await getQueryFetch(queryParams, apiUrl);
        if (editWorkCenterRes) {
          dispatch(reduxSliceData({ key: 'WorkCenter', data: editWorkCenterRes }))
        }
      }
    } catch (error) {
    } finally {
    }

  }

  const handleOnChange = (e: any, fieldName: any) => {
    const value: any = e.target.value === '' ? '' : parseInt(e.target.value, 10);

    if (fieldName === 'minOrderQty') {
      setMinOrderQty(value);
      form.setFieldsValue({ minOrderQty: value });
    } else if (fieldName === 'maxOrderQty') {
      setMaxOrderQty(value);
      form.setFieldsValue({ maxOrderQty: value });
    }
    const updatedMinOrderQty = fieldName === 'minOrderQty' ? value : minOrderQty;
    const updatedMaxOrderQty = fieldName === 'maxOrderQty' ? value : maxOrderQty;

    let errors: any[] = [];

    if (updatedMaxOrderQty !== '' && updatedMinOrderQty !== '' && updatedMaxOrderQty < updatedMinOrderQty) {
      errors.push({
        name: 'maxOrderQty',
        errors: ['Max Qty. should not be less than Min  Qty.'],
      });
    }
    form.setFields(errors);
  };


  return (
    <>

      <div className="grid grid-cols-3 gap-x-6 gap-y-4">
        <InputBox
          label="Part No."
          name="partNo"
          required={true}
          inputPlaceholder="Part No."
          validateAsNumber={false}
          validateAsString={false}
        />
        <InputBox
          label="Part Name"
          name="partName"
          required={true}
          inputPlaceholder="Part name"
          validateAsNumber={false}
          validateAsString={false}
        />
        <InputBox
          label="Min Order Qty."
          name="minOrderQty"
          required={true}
          inputPlaceholder="Min Order Qty."
          validateAsNumber={true}
          inputDefaultValue="0"
          handleOnChange={(e: any) => handleOnChange(e, 'minOrderQty')}
        />
        <InputBox
          label="Max Order Qty."
          name="maxOrderQty"
          required={true}
          inputPlaceholder="Max Order Qty."
          validateAsNumber={true}
          inputDefaultValue="0"

          handleOnChange={(e: any) => handleOnChange(e, 'maxOrderQty')}
        />
        <InputBox
          label="MSQ"
          name="msq"
          required={true}
          inputPlaceholder="MSQ"
          validateAsNumber={true}
        />

        <InputBox
          label="Part Production Time"
          name="partProductionTime"
          required={false}
          inputPlaceholder="Part Production Time"
          validateAsNumber={false}
          validateAsString={false}
          disabled
        />

        <SelectBox
          label="Unit"
          name="unitId"
          keyField="unitId"
          valueField="unitName"
          mode={false}
          required={true}
          selectOptions={UnitData}
          selectPlaceholder="Select Unit"
          handleMultiSelectChange={(value: any) => handleMultiSelectChange(value, 'unitId')}
        />

        <SelectBox
          label="Cell"
          name="cellId"
          keyField="cellId"
          valueField="cellName"
          mode={false}
          required={false}
          selectOptions={cell}
          disabled={!cell.length}
          selectPlaceholder="Cell"
          handleMultiSelectChange={(value: any) => handleMultiSelectChange(value, 'cellId')}
        />


        <InputBox
          label="Machine Model"
          name="machineModel"
          required={false}
          inputPlaceholder="Machine Model"
          validateAsNumber={false}
          validateAsString={false}
        />

        <InputBox
          label="Sub Assembly Header"
          name="subAssemblyHeader"
          required={false}
          inputPlaceholder="Sub Assembly Header"
          validateAsNumber={false}
          validateAsString={false}
        />

        <InputBox
          label="Category"
          name="category"
          required={false}
          inputPlaceholder="Category"
          validateAsNumber={false}
          validateAsString={false}
        />

        <InputBox
          label="Generic Name"
          name="genericName"
          required={false}
          inputPlaceholder="Generic Name"
          validateAsNumber={false}
          validateAsString={false}
        />

        <Form.Item
          label="Part of"
          name="partOfMachineShop"
          valuePropName="checked"
          className="form-item"
          rules={[
            {
              required: false, // Making this field optional
              validator: (_, value) =>
                value
                  ? Promise.resolve() // If checked, resolve the promise
                  : Promise.resolve(), // If unchecked, also resolve (no error)
            },
          ]}
        >
          <Checkbox defaultChecked disabled>Machine Shop</Checkbox>

        </Form.Item>


        <Form.Item
          label="Status"
          name="status"
          valuePropName="checked"
          className="form-item"
        >
          <Switch checkedChildren="Active" defaultChecked unCheckedChildren="Inactive" />
        </Form.Item>
      </div>
    </>
  )
}
export default PartDetails
