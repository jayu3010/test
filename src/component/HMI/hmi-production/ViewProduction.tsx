import { pauseIcon, playIcon, viewIcon } from '@/utils/icons/icons'
import { Button, Card, Col, message, Row, Switch } from 'antd'
import React, { useEffect, useState } from 'react'
import ZoomImage from './ZoomImage/ZoomImage'
import { useDispatch, useSelector } from 'react-redux'
import { reduxSliceData, setActiveSequenceIndex } from '@/utils/redux/features/reduxData'
import service from '@/utils/service/service'
import HMIFetch from '@/utils/useFetchData/HMIFetch'
import ViewHMI from './ViewHMI/ViewHMI'
import Remark from '../remark/Remark'

const ViewProduction = ({ onChangeMaterial }: any) => {
  const { addData }: any = HMIFetch();
  const { machinepart, MachinePartDetails, machinePartLots, startOparation, activeNextIndex } = useSelector((state: any) => state.reduxData);
  const dispatch = useDispatch()

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [ishowModalRemark, setIshowModalRemark] = useState(false)
  const [currentActiveIndex, setCurrentActiveIndex] = useState<any>(0);
  const [currentPartIndex, setCurrentPartIndex] = useState(0); // Track the current part (object)
  const [currentActiveTimeIndex, setCurrentActiveTimeIndex] = useState(0);
  const times = [
    { name: 'fixtureSetupTime', display: 'Fixture Setup Time', status: false },
    { name: 'toolSetupTime', display: 'Tool Setup Time', status: false },
    { name: 'partLoadingTime', display: 'Part Loading Time', status: false },
    { name: 'cycleTime', display: 'Cycle Time', status: false },
    { name: 'partUnloadingTime', display: 'Part Unloading Time', status: false },
    { name: 'fixtureUnloadingTime', display: 'Fixture Unloading Time', status: false },
    { name: 'transitTime', display: 'Transit Time', status: false },
  ];


  
  const onStopTime = async () => {
    // Stop the current time and move to the next one
    setCurrentActiveTimeIndex((prevIndex) => {
      let nextIndex = prevIndex + 1;

      // Get the current machine part (object)
      const currentMachinePart = MachinePartDetails?.processTimes[currentPartIndex];
      if (!currentMachinePart) return prevIndex; // Exit if no valid part is found

      // Skip times with a zero value
      while (
        nextIndex < times.length &&
        currentMachinePart[times[nextIndex]?.name] === 0
      ) {
        nextIndex += 1;
      }

      // If the current part's times are finished, move to the next part
      if (nextIndex >= times.length) {
        setCurrentPartIndex((prevPartIndex) => {
          let nextPartIndex = prevPartIndex + 1;

          // Ensure next part exists
          if (nextPartIndex < MachinePartDetails?.processTimes?.length) {
            setCurrentActiveTimeIndex(0); // Reset time index for the next part
            return nextPartIndex;
          }

          return prevPartIndex; // Stay on the current part if no more parts exist
        });
        return 0; // Reset time index for the next part
      }


      // Dispatch to Redux for further processing, if needed
      dispatch(reduxSliceData({ key: 'activeNextIndex', data: nextIndex }));

      return nextIndex < times.length ? nextIndex : prevIndex;
    });
  };

  const renderButton = (timeName, actualIndex) => {
    return (
      <Button
      icon={pauseIcon}
      onClick={() => onStopTime()}
        // disabled={currentActiveTimeIndex !== actualIndex} // Button enabled only for the active time index
      >
        {currentActiveTimeIndex === actualIndex ? 'Pause' : ''}
      </Button>
    );
  };



  useEffect(() => {
    if (startOparation == 0) {
      setCurrentActiveIndex(0)
    }

  }, [startOparation])

  useEffect(() => {
    const machinePartLotData = machinepart?.filter((item: any) => item?.partId === MachinePartDetails?.partId);
    if (machinePartLotData) {
      dispatch(
        reduxSliceData({ key: 'machinePartLots', data: machinePartLotData[0] }),
      )
    }

  }, [MachinePartDetails])

  const showModal = () => {
    setIsModalVisible(true)
  }

  const showModalRemark = () => {
    setIshowModalRemark(true);
  }
 
  console.log("🚀 ~ renderButton ~ currentActiveIndex:", currentActiveIndex)
  if (!MachinePartDetails?.processTimes?.length) {
    return <p>No machine part details available.</p>;
  }

  const currentMachinePart = MachinePartDetails?.processTimes?.[currentPartIndex];
  return (
    <>
      <Card
        title={`Production No. ${MachinePartDetails?.prodOrderNo}`}
        bordered={false}
      >
        <Row>
          <Col span={6}>
            <div className="production-details">
              <p>Production No.</p>
              <p>
                <strong>{MachinePartDetails?.prodOrderNo}</strong>
              </p>
            </div>

            <div className="production-details">
              <p>Part Name:</p>
              <p>
                <strong>{MachinePartDetails?.partName}</strong>
              </p>
            </div>

            <div className="production-details">
              <p>Machine Shop</p>
              <p>
                <strong>{machinePartLots?.machineShopName}</strong>
              </p>
            </div>
          </Col>

          <Col span={6}>
            <div className="production-details">
              <p>Part No.</p>
              <p>
                <strong>{MachinePartDetails?.partNo}</strong>
              </p>
            </div>
            MachinePartDetails
            <div className="production-details">
              <p>Program Name</p>
              <p>
                <strong>{MachinePartDetails?.programName}</strong>
              </p>
            </div>

            <div className="production-details">
              <p>Work Center</p>
              <p className="workcenter">
                <strong>{MachinePartDetails?.workCenterName}</strong>
              </p>
            </div>
          </Col>

          <Col span={6}>
            <div className="production-details">
              <p>OP. NO.</p>
              <p>
                <strong>{MachinePartDetails?.operationNo}</strong>
              </p>
            </div>

            <div className="production-details">
              <p>Drawing No. </p>
              <p>
                <strong>{MachinePartDetails?.drawingNo}</strong>
              </p>
            </div>

            <Button disabled className="btn-outline" onClick={showModal}>
              {viewIcon}View Drawing
            </Button>
          </Col>

          <Col span={6}>
            <div className="operator-details">
              <p>Operator</p>
              {MachinePartDetails?.workCenterOperators?.map(
                (v: any, i: any) => (
                  <p>
                    <strong>
                      {v?.operatorName} - {v?.empCode}
                    </strong>
                  </p>
                ),
              )}
            </div>
          </Col>
        </Row>

        <div className="time-setup">
          <div className="target-time">
            <h2>
              <strong>Target Time </strong>
            </h2>
            <Row>
              {times.map((time, actualIndex) => {
                if (currentMachinePart?.[time.name] > 0) {
                  return (
                    <Col span={7} className="flex" key={time.name}>
                      <div>
                        <p>{time.display}</p>
                        <p>
                          <strong>{currentMachinePart?.[time.name]}</strong>
                        </p>
                      </div>
                      <div className="flex">
                        {renderButton(time.display, actualIndex)}
                      </div>
                    </Col>
                  );
                }
                return null; // Skip items where the value is 0
              })}
            </Row>

          </div>

          <div className="schedule-time">
            <h2>
              <strong>Schedule Time</strong>
            </h2>
            <Row>
              <Col span={7} className="schedule-box first">
                <p>Start</p>
                <p>
                  <strong>
                    12/06/2024 <span>1:51 AM</span>
                  </strong>
                </p>
              </Col>

              <Col span={7} className="schedule-box second">
                <p>Start</p>
                <p>
                  <strong>
                    12/06/2024 <span>1:51 AM</span>
                  </strong>
                </p>
              </Col>

              <Col span={9}>
                <div className="schedule-switch flex">
                  <Switch
                    checked={MachinePartDetails?.receivedQty > 0 ? true : false}
                    onChange={onChangeMaterial}
                  />
                  <strong>Material Status</strong>
                </div>
              </Col>
            </Row>
          </div>

          <div className="schedule-time">
            <h2>
              <strong>First Setup</strong>
            </h2>
            <Row>
              <Col span={7} className="schedule-box first">
                <p>Start</p>
                <p>
                  <strong>
                    12/06/2024 <span>1:51 AM</span>
                  </strong>
                </p>
              </Col>

              <Col span={7} className="schedule-box second">
                <p>Finish</p>
                <p>
                  <strong>
                    12/06/2024 <span>1:51 AM</span>
                  </strong>
                </p>
              </Col>

              <Col span={7} className="schedule-box third">
                <p>Total</p>
                <p>
                  <strong> 4s</strong>
                </p>
              </Col>
            </Row>
          </div>

          <div className="remark-btn">
            <Button className="btn-main" onClick={showModalRemark}>Remark</Button>
          </div>
        </div>
      </Card>

      <ZoomImage
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
      <ViewHMI
        title="Received QTY"
        isModalVisible={ishowModalRemark}
        setIsModalVisible={setIshowModalRemark}
        body={
          <>
            <div className="block-hmi-ctnt">
              <div className="w-full resulted-data-table">
                <Remark setIshowModalRemark={setIshowModalRemark} />
              </div>
            </div>
          </>
        }
      />
    </>
  )
}

export default ViewProduction
