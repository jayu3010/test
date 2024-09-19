'use client'
import React, { useEffect, useRef, useState } from 'react';
import { Carousel, Row, Col, Button } from 'antd';

import { lftarrow, rgtarrow } from '@/utils/icons/icons';
import { useSelector } from 'react-redux';
const Scrollablebox = ({ machinePartDetails }: any) => {
  const [slidesToShow, setSlidesToShow] = useState(machinePartDetails?.partOperations?.length);
  const modals = useSelector((state: any) => state.reduxData);

  const handleResize = () => {
    const width = window.innerWidth;

    if (width < 576) {
      setSlidesToShow(1);
    } else if (width >= 576 && width < 768) {
      setSlidesToShow(2);
    } else if (width >= 768 && width < 1024) {
      setSlidesToShow(3);
    } else if (width >= 1024 && width < 1240) {
      setSlidesToShow(3);
    } else if (width >= 1240 && width < 1400) {
      setSlidesToShow(7);
    } else if (width >= 1400 && width < 1536) {
      setSlidesToShow(7);
    } else if (width >= 1536 && width < 1700) {
      setSlidesToShow(7);
    } else {
      setSlidesToShow(7); // Default number of slides on larger screens
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    // Initial setting
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const currentOperationNo = Number(machinePartDetails?.operationNo);
  const currentIndex = machinePartDetails?.partOperations?.findIndex(
    (group) => group.operationNo === currentOperationNo
  );
  
  return (
    <div style={{ position: 'relative' }}>
      <Carousel
        dots={false}
        infinite={false}
        slidesToShow={slidesToShow}
        arrows={true}
        autoplay={false}
        slidesToScroll={1}
        variableWidth={true}
        // initialSlide={currentIndex}
        nextArrow={<Button
          type="primary"
          shape="circle"
          icon={rgtarrow}
          style={{
            position: 'absolute',
            top: '50%',
            right: '0',
            transform: 'translateY(-50%)',
            zIndex: 1,
          }}
        />}
        prevArrow={<Button
          type="primary"
          shape="circle"
          icon={lftarrow}
          style={{
            position: 'absolute',
            top: '50%',
            left: '0',
            transform: 'translateY(-50%)',
            zIndex: 1,
          }}
        />}

      >
        {machinePartDetails?.partOperations?.map((group, index) => {
          let backgroundColor;
          const currentOperationNo = Number(machinePartDetails.operationNo);

          if (group.operationNo === currentOperationNo) {
            backgroundColor = '#16B364'; // Current operation
          } else if (group.operationNo < currentOperationNo) {
            backgroundColor = '#007AFF'; // Completed operations before current
          } else {
            backgroundColor = '#929292'; // Future operations after current
          }
          return (

            <div key={index}>
              <Row gutter={16}>
                {/* <div className='slide-col-line'></div> */}
                <div key={index} className="workcenter-item-group w-[200px]" >
                  <div
                    className={`machine-items `}
                    style={{ background: backgroundColor }}
                  >
                    {group.workCenterName} <br/> {group.operationNo}
                  </div>
                </div>
              </Row>
            </div>
          )
        })}
      </Carousel>

    </div>
  );
};

export default Scrollablebox;
