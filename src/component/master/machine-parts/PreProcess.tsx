import { Button, Form } from 'antd';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import InputBox from '@/component/input/Input';
import SelectBox from '@/component/selectbox/selectbox';
import { addIcon, dltIcon } from '@/utils/icons/icons';
import service from '@/utils/service/service';
import useFetchData from '@/utils/useFetchData/customFetchData';

const PreProcess = () => {
  const openAddModal = useSelector((state: any) => state.isModalOpen);

  const { listData, getListData }: any = useFetchData();
  const modalListing = async () => {
    const apiUrls = {
      preFunctions: service?.API_URL?.preFunctions?.listing,
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
    <Form.List name="partPreProcesses">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }, index) => (
            <div key={key} className="add-operation">
              <div className="delete-btn">
                {index > 0 && (
                  <Button className="dlt-icon" onClick={() => remove(name)}>
                    {dltIcon}
                  </Button>
                )}
              </div>
              <div className="operation-title">
                <h2 className="font-bold">Pre Process : {index + 1}</h2>
              </div>
              <div className="grid grid-cols-3 gap-x-6 gap-y-4">
                <InputBox
                  restField={restField}
                  label="Process No"
                  name={[name, 'processNo']}
                  required={false}
                  inputPlaceholder="Process No"
                  validateAsNumber
                  inputDefaultValue="0"
                />
                <SelectBox
                  restWorkCenterField={restField}
                  label="Process"
                  name={[name, 'preProcessId']}
                  keyField="preProcessId"
                  valueField="description"
                  mode={false}
                  required={false}
                  selectOptions={listData.preProcesses}
                  selectPlaceholder="Process"
                />
                <SelectBox
                  restWorkCenterField={restField}
                  label="Function"
                  name={[name, 'preFunctionId']}
                  keyField="preFunctionId"
                  valueField="functionName"
                  mode={false}
                  required={false}
                  selectOptions={listData.preFunctions}
                  selectPlaceholder="Function"
                />

                <InputBox
                  restField={restField}
                  label="Lead Days"
                  name={[name, 'leadDays']}
                  required={false}
                  inputPlaceholder="Lead Days"
                  validateAsNumber
                  inputDefaultValue="0"
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
                {index === fields.length - 1 && (
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    className="add-field-btn btn-main"
                    style={{
                      width: 'auto',
                      maxWidth: '50px',
                      marginTop: '30px',
                    }}
                  >
                    {addIcon}
                  </Button>
                )}
              </div>
            </div>
          ))}
          <div className="grid grid-cols-3 gap-x-6 gap-y-4" />
        </>
      )}
    </Form.List>
  );
};
export default PreProcess;
