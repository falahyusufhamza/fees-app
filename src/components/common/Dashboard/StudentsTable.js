import React from 'react'
import {Table} from 'antd';
import "./StudentsTable.css";

const StudentsTable = ({
    data = [],
    onSelectStudent = () => {},
}) => {
    const columns = [
        {
            title: 'GR',
            dataIndex: 'grno',
            fixed: "left",
            width: "50px",
        },
        {
          title: 'Name',
          dataIndex: 'name',
          render: (name, record) => <div className='student-name' onClick={() => onSelectStudent(record?.grno)}>{name}</div>,
          fixed: "left",
          width: "250px",
        },
        {
          title: 'School',
          dataIndex: 'school',
          width: "200px"
        },
        // {
        //   title: 'Class',
        //   dataIndex: 'class',
        // },
        // {
        //     title: 'Location',
        //     dataIndex: 'location',
        // },
        {
            title: 'Bus No.',
            dataIndex: 'busNumber',
            width: '100px'
        },
        // {
        //     title: 'Father',
        //     dataIndex: 'fatherName',
        // },
        // {
        //     title: 'Contact number',
        //     dataIndex: 'contactNo',
        // },
        {
            title: 'Fee / month',
            dataIndex: 'feePerMonth',
        },
      ];
  return (
    <Table
        rowKey={"grno"}
        columns={columns}
        dataSource={data}
        pagination={false}
      />
  )
}

export default StudentsTable