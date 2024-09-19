import { convertDateTime, CurrentDate, getCurrentMonthDates, getFutureDate } from '@/utils/functions/commonFunction';
import { reduxSliceData } from '@/utils/redux/features/reduxData';
import service from '@/utils/service/service';
import HMIFetch from '@/utils/useFetchData/HMIFetch';
import { Button, Card, Col } from 'antd';
import React, {useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ProductionSidebar = ({ activeCard, cardActive,handlePartDetails }: any) => {
  console.log("🚀 ~ ProductionSidebar ~ cardActive:", cardActive)
  
  const { addData }: any = HMIFetch();
  const dispatch = useDispatch();
  const {machinepart,workCenterId,activeOperation} = useSelector((state: any) => state.reduxData);
  const [activeButton, setActiveButton] = useState('1');

  const handleButtonClick = async (id: string) => {
    setActiveButton(id);
    const commonBody = {
      workCenterId: workCenterId,
      startDate: null,
    };
  
    let body:any = { ...commonBody };
  
    if (id === '1') {
      body.startDate = null;
      body.endDate = CurrentDate(new Date());
    } else if (id === '2') {
      body.startDate = null;
      body.endDate = getFutureDate(7);
    } else if (id === '3') {
      const { startDate, endDate } = getCurrentMonthDates();
      body.startDate = null;
      body.endDate = getFutureDate(30);
    } else if (id === '4') {
      body.startDate = null;
      body.endDate = null;
    } else {
      return;
    }
  
    const machinePartDataGet = await addData(body, service?.API_URL?.hmi?.listing);
    if (machinePartDataGet) {
      const { apiData } = machinePartDataGet;
      dispatch(reduxSliceData({ key: 'machinepart', data: apiData?.hmiProductionOrders }));
    }
  };



  return (
    <>
    <div className="block-left-part">
      <Button.Group
        style={{ width: '100%', marginBottom: '10px' }}
        className="block-time-btns"
      >
        <Button
          className={activeButton === '1' ? 'btn-main' : 'btn-outline'}
          type={activeButton === '1' ? 'primary' : 'default'}
          onClick={() => handleButtonClick('1')}
        >
          Today
        </Button>
        <Button
          className={activeButton === '2' ? 'btn-main' : 'btn-outline'}
          type={activeButton === '2' ? 'primary' : 'default'}
          onClick={() => handleButtonClick('2')}
        >
          Week
        </Button>
        <Button
          className={activeButton === '3' ? 'btn-main' : 'btn-outline'}
          type={activeButton === '3' ? 'primary' : 'default'}
          onClick={() => handleButtonClick('3')}
        >
          Month
        </Button>
        <Button
          className={activeButton === '4' ? 'btn-main' : 'btn-outline'}
          type={activeButton === '4' ? 'primary' : 'default'}
          onClick={() => handleButtonClick('4')}
        >
          All
        </Button>
      </Button.Group>
      {machinepart?.length > 0 && (machinepart?.map((v: any, i: any) => {
        return(
        <div className="left-machine-part" key={i} onClick={(e)=>handlePartDetails(v?.lotId,v?.operationNo)}>
          <Col>
            <Button size="small" type="dashed" className="pending-btn">
              {v?.workStatus}
            </Button>
          </Col>
          <Card
            className={`${ (cardActive.lotId===v?.lotId && cardActive.operationNo===v?.operationNo)? 'active' : ''}`
          }
            onClick={() => activeCard(v)}
          >
            <div className="flex space-between">
              <div className="left-machine machine-details">
                <p>
                  PO. NO.
                  <br />
                  <strong>{v?.prodOrderNo}</strong>
                </p>
                <p>
                  Part No.
                  <br />
                  <strong>{v?.partName}</strong>
                </p>
                <p>
                  Machine Shop
                  <br />
                  <strong>{v.machineShopName}</strong>
                </p>
              </div>
              <div className="rigth-machine machine-details">
                <p>
                  OP. NO.
                  <br />
                  <strong>{v.operationNo}</strong>
                </p>
                <p>
                  Part Name
                  <br />
                  <strong>{v.partName}</strong>
                </p>
                <p className="workcenter">
                  Work Center
                  <br />
                  <strong>{v.workCenterName}</strong>
                </p>
              </div>
            </div>
            <Button type="primary" className="btn-main">
              Batch QTY: {v?.qty}
            </Button>
            <Button className="btn-outline">
              Start Time {convertDateTime(v.scheduleStartDateTime)}
            </Button>
          </Card>
        </div>
       )})
      )}
    </div>
    </>
  );
};

export default ProductionSidebar;
