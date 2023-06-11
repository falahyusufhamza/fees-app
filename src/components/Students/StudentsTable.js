import React from 'react'
import {Button, Dropdown, Table} from 'antd';
import "./StudentsTable.css";
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';

const StudentsTable = ({
    data = [],
    onSelectStudent = () => {},
    selectedRows = [],
    setSelectedRows,
    editStudent = () => {},
    onClickPay = () => {},
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

      const tableActions = [
        {
          label: 'Edit student',
          key: '1',
          icon: <EditOutlined/>,
          type: "single",
          onClick: editStudent,
        },
        {
          label: 'Pay fees',
          key: '2',
          icon: <PlusOutlined />,
          type: "single",
          onClick: onClickPay,
        },
        {
          label: 'Delete student(s)',
          key: '3',
          icon: <DeleteOutlined />,
          type: "multiple",
        },
      ]

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
          footer: () => !!selectedRows?.length && <>
          <div className='table-footer'>
            {tableActions.map(action => {
              if (selectedRows?.length > 1) {
                return action.type !== "single" && 
                  <Button onClick={action.onClick} type='primary' children={action.label}/>
              }
                return <Button onClick={action.onClick} type='primary' children={action.label}/>
            })}
        </div>
        <div className='mobile-view-table-footer'>
          <Dropdown.Button menu={{items: tableActions.filter(item => {
            if (selectedRows?.length > 1) {
              return item.type !== "single";
            }
            return item;
          })}}>
            Student actions
          </Dropdown.Button>
        </div>
        </>
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