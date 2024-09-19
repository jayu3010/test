import { Button, Form, Input, message } from 'antd'
import { useEffect } from 'react'
import InputBox from '@/component/input/Input'
import { useDispatch, useSelector } from 'react-redux'
import useFetchData from '@/utils/useFetchData/customFetchData'
import service from '@/utils/service/service'
import { cpSync } from 'fs'
import { reduxSliceData } from '@/utils/redux/features/reduxData'

const ReceivedQty = ({setIsModalVisible }: any) => {
    const dispatch = useDispatch();
  const { MachinePartDetails,machinePartLots} = useSelector((state: any) => state.reduxData)
 
  const { addData }: any = useFetchData();
  const [form] = Form.useForm()

  const batchQty = MachinePartDetails?.batchQty || 0
  const operationNo = MachinePartDetails?.operationNo || 0
  const receivedqry = MachinePartDetails?.receivedQty || 0

  useEffect(() => {
    if (MachinePartDetails) {
      form.setFieldValue('batchQty', batchQty)
      form.setFieldValue('receivedQty', receivedqry)
    }
  }, [MachinePartDetails])
  
  const lotId = machinePartLots?.lotId
  const handleSubmit = async (data: any) => {
    delete data?.batchQty
    const { receivedQty, newReceivedQty } = data
    const totalQty = Number(receivedQty) + Number(newReceivedQty)

    if (totalQty <= batchQty) {
      const body = {
        ...data,
        lotId: lotId,
        operationNo: operationNo,
        receivedQty: newReceivedQty,
      }
      delete body?.newReceivedQty
      const addDataRes = await addData(body, service?.API_URL?.hmi?.receivedqty)
      if (addDataRes?.apiStatus) {
        form.resetFields();
        const updatedData = {
            ...MachinePartDetails,
            receivedQty:Number(MachinePartDetails.receivedQty) + Number(newReceivedQty)
          };
        dispatch(reduxSliceData({ key: 'MachinePartDetails', data: updatedData }))

        setIsModalVisible(false)
        message.success(addDataRes?.apiMessage)
      }
    } else {
      message.error(
        `New Received Qty cannot exceed available Batch Qty of ${
          batchQty - receivedQty
        }`,
      )
    }
  }


  return (
    <Form form={form} onFinish={handleSubmit}>
      <div className="operation-title mb-5"></div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-2">
        {/* Batch Qty Input (disabled) */}
        <Form.Item>
          <label>
            <strong>Batch Qty</strong>
          </label>
          <InputBox
            label=""
            name="batchQty"
            required={false}
            inputPlaceholder="Batch Qty"
            validateAsNumber
            disabled
          />
        </Form.Item>
        <Form.Item>
          <label>
            <strong>Received Qty</strong>
          </label>
          <InputBox
            label=""
            name="receivedQty"
            required={false}
            inputPlaceholder="Received Qty"
            validateAsNumber
            disabled
          />
        </Form.Item>

        {/* New Received Qty (Editable by user) */}
        <Form.Item>
          <label>
            <strong>New Received Qty</strong>
          </label>
          <InputBox
            label=""
            name="newReceivedQty"
            required={false}
            inputPlaceholder="Enter New Received Qty"
            validateAsNumber
            inputDefaultValue="0"
          />
        </Form.Item>
      </div>

      <Button type="primary" htmlType="submit" className="btn-main">
        Submit
      </Button>
    </Form>
  )
}

export default ReceivedQty
