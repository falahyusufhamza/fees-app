import { DownloadOutlined } from '@ant-design/icons';
import { Button, Modal, Table } from 'antd';
import React, { useState } from 'react';
import { MONTH_MAP } from '../../constants/commonConstants';
import InvoicePDF from '../InvoicePDF/InvoicePDF';

function InvoiceTable({ data }) {
    const [showBills, setShowBills] = useState(false);
  const columns = [
    {
      title: 'Id',
      dataIndex: 'invoiceId',
      fixed: 'left',
      width: '50px',
    },
    {
      title: 'Passenger Name',
      dataIndex: 'passenger',
      fixed: 'left',
      width: '250px',
      render: (passenger) => passenger?.name,
    },
    {
      title: 'Amount (OMR)',
      dataIndex: 'invoiceAmount',
      width: '200px',
    },
    {
      title: 'Fee month',
      dataIndex: 'feeMonth',
      width: 200,
      render: (feeMonth) => {
        return MONTH_MAP[feeMonth?.month] + " " + feeMonth?.year;
      }
    },
    {
      title: 'Pending amount',
      dataIndex: 'pendingAmount',
      width: '100px',
    },
  ];
  return <>

  <Table
    dataSource={data}
    columns={columns}
    rowKey="invoiceId"
  /></>;
}

export default InvoiceTable;
