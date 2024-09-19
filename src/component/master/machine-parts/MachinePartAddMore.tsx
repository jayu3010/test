import React, { useEffect, useState } from 'react'
import { Button, Form, message, Upload, Collapse } from 'antd'
import { DownloadOutlined, FilePdfOutlined, LoadingOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons'
import InputBox from '@/component/input/Input'
import SelectBox from '@/component/selectbox/selectbox'
import PartDetails from './PartDetails'
import { addIcon, dltIcon } from '@/utils/icons/icons'
import service from '@/utils/service/service'
import { useSelector } from 'react-redux'
import useFetchData from '@/utils/useFetchData/customFetchData'
import IntermediateProcess from './IntermediateProcess'
import {
  getBase64,
  validateNonNegativeInteger,
} from '@/utils/functions/commonFunction'

const { Panel } = Collapse

const MachinePartAddMore = ({ partId, setFileList, form }: any) => {
  const openAddModal = useSelector((state: any) => state.isModalOpen)
  const [loading, setLoading] = useState(false)
  const [totalTimeValidation, setTotalTimeValidation] = useState([])
  const [unitId, setUnitId] = useState('')
  const WorkCenterData = useSelector((state: any) => state.reduxData)
  const { listData, getListData }: any = useFetchData()

  const modalListing = async () => {
    const apiUrls = {
      unitList: service?.API_URL?.unitList?.listing,
      workCenterList: service?.API_URL?.manageworkcenter?.listing,
    }
    await getListData(apiUrls)
  }

  useEffect(() => {
    if (openAddModal) {
      modalListing()
    }
  }, [openAddModal])

  const handleMultiSelectChange = (value: any, index: any, wcIndex: any) => {
    const result = listData.workCenterList.filter((item: any) => item?.workCenterId === value);

    if (result.length > 0) {
      const partOperations = [...form.getFieldValue('partOperations')]

      while (partOperations.length <= index) {
        partOperations.push({ partOperationWorkCenters: [] })
      }

      while (partOperations[index].partOperationWorkCenters.length <= wcIndex) {
        partOperations[index].partOperationWorkCenters.push({ palletCount: '' })
      }

      partOperations[index].partOperationWorkCenters[wcIndex].palletCount =
        result[0]?.palletCount

      form.setFieldsValue({ partOperations })
    } else {
      console.log('No matching work center found')
    }
  }

  const calculateTotalTime = (data: any[]) => {
    let totalProductionTime = 0; // Initialize a variable to store the total production time
    const updatedData = data?.map((item) => {
      if (item.partOperationWorkCenters) {
        const updatedWorkCenters = item.partOperationWorkCenters.map((center: any, i: any) => {
          if (center) {
            // Calculate total time for the work center
            const times = [
              parseInt(center.fixtureSetupTime || 0),
              parseInt(center.partLoadingTime || 0),
              parseInt(center.toolSetupTime || 0),
              parseInt(center.cycleTime || 0),
              parseInt(center.partUnloadingTime || 0),
              parseInt(center.fixtureUnloadingTime || 0),
              parseInt(center.transitTime || 0)
            ];

            const totalTime = times.reduce((acc, time) => acc + time, 0);

            // Add the total time from the first work center to the total production time
            if (i === 0) {
              totalProductionTime += totalTime;
            }

            setTotalTimeValidation((prevItems: any) => {
              const itemExists = prevItems?.find(item => item.indexKey === i);

              if (itemExists) {
                return prevItems?.map(item =>
                  item.indexKey === i
                    ? { ...item, TotalTime: totalTime > 0 ? false : true } // Update TotalTime validation
                    : item // Keep the rest of the items unchanged
                );
              }

              return [...prevItems, { indexKey: i, TotalTime: totalTime > 0 ? false : true }];
            });

            return {
              ...center,
              TotalTime: totalTime.toString() // Add TotalTime as a string
            };
          }
          return center;
        });

        return {
          ...item,
          partOperationWorkCenters: updatedWorkCenters,
        }
      }
      return item;
    });

    // Set the partProductionTime only for the first `partOperationWorkCenters`
    form.setFieldsValue({ partProductionTime: totalProductionTime });
    return updatedData; // Return the updated data
  };


  const handleOnChange = () => {
    const partOperations = [...form.getFieldValue('partOperations')];
    form.setFieldsValue({ partOperations: calculateTotalTime(partOperations) });


  }


  const beforeUpload = (file: any) => {
    const isPdf = file.type === 'application/pdf'
    if (!isPdf) {
      message.error('You can only upload PDF files!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('File must be smaller than 2MB!')
    }
    return isPdf && isLt2M
  }

  const handleChange = async (info: any, index: any) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      if (info.file.originFileObj) {
        setLoading(false)
        const partOperations = [...form.getFieldValue('partOperations')]
        while (partOperations.length <= index) {
          partOperations.push({ partOperationWorkCenters: [] })
        }
        const file = info.file.originFileObj;
        let fileBase64: any = await getBase64(file);
        fileBase64 = fileBase64.replace("data:application/pdf;base64,", "");
        partOperations[index].drawingFile = file ? fileBase64 : null;
        partOperations[index].fileName = file ? info.file.name : '';
        form.setFieldsValue({ partOperations })
      } else {
        console.log('No matching work center found')
      }
    }
  }

  const handleAdd = async () => {
    try {
      // If validation passes, add the new operation
      const fieldList = form.getFieldValue('partOperations') || []
      const newIndex = fieldList.length
      const newOperationNo = 10 * (newIndex + 1)
      const newField = {
        operationNo: newOperationNo,
        partOperationWorkCenters: [{}],
      }

      form.setFieldsValue({
        partOperations: [...fieldList, newField],
      })
    } catch (errorInfo) {
      // If validation fails, errors will be shown automatically
    }
  }

  const handleRemove = (name: number) => {
    const fieldList = form.getFieldValue('partOperations') || [];
    
    // Remove the selected item and re-index operation numbers
    const reIndexedFieldList = fieldList
      .filter((_: any, i: any) => i !== name)
      .map((item: any, index: any) => ({
        ...item,
        operationNo: 10 * (index + 1),
      }));
  
    // Recalculate total time for remaining work centers
    const recalculatedOperations = calculateTotalTime(reIndexedFieldList);
  
    // Calculate the partProductionTime (sum of TotalTime from all work centers)
    const updatedTotalTime = recalculatedOperations.reduce((total, operation) => {
      return total + parseInt(operation.partOperationWorkCenters[0]?.TotalTime || 0);
    }, 0);
  
    // Update form values in a single call
    form.setFieldsValue({
      partOperations: recalculatedOperations,
      partProductionTime: updatedTotalTime,
    });
  };
  

  const handleDownload = (key: any) => {
    const fieldList = form.getFieldValue('partOperations') || [];

    if (!fieldList[key] || !fieldList[key].drawingFile) {
      console.error('No file found for the specified key')
      return
    }
    const base64String = fieldList[key].drawingFile;
    const cleanBase64 = base64String.split(',').pop();

    try {
      const byteCharacters = atob(cleanBase64);
      const byteNumbers = new Array(byteCharacters.length);

      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i)
      }

      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' });

      // Create a link and trigger the download
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = 'downloaded-file.pdf' // Specify the file name
      document.body.appendChild(link)
      link.click()
      // Clean up
      document.body.removeChild(link) // Remove link after download
      URL.revokeObjectURL(link.href) // Clean up the URL object
    } catch (error) {
      console.error('Error decoding base64 file: ', error)
    }
  };

  const fieldList = form.getFieldValue('partOperations') || [];


  const totalcountget = (i: any) => {
    const result = totalTimeValidation.find((item) => item?.indexKey === i)
    return result ? result.TotalTime : true
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-x-6 gap-y-4">
        <div className='partDetails-main'>
          <PartDetails UnitData={listData.unitList || []} setUnitId={setUnitId} form={form} />
        </div>
      </div>
      <div className='operationParts-main'>
        <Form.List name="partOperations">

          {(fields, { add, remove }) => (
            <>
              <Collapse defaultActiveKey={['0']}>
                {fields.map(({ key, name, ...restField }, index) => (
                  <>
                    <Panel
                      key={key}
                      header={`OPERATION - ${index + 1}`}
                      extra={
                        index > 0 && (
                          <Button className="dlt-icon" onClick={() => handleRemove(index)}>
                            {dltIcon}
                          </Button>
                        )
                      }
                    >
                      <div key={key} className="add-operation">
                        <div className="grid grid-cols-3 gap-x-6 gap-y-4">
                          <InputBox
                            restField={restField}
                            label="Operation Name"
                            name={[name, 'operationName']}
                            required={true}
                            inputPlaceholder="Operation Name"
                            validateAsNumber={false}
                            validateAsString={false}
                            max={30}
                          />
                          <InputBox
                            restField={restField}
                            label={`Operation No.`}
                            name={[name, 'operationNo']}
                            required={false}
                            inputPlaceholder="Operation No."
                            validateAsNumber={true}
                            inputDefaultValue={key === 0 ? 10 : ''}
                            disabled={true}
                          />

                          <InputBox
                            restField={restField}
                            label="Drawing No."
                            name={[name, 'drawingNo']}
                            required={true}
                            inputPlaceholder="Drawing No."
                            validateAsNumber={false}
                            validateAsString={false}
                            max={30}
                          />
                          {/* <FileUpload /> */}

                          <Form.Item
                            label={<span style={{ fontWeight: 600 }}>Drawing File</span>}
                            {...restField} name={[name, 'drawingFile']}
                            rules={[{ required: partId ? false : true, message: 'Please upload a drawing file' }]}
                          >
                            <Upload
                              name="file"
                              listType="picture-card"
                              className="file-uploader"
                              showUploadList={false}
                              beforeUpload={beforeUpload}
                              onChange={(info) => handleChange(info, index)}
                            >
                              <div>
                                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                                <div className="ant-upload-text">Upload</div>
                              </div>
                            </Upload>
                            {fieldList[key]?.fileName && (
                              <div style={{ marginTop: 10 }}>
                                {fieldList[key].fileName.toLowerCase().endsWith('.pdf') && (
                                  <FilePdfOutlined style={{ fontSize: '24px', marginRight: '8px', color: '#ff4d4f' }} />
                                )}
                                <span>{fieldList[key].fileName}</span>
                              </div>
                            )}
                          </Form.Item>
                          {partId && (
                            <Button onClick={() => handleDownload(key)} type="primary" style={{ marginTop: '60px', width: '200px' }} className='btn-main'>   {<DownloadOutlined />} Download File </Button>)}
                        </div>

                        <Form.List name={[name, 'partOperationWorkCenters']}>
                          {(
                            workCenterFields,
                            { add: addWorkCenter, remove: removeWorkCenter },
                          ) => (
                            <>
                              {workCenterFields.map(({ key: wcKey, name: wcName, ...restWorkCenterField }, wcIndex,) => {
                                return (
                                  <div key={wcKey} className="workcenter-main">
                                    <div className="delete-btn">
                                      {wcIndex > 0 && (
                                        <Button
                                          className="dlt-icon"
                                          onClick={() => removeWorkCenter(wcName)}
                                        >
                                          {dltIcon}
                                        </Button>
                                      )}
                                    </div>
                                    <div
                                      className={`grid grid-cols-3 gap-x-6 gap-y-4 add-workcenter ${wcIndex > 0 ? 'alternateWorkCenter' : ''
                                        }`}
                                    >
                                      <SelectBox
                                        restWorkCenterField={restWorkCenterField}
                                        label={
                                          wcIndex === 0
                                            ? 'Work Center'
                                            : 'Alternate Work Center'
                                        }
                                        name={[wcName, 'workCenterId']}
                                        keyField="workCenterId"
                                        valueField="workCenterName"
                                        mode={false}
                                        required={true}
                                        selectOptions={WorkCenterData?.WorkCenter}
                                        disabled={!WorkCenterData?.WorkCenter || !unitId}
                                        selectPlaceholder="Work Center"
                                        handleMultiSelectChange={(value: any) =>
                                          handleMultiSelectChange(
                                            value,
                                            index,
                                            wcIndex,
                                          )
                                        }
                                      />
                                      <InputBox
                                        restField={restWorkCenterField}
                                        label={`Pallet Name`}
                                        name={[wcName, 'palletCount']}
                                        // inputDefaultValue={palletName}
                                        required={false}
                                        inputPlaceholder="Pallet Name"
                                        validateAsNumber={false}
                                        validateAsString={false}
                                        disabled={true}
                                      />

                                      <InputBox
                                        restField={restWorkCenterField}
                                        label="Fixture Setup Time"
                                        name={[wcName, 'fixtureSetupTime']}
                                        required={totalcountget(wcIndex)}
                                        inputDefaultValue="0"
                                        inputPlaceholder="Fixture Setup Time"
                                        validateAsNumber={true}
                                        handleOnChange={(e: any) =>
                                          handleOnChange()
                                        }
                                        max={3}
                                        rules={[{ validator: validateNonNegativeInteger }]} 
                                      />
                                      <InputBox
                                        restField={restWorkCenterField}
                                        label="Tool Setup Time"
                                        name={[wcName, 'toolSetupTime']}
                                        required={totalcountget(wcIndex)}
                                        inputDefaultValue="0"
                                        inputPlaceholder="Tool Setup Time"
                                        validateAsNumber={true}
                                        handleOnChange={(e: any) =>
                                          handleOnChange()
                                        }
                                        rules={[{ validator: validateNonNegativeInteger }]} 
                                        max={3}
                                      />
                                      <InputBox
                                        restField={restWorkCenterField}
                                        label="Part Loading Time"
                                        name={[wcName, 'partLoadingTime']}
                                        required={totalcountget(wcIndex)}
                                        inputDefaultValue="0"
                                        inputPlaceholder="Part Loading Time"
                                        validateAsNumber={true}
                                        handleOnChange={(e: any) =>
                                          handleOnChange()
                                        }
                                        rules={[{ validator: validateNonNegativeInteger }]} 
                                        max={3}
                                      />
                                      <InputBox
                                        restField={restWorkCenterField}
                                        label="Cycle Time"
                                        name={[wcName, 'cycleTime']}
                                        required={totalcountget(wcIndex)}
                                        inputDefaultValue="0"
                                        inputPlaceholder="Cycle Time"
                                        validateAsNumber={true}
                                        handleOnChange={(e: any) =>
                                          handleOnChange()
                                        }
                                        rules={[{ validator: validateNonNegativeInteger }]} 
                                        max={3}
                                      />
                                      <InputBox
                                        restField={restWorkCenterField}
                                        label="Part Unloading Time"
                                        name={[wcName, 'partUnloadingTime']}
                                        required={totalcountget(wcIndex)}
                                        inputDefaultValue="0"
                                        inputPlaceholder="Part Unloading Time"
                                        validateAsNumber={true}
                                        handleOnChange={(e: any) =>
                                          handleOnChange()
                                        }
                                        rules={[{ validator: validateNonNegativeInteger }]} 
                                        max={3}
                                      />
                                      <InputBox
                                        restField={restWorkCenterField}
                                        label="Fixture Unloading Time"
                                        name={[wcName, 'fixtureUnloadingTime']}
                                        required={totalcountget(wcIndex)}
                                        inputDefaultValue="0"
                                        inputPlaceholder="Fixture Unloading Time"
                                        validateAsNumber={true}
                                        handleOnChange={(e: any) =>
                                          handleOnChange()
                                        }
                                        rules={[{ validator: validateNonNegativeInteger }]} 
                                        max={3}
                                      />
                                      <InputBox
                                        restField={restWorkCenterField}
                                        label="Transit Time"
                                        name={[wcName, 'transitTime']}
                                        required={totalcountget(wcIndex)}
                                        inputDefaultValue="0"
                                        inputPlaceholder="Transit Time"
                                        validateAsNumber={true}
                                        handleOnChange={(e: any) =>
                                          handleOnChange()
                                        }
                                        rules={[{ validator: validateNonNegativeInteger }]} 
                                        max={3}
                                      />

                                      {partId && (
                                        <InputBox
                                          restField={restWorkCenterField}
                                          label="Total Operation Time"
                                          name={[wcName, 'totalOperationTime']}
                                          required={false}
                                          inputPlaceholder="Total Operation Time"
                                          validateAsNumber={false}
                                          inputDefaultValue="0"
                                          validateAsString={false}
                                          disabled={true}
                                        />
                                      )}
                                      <InputBox
                                        restField={restWorkCenterField}
                                        label="Program Name"
                                        name={[wcName, 'programName']}
                                        required={false}
                                        inputPlaceholder="Program Name"
                                        validateAsNumber={false}
                                        validateAsString={false}
                                        max={20}
                                      />
                                      {!partId && (
                                        <InputBox
                                          restField={restWorkCenterField}
                                          label="Total Time"
                                          name={[wcName, 'TotalTime']}
                                          required={false}
                                          disabled={true}
                                          inputDefaultValue="0"
                                          inputPlaceholder="Total Time"
                                          validateAsNumber={true}
                                          max={3}
                                        />
                                      )}
                                    </div>
                                  </div>
                                )
                              }
                              )}

                              <div className="grid grid-cols-3 gap-x-6 gap-y-4">
                                <Button
                                  type="dashed"
                                  onClick={() => addWorkCenter()}
                                  className="add-workcenter-btn btn-main"
                                >
                                  {addIcon} Add Alternate Work Center
                                </Button>
                              </div>
                            </>
                          )}
                        </Form.List>

                      </div>
                    </Panel>
                  </>
                ))}
              </Collapse>
              <div className="grid grid-cols-3 gap-x-6 gap-y-4">
                <Button
                  type="dashed"
                  onClick={handleAdd}
                  className="add-field-btn btn-main"
                >
                  Add Operation
                </Button>

                {/* <Button
                type="dashed"
                onClick={() =>
                  add({
                    partOperationWorkCenters: [{}],
                  })
                }
                className="add-field-btn btn-main"
              >
                {addIcon} Add Operation
              </Button> */}
              </div>
            </>
          )}
        </Form.List>
      </div>
      {/* <PreProcess />
      <IntermediateProcess /> */}
    </>
  )
}

export default MachinePartAddMore
