import React from 'react'
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import "./StudentProfile.css"

const StudentProfile = ({
    studentData
}) => {
    const {
        name
    } = studentData;
  return (
    <div className='student-profile'>
        <div className='title'>
            <Avatar
            size={80}
                icon={<UserOutlined />}
            />
            <p>{name}</p>
        </div>  
    </div>
  )
}

export default StudentProfile