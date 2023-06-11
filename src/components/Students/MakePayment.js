import { Button, DatePicker, Form, InputNumber, Modal } from 'antd';
import React from 'react'
import './MakePayment.css';

const MakePayment = ({
    isVisible = false,
    onClose = () => {},
    studentData = {},
}) => {
    const {name} = studentData;
    const formItemLayout = {
      labelCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 8,
        },
      },
      wrapperCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 16,
        },
      },
    }
  return (
    <Modal
        open={isVisible}
        className="create-student-modal"
        title={<div className='modal-header'>
            <p className='modal-title'>Make payment</p>
        </div>}
        onCancel={onClose}
        children={<div className='make-payment-body'>
            <p>Pay dues for <b>{name}</b></p>
            <Form
                {...formItemLayout}
                onFinish={(values) => console.log(values)}
            >
                <Form.Item name={"amount"} label="Amount">
                    <InputNumber/>
                </Form.Item>
                <Form.Item name={"paymentDate"} label="Payment date">
                    <DatePicker/>
                </Form.Item>
                <Form.Item name={"forMonthYear"} label="For Month / Year">
                    <DatePicker picker='month'/>
                </Form.Item>
                <Form.Item className='footer'>
                    <Button type='primary' htmlType='submit' children="Add payment"/>
                </Form.Item>
            </Form>
        </div>}
        width={800}
        footer={() => <></>}
    />
  )
}

export default MakePayment;