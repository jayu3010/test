import { Button, Form } from 'antd';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import InputBox from '@/component/input/Input';
import SelectBox from '@/component/selectbox/selectbox';
import { addIcon, dltIcon } from '@/utils/icons/icons';
import service from '@/utils/service/service';
import useFetchData from '@/utils/useFetchData/customFetchData';

const IntermediateProcess = () => {
  const openAddModal = useSelector((state: any) => state.isModalOpen);

  const { listData, getListData }: any = useFetchData();
  const modalListing = async () => {
    const apiUrls = {
      interMediateProcesses: service?.API_URL?.interMediateProcesses?.listing,
      preProcesses: service?.API_URL?.preProcesses?.listing,
    };
    await getListData(apiUrls);
  };
  useEffect(() => {
    if (openAddModal) {
      modalListing();
    }
  }, [openAddModal]);

  return (
    <Form.List name="partIntermediateProcesses">
      {(fields, { add, remove }) => (
        <div className="add-operation">
          <div className="operation-title">
            <h2 className="font-bold">Intermediate Process</h2>
          </div>
          {fields.map(({ key, name, ...restField }, index) => (
            <div className="grid grid-cols-3 gap-x-6 gap-y-4">
              <SelectBox
                restWorkCenterField={restField}
                label="Process"
                name={[name, 'iprocessId']}
                keyField="iProcessId"
                valueField="processName"
                mode={false}
                required={false}
                selectOptions={listData.interMediateProcesses}
                selectPlaceholder="Process"
              />

              <InputBox
                restField={restField}
                label="Max Qty"
                name={[name, 'maxQty']}
                required={false}
                inputPlaceholder="Max Qty"
                validateAsNumber
                inputDefaultValue="0"
              />
              <div className="flex items-end gap-1">
                <div className="delete-btn">
                  {index > 0 && (
                    <Button className="add-button" onClick={() => remove(name)}>
                      {dltIcon}
                    </Button>
                  )}
                </div>

                {index === fields.length - 1 && (
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    className="add-button"
                  >
                    {addIcon}
                  </Button>
                )}
              </div>
            </div>
          ))}
          <div className="grid grid-cols-3 gap-x-6 gap-y-4 mt-5">
            <SelectBox
              restWorkCenterField=""
              label="Next Part"
              name="nextPartId"
              keyField="id"
              valueField="name"
              mode={false}
              required={false}
              selectOptions={[{ id: 1, name: 'Test' }]}
              selectPlaceholder="Next Part"
            />
          </div>
        </div>
      )}
    </Form.List>
  );
};
export default IntermediateProcess;
