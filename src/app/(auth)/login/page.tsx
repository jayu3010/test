'use client'
import React from 'react'
import Image from 'next/image';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import InputBox from '@/component/input/Input';

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const LoginPage = () => {
  return (
    <div className='login_layout flex'>
       <div className='login_left_part w-full'>
          <div className="demo-logo-vertical">
            <Image
              src={'/images/logo.svg'}
              width={500}
              height={500}
              alt="AlpineMach"
              className="h-[30px] w-[auto]"
            />
          </div>
          <div className='login_banner mt-8'>
          <Image
              src={'/images/login_sc.svg'}
              width={907}
              height={582}
              alt="AlpineMach"
              className=""
            />
          </div>
          <div className='left_description flex'>
            <div className='left_time-wrrap w-full'>
              <span><strong>Wed</strong> Sep</span>
              <h1>10</h1>
              <p>04:11 PM</p>
            </div>

            <div className='left_leave-wrap w-full'>
              <div className='leave_details flex'><span><strong>02</strong> OCT, WED</span><p>Mahatma Gandhi Jayanti</p></div>
              <div className='leave_details flex'><span><strong>12</strong> OCT, SAT</span><p>Dussehra</p></div>
              <div className='leave_details flex'><span><strong>31</strong> OCT, SAT</span><p>Diwali/Deepavali</p></div>
            </div>

            <div className='left_sift-time w-full'>
              <p><strong>Shift Change Notification</strong></p>
              <p>Due to an increase in production demand, all shifts will be adjusted by 30 minutes starting from Monday. Morning shift will now start at 7:00 AM,... <span className='read-more'>More</span></p>
            </div>
          </div>
       </div>

       <div className='login_right_part w-full text-center'>
        <div className='login_form-wrap'>
          <h2>Smart PPS</h2>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item>
            <label><strong>Username</strong></label>
            <InputBox
              label=""
              name="unitName"
              required
              inputPlaceholder="Enter username"
              validateAsNumber={false}
              validateAsString={false}
              max={20}
            />
            </Form.Item>

            <Form.Item>
              <label><strong>Password</strong></label>
              <InputBox
              label=""
              name="password"
              required
              inputPlaceholder="Enter password"
              validateAsNumber={false}
              validateAsString={false}
              max={20}
            />
            </Form.Item>
            <div className='form-frgt-btn'>
               <button className='forgot-btn'>Forgot Password?</button>
            </div>
            <Form.Item>
              <Button type="primary" htmlType="submit" className='btn-main'>
                Login
              </Button>
            </Form.Item>
           </Form>

           <div className='powered-msg flex'>
            <p>Powered By</p>
            <Image
              src={'/images/aqe-digital-logo.svg'}
              width={78}
              height={67}
              alt="Aqe Digital"
              className=""
            />
           </div>
        </div>
       </div>
    </div>
  )
}

export default LoginPage