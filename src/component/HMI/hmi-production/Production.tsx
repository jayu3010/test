import { Button, Layout, Typography } from 'antd'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Scrollablebox from './Scrollablebox'
import ProductionSidebar from './ProductionSidebar'
import useFetchData from '@/utils/useFetchData/customFetchData'
import service from '@/utils/service/service'
import { useDispatch, useSelector } from 'react-redux'
import ViewProduction from './ViewProduction'
import { PlusCircleOutlined } from '@ant-design/icons'
import ViewHMI from './ViewHMI/ViewHMI'
import ReceivedQty from './receivedQty/ReceivedQty'
import { reduxSliceData } from '@/utils/redux/features/reduxData'
import HMIFetch from '@/utils/useFetchData/HMIFetch'

const Production = () => {
  const { getQueryFetch } = useFetchData()
  const { addData } = HMIFetch()
  const dispatch = useDispatch()
  const [isMatieialStatus, setIsMatieialStatus] = useState(false)
  const [cardActive, setCardActive] = useState<any>({
    lotId: null,
    operationNo: null
  })
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [startButton, setStartButton] = useState(false)


  const { machinepart, MachinePartDetails, activeOperation} = useSelector(
    (state: any) => state.reduxData
  )

  const activeCard = (activedata: any) => {
    setCardActive({ ...cardActive, lotId: activedata.lotId, operationNo: activedata.operationNo })
  }
  const showModal = () => setIsModalVisible(true)
  const onChangeMaterial = (checked: boolean) => setIsMatieialStatus(!checked)

  const totalShortage = useMemo(() => {
    const { receivedQty = 0, producedQty = 0, scrappedPart = 0 } = MachinePartDetails || {}
    return Number(receivedQty) - Number(producedQty) + Number(scrappedPart)
    
  }, [MachinePartDetails])
  console.log("🚀 ~ Production ~ MachinePartDetails:", MachinePartDetails)
  console.log("🚀 ~ totalShortage ~ totalShortage:", totalShortage)

  const handlePartDetails = useCallback(async (lotId: any, operationNo: any) => {
    const queryParams = { lotId, operationNo }
    const apiUrl = service.API_URL.hmi.productionsDetails
    const machineResData = await getQueryFetch(queryParams, apiUrl)
    if (machineResData) {
      dispatch(reduxSliceData({ key: 'MachinePartDetails', data: machineResData[0] }))
    }
  }, [dispatch, getQueryFetch])

  useEffect(() => {
    if (machinepart?.length > 0) {
      const initialPart = machinepart[0] || {}
      const { lotId, operationNo } =  initialPart
      handlePartDetails(lotId, operationNo)

      if (activeOperation !=null) {
        setCardActive({ ...cardActive, lotId: activeOperation.lotId, operationNo: activeOperation.operationNo })
      }
      else {
        setCardActive({ ...cardActive, lotId: initialPart.lotId, operationNo: initialPart.operationNo })
      }
    }
  }, [machinepart, activeOperation])

  const startOpration = async (type: 'start' | 'pause') => {
    const lotId = MachinePartDetails?.lotId
    const partOperationId = MachinePartDetails?.partOperationId || 0
    const operationNo = MachinePartDetails?.operationNo || 0
    const sequenceNo = Number(MachinePartDetails?.producedQty) + 1 || 0
    const workCenterId = MachinePartDetails?.workCenterId || 0
    const body = {
      lotId,
      partOperationId,
      operationNo,
      sequenceNo,
      workCenterId,
      isPause: type === 'pause',
    }
    const addDataRes = await addData(body, service.API_URL.hmi.allocations)
    if (addDataRes?.apiStatus) {
      setStartButton(type=='start'?  true:false)
      // dispatch(reduxSliceData({ key: 'startOparation', data: 0 }))
    }
  }

  return (
    <>
      {machinepart?.length > 0 && (
        <>
          <div className="flex w-full machine-part-data">
            <ProductionSidebar
              activeCard={activeCard}
              cardActive={cardActive}
              handlePartDetails={handlePartDetails}
            />

            <div className="block-right-part">
              <Layout style={{ padding: '20px' }} className="layput-part">
                <Layout>
                  <div>
                    <Scrollablebox machinePartDetails={MachinePartDetails} />
                  </div>
                  <div className="right-part-ctnt">
                    <div className="gap-3 flex right-part-main">
                      <div className="right-left-part">
                        <ViewProduction
                          machinePartDetails={MachinePartDetails}
                          onChangeMaterial={onChangeMaterial}
                        />
                      </div>
                      <div className="right-right-part flex">
                        <div className="batch-part">
                          <div className="batch-details-main">
                            <BatchDetails MachinePartDetails={MachinePartDetails} totalShortage={totalShortage} showModal={showModal} />
                          </div>
                        </div>
                        <ButtonGroup
                          MachinePartDetails={MachinePartDetails}
                          // startButtonDisable={startButtonDisable}
                          activeOperation={activeOperation}
                          startOpration={startOpration}
                          startButton={startButton}
                        />
                      </div>
                    </div>
                  </div>
                </Layout>
              </Layout>
            </div>
          </div>
          <ViewHMI
            title="Received QTY"
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
            body={
              <>
                <div className="block-hmi-ctnt">
                  <div className="w-full resulted-data-table">
                    <ReceivedQty setIsModalVisible={setIsModalVisible} />
                  </div>
                </div>
              </>
            }
          />
        </>
      )}
    </>
  )
}


export default Production

const BatchDetails = ({ MachinePartDetails, totalShortage, showModal }: any) => {
let toProduce=Number(MachinePartDetails?.receivedQty)-Number(MachinePartDetails?.producedQty)

  return(
  <>
    {[
      { label: 'Batch QTY', value: MachinePartDetails?.batchQty },
      { label: 'Received QTY', value: MachinePartDetails?.receivedQty || 0, icon: <PlusCircleOutlined onClick={showModal} /> },
      { label: 'To Produce', value: toProduce || 0 },
      { label: 'Produced QTY', value: MachinePartDetails?.producedQty || 0 },
      { label: 'Good Parts', value: MachinePartDetails?.goodPart || 0 },
      { label: 'Scrapped Parts', value: MachinePartDetails?.scrappedPart || 0 },
      { label: 'Shortage', value: totalShortage },
    ].map((item, index) => (
      <div key={index} className="batch-details flex">
        <p><strong>{item.label} {item?.icon}</strong></p>
        <p><strong>{item.value}</strong></p>
      </div>
    ))}
  </>
)}
const ButtonGroup = ({ MachinePartDetails, activeOperation, startOpration,startButton }: any) => {

  // Determine if activeOperation exists
  const isActiveOperationAvailable = activeOperation !== null && activeOperation !== undefined;
  // Determine if the lotId exists and receivedQty is valid

  const isMatchingLotId = isActiveOperationAvailable && MachinePartDetails?.lotId === activeOperation?.lotId && MachinePartDetails?.operationNo === activeOperation?.operationNo;
  // Disable the start button if activeOperation exists and either:
  // 1. lotId does not match
  // 2. receivedQty is 0
  const shouldDisableStartButton = (isActiveOperationAvailable && MachinePartDetails?.lotId !== activeOperation?.lotId) ||
    MachinePartDetails?.receivedQty === 0;
  return (
    <div className="batch-part">
      <div className="batch-details">
        <p><strong>Final Setup</strong></p>
      </div>

      {isMatchingLotId ||startButton  ? (
        <>
          <Button block className="btn-main" onClick={() => startOpration('pause')}>Pause</Button>
          <Button block className="btn-outline" onClick={() => startOpration('finish')}>Finish</Button>
        </>
      ) : (
        <Button
          block
          className="btn-start"
          onClick={() => startOpration('start')}
        >
          START
        </Button>
      )}
    </div>
  );
}








