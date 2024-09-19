import { Button, Form, Input, message } from 'antd'
import { useEffect } from 'react'
import InputBox from '@/component/input/Input'
import { useDispatch, useSelector } from 'react-redux'
import useFetchData from '@/utils/useFetchData/customFetchData'
import service from '@/utils/service/service'
import { cpSync } from 'fs'
import { reduxSliceData } from '@/utils/redux/features/reduxData'


const { TextArea } = Input;

const Remark = ({setIshowModalRemark }: any) => {
    const dispatch = useDispatch();
  const { MachinePartDetails,machinePartLots} = useSelector((state: any) => state.reduxData)
 
  const { addData }: any = useFetchData();
  const [form] = Form.useForm()

  
  
  const handleSubmit = async (data: any) => {
    const lotId = machinePartLots?.lotId;
    const partOperationId = machinePartLots?.partOperationId || 0
      const body = {
        ...data,
        lotId: lotId,
        operationNo: partOperationId,
      }
      const addDataRes = await addData(body, service?.API_URL?.hmi?.remarks)
      if (addDataRes?.apiStatus) {
        form.resetFields();
        
        setIshowModalRemark(false)
        message.success(addDataRes?.apiMessage)
      }
    } 
   

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
    <div className="operation-title mb-5"></div>
    <div className="grid grid-cols-1 gap-x-6 gap-y-2">
      <Form.Item
        name="remarks"
        label={<strong>Remark</strong>}
        rules={[
          { required: true, message: 'Please enter the remark!' },
          { min: 10, message: 'Remark must be at least 10 characters long' },
        ]}
        className="col-span-2"
      >
        <TextArea rows={6} placeholder="Enter your text here" />
      </Form.Item>
    </div>
    <Button type="primary" htmlType="submit" className="btn-main">
      Submit
    </Button>
  </Form>
  )
}

export default Remark
