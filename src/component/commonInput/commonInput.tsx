import React, { useEffect, useState } from 'react';

import SelectBox from '@/component/selectbox/selectbox';
import service from '@/utils/service/service';
import useFetchData from '@/utils/useFetchData/customFetchData';

interface MultiSelectProps {
  openAddModal: boolean;
  unit?: any;
  machineShop?: any;
  machineShopLine?: any;
  required?: any;
  unitId?: any;
  machineShopId?: any;
  setUnitId?: any;
  id: any;
  setAssistantManager?: any;
}

const CommonInput: React.FC<MultiSelectProps> = ({
  openAddModal,
  unit,
  machineShop,
  machineShopLine,
  required,
  unitId,
  machineShopId,
  setUnitId,
  id,
  setAssistantManager,
}) => {
  const { getQueryFetch }: any = useFetchData();
  const [machineShopArray, setMachineShopArray] = useState([]);
  const [lineArray, setLineArray] = useState([]);

  const { listData, getListData }: any = useFetchData();

  const modalListing = async () => {
    const apiUrls = {
      unitList: service?.API_URL?.unitList?.listing,
    };
    const enable = !!id;
    await getListData(apiUrls, enable);
  };

  const machineShopData = async () => {
    if (unitId) {
      const queryParams = { unitId };
      const editMachineRes: any = await getQueryFetch(
        queryParams,
        service.API_URL.machineShop.listing
      );
      setMachineShopArray(editMachineRes || []);
      // ---------------------assistant Manager-----------------
      const assistantParam = { unitId };
      const assistantRes: any = await getQueryFetch(
        assistantParam,
        service.API_URL.employees.listing
      );
      setAssistantManager(assistantRes || []);
    }
    if (machineShopId) {
      const queryParams = { machineShopId };
      const lineResData: any = await getQueryFetch(
        queryParams,
        service.API_URL.lineList.listing
      );
      setLineArray(lineResData || []);
    }
  };

  useEffect(() => {
    if (openAddModal) {
      modalListing();
      machineShopData();
    }
  }, [openAddModal]);

  const handleMultiSelectChange = async (selectedValues: any, name: any) => {
    if (name === 'unitId') {
      setUnitId(selectedValues);
      const queryParams = { unitId: selectedValues };
      const editMachineRes: any = await getQueryFetch(
        queryParams,
        service.API_URL.machineShop.listing
      );
      setMachineShopArray(editMachineRes || []);
      setLineArray([]);

      const assistantParam = { unitId: selectedValues, assistantManager: true };
      const assistantRes: any = await getQueryFetch(
        assistantParam,
        service.API_URL.employees.listing
      );
      setAssistantManager(assistantRes);
    } else if (name === 'machineShopId') {
      const queryParams = { machineShopId: selectedValues };
      const lineResData: any = await getQueryFetch(
        queryParams,
        service.API_URL.lineList.listing
      );
      setLineArray(lineResData || []);
    }
  };

  return (
    <>
      {unit && (
        <SelectBox
          label="Unit"
          name="unitId"
          keyField="unitId"
          valueField="unitName"
          mode={false}
          required={required}
          selectOptions={listData?.unitList}
          selectPlaceholder="Select Unit"
          // value={unitId}
          handleMultiSelectChange={(value: any) =>
            handleMultiSelectChange(value, 'unitId')
          }
        />
      )}
      {machineShop && (
        <SelectBox
          label="Machine Shop"
          name="machineShopId"
          keyField="machineShopId"
          valueField="machineShopName"
          mode={false}
          required={required}
          selectOptions={machineShopArray || []}
          selectPlaceholder="Machine Shop"
          handleMultiSelectChange={(value: any) =>
            handleMultiSelectChange(value, 'machineShopId')
          }
          disabled={!machineShopArray?.length}
        />
      )}
      {machineShopLine && (
        <SelectBox
          label="Machine Shop Line"
          name="lineId"
          keyField="lineId"
          valueField="lineName"
          mode={false}
          required={required}
          selectOptions={lineArray || []}
          disabled={!lineArray?.length}
          selectPlaceholder="Machine Shop Line"
          handleMultiSelectChange={(value: any) =>
            handleMultiSelectChange(value, 'lineId')
          }
        />
      )}
    </>
  );
};

export default CommonInput;
