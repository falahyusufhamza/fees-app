import React from 'react'
import {Button, Table} from 'antd';
import "./StudentsTable.css";

const StudentsTable = ({
    data = [],
    onSelectStudent = () => {},
    selectedRows = [],
    setSelectedRows,
    editStudent = () => {},
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
      const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          setSelectedRows(selectedRows)
        },
        getCheckboxProps: (record) => ({
          disabled: record.name === 'Disabled User',
          // Column configuration not to be checked
          name: record.name,
        }),
      };
      let tableFooterProps = {};
      if (!!selectedRows?.length) {
        tableFooterProps = {
          footer: () => !!selectedRows?.length && <div className='table-footer'>
          {selectedRows?.length === 1 && <Button onClick={editStudent} type='primary' children="Edit details"/>}
          <Button type='primary' children="Delete Student"/>
          <Button type='primary' children="Pay fees"/>
        </div>
        }
      }
  return (
    <Table
        rowKey={"grno"}
        columns={columns}
        dataSource={data}
        pagination={false}
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        {...tableFooterProps}
      />
  )
}

export default StudentsTable