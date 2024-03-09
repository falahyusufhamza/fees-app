import { Modal, message } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_URLS } from '../../apiUrls'
import InvoicePDF from '../InvoicePDF/InvoicePDF';

function PassengerBills({
    isVisible,
    setIsVisible,
    passengerData,
}) {
    const [bills, setBills] = useState([]);
    useEffect(() => {
        if (!isVisible) return;
        axios.get(API_URLS.GET_PASSENGER_FEES, {
            params: {
                passengerId: passengerData?.passengerId,
            }
        }).then((res) => {
            setBills(res?.data?.data?.invoiceList);
        }).catch((error) => {
            console.error(error);
            message.error("Failed to fetch involces")
        })
    }, [isVisible])
  return (
    <Modal
    open={isVisible}
    children={<>
            {bills?.length && <InvoicePDF passengerData={passengerData} invoices={bills} />}
    </>}
    onCancel={() => setIsVisible(false)}
  >

  </Modal>
  )
}

export default PassengerBills