import React from 'react'
import { Modal } from 'antd';
import "./StudentProfile.css"

const StudentProfile = ({
    studentData = {},
    isVisible = false,
    onClose = () => {}
}) => {
    const {
        name,
        grno,
        busNumber,
        school
    } = studentData;
  return (
    <Modal
        title={<div className='student-profile-header'>
            <div className='left'>
                <h2>{name}</h2>
                <p className='grno'>
                    <span>GR Number:</span> {grno}
                </p>
                <p className='school-name'>
                    <span>School: </span>{school}</p>
            </div>
            <div className='right'>
                <div className='bus-number-box'>
                    {busNumber}
                </div>
                BUS NUMBER
            </div>
            
        </div>}
        open={isVisible}
        onCancel={onClose}
        width={1500}
        footer={() => <></>}
    >
        <h4>{name}</h4>
    </Modal>
  )
}

export default StudentProfile