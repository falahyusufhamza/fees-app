import React from 'react'
import { Button, Modal } from 'antd';
import "./StudentProfile.css"

const StudentProfile = ({
    studentData = {},
    isVisible = false,
    onClose = () => {},
    editStudent = () => {},
}) => {
    const {
        name,
        grno,
        busNumber,
        school
    } = studentData;
  return (
    <Modal
        className='student-profile-popup'
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
        <div className='student-actions'>
          <Button onClick={() => editStudent(studentData)} type='primary' children="Edit details"/>
          <Button type='primary' children="Delete Student"/>
          <Button type='primary' children="Pay fees"/>
        </div>
        <div className='profile-content'>
            
        </div>
    </Modal>
  )
}

export default StudentProfile