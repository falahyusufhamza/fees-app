import { Button, DatePicker, Form, Input, InputNumber, Modal, Select, message } from 'antd';
import React, {useState} from 'react'
import './MakePayment.css';
import axios from 'axios';
import { API_URLS } from '../../apiUrls';

const MakePayment = ({
    isVisible = false,
    pendingFeeData = [],
    currentFamily = {},
    setIsPaymentModalVisible = () => {},
    refreshFeeList = () => {},
}) => {
  const [isPaymentInProgress, setIsPaymentInProgress] = useState(false);
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


    const makePayment = (data) => {
      if (data?.amount > currentFamily?.pendingFamilyDues) {
        message.error("You cannot pay money in advance! The advance payment feature is in progress");
        return;
      }

      let amountBreakdown = {};
      let paidAmount = data?.amount;

      pendingFeeData.forEach((item) => {
        if (item?.pendingAmount >= paidAmount) {
          amountBreakdown[item?.feeId] = {
            actual: item?.pendingAmount,
            paid: paidAmount,
          };
          paidAmount = 0;
        } else {
          amountBreakdown[item?.feeId] = {
            actual: item?.pendingAmount,
            paid: item?.pendingAmount,
          };
          paidAmount = paidAmount - item?.pendingAmount;
        }
      });
      setIsPaymentInProgress(true);
      axios.post(API_URLS.MAKE_PAYMENT, {
          ...data,
          amountBreakdown,
    }).then(response => {
        if (response?.data?.success) {
          setIsPaymentInProgress(false);
          message?.success("Successfully made payment!");
          setIsPaymentModalVisible(false);
          refreshFeeList();
        } else {
          throw new Error("Something went wrong!");
        }
    }).catch(err => {
        console.log(err);
        setIsPaymentInProgress(false);
        message.error(err?.data?.message || "Failed to make payment")
    })
    }

  return (
    <Modal
        open={isVisible}
        destroyOnClose={true}
        className="create-student-modal"
        title={<div className='modal-header'>
            <p className='modal-title'>Make payment</p>
        </div>}
        onCancel={() => setIsPaymentModalVisible(false)}
        children={<div className='make-payment-body'>
            <p>Pay dues for <b>{currentFamily?.family?.familyName}</b></p>
            <Form
                {...formItemLayout}
                onFinish={(values) => makePayment(values)}
            >
                <Form.Item name={"amount"} label="Amount" required>
                    <InputNumber/>
                </Form.Item>
                <Form.Item name={"paymentDate"} label="Payment date">
                    <DatePicker/>
                </Form.Item>
                <Form.Item name={"paymentMode"} label="Payment mode">
                    <Select options={[{label: "Online", value: "Online"}, {label: "Cash", value: "Cash"}]}/>
                </Form.Item>
                <Form.Item name={"transactionDetails"} label="Transaction details">
                    <Input/>
                </Form.Item>
                <Form.Item className='footer'>
                    <Button loading={isPaymentInProgress} type='primary' htmlType='submit' children="Pay"/>
                </Form.Item>
            </Form>
        </div>}
        width={800}
        footer={() => <></>}
    />
  )
}

export default MakePayment;