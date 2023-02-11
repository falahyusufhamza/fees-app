import React from 'react'
import {Table} from 'antd';

const StudentsTable = ({
    data = [],
    onSelectStudent = () => {},
}) => {
    const columns = [
        {
            title: 'GR',
            dataIndex: 'grno',
        },
        {
          title: 'Name',
          dataIndex: 'name',
          render: (name, record) => <div onClick={() => onSelectStudent(record?.grno)}>{name}</div>
        },
        {
          title: 'School',
          dataIndex: 'school',
        },
        {
          title: 'Class',
          dataIndex: 'class',
        },
        {
            title: 'Location',
            dataIndex: 'location',
        },
        {
            title: 'Bus No.',
            dataIndex: 'busNumber',
        },
        {
            title: 'Father',
            dataIndex: 'fatherName',
        },
        {
            title: 'Contact number',
            dataIndex: 'contactNo',
        },
        {
            title: 'Fee / month',
            dataIndex: 'feePerMonth',
        },
      ];
  return (
    <Table
        columns={columns}
        dataSource={data}
        pagination={false}
      />
  )
}

export default StudentsTable