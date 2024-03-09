import React, {useState, useEffect} from 'react'
import StudentsTable from '../components/Students/StudentsTable'
import { studentsData } from '../constants/dummyData'
import { Button, Input, Upload } from 'antd';
import './Students.css';
import StudentProfile from '../components/Students/StudentProfile';
import { PlusOutlined } from '@ant-design/icons';
import CreateStudent from '../components/Students/CreateStudent';
import MakePayment from '../components/Students/MakePayment';
import axios from "axios";

const { Search } = Input;

const Students = () => {
    const [isDetailedViewVisible, setDetailedViewVisible] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState();
    const [isCreateStudentVisible, setCreateStudentVisible] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editData, setEditData] = useState({});
    const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
    const onSelectStudent = (studentId) => {
        setDetailedViewVisible(true);
        setSelectedStudent(studentsData.find(item => item.grno === studentId));
    }
    useEffect(() => {
        axios.get("http://localhost:8080/students").then(response => {
            console.log(response);
        }).catch(err => {
            console.log(err);
        })
    }, [])
    const onClickEdit = (data = {}) => {
        setIsEditMode(true);
        setCreateStudentVisible(true);
        setDetailedViewVisible(false);
        setEditData(data);
    }
    const onClickPay = (data = {}) => {
        setIsPaymentModalVisible(false);
        setEditData(data);
        setIsPaymentModalVisible(true);
    }

  return (
    <div className='students-container'>
        <div className='table-actions'>
            <Search
                className='search-input'
                placeholder="input search text"
                onSearch={() => {}}
                style={{
                    width: 500,
                }}
            />
            <div className='right-actions'>
                <Button
                    onClick={() => setCreateStudentVisible(true)}
                    icon={<PlusOutlined/>}
                    children="Create student"
                    type='primary'/>
                    <Upload 
                        accept='text/csv'
                        customRequest={(file) => {
                            console.log(file);
                            axios.post("http://localhost:8080/students/bulk-upload", file.file).then(res => {
                                console.log("Result ", res);
                            }).catch(err => {
                                console.log(err);
                            })
                        }}
                        onChange={(data) => console.log(data)}>
                    <Button
                        icon={<PlusOutlined/>}
                        children="Bulk upload students"
                        type='primary'/>
                </Upload>
            </div>
        </div>
        
        <div className='table-and-profile-container'>
            <div className='table-container'>
                <StudentsTable
                    data={studentsData}
                    onSelectStudent={onSelectStudent}
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                    editStudent={() => onClickEdit(selectedRows[0])}
                    onClickPay={() => onClickPay(selectedRows[0])}
                />
            </div>
            <StudentProfile
                studentData={selectedStudent}
                onClose={() => {
                    setDetailedViewVisible(false)
                }}
                editStudent={onClickEdit}
                onClickPay={onClickPay}
                isVisible={isDetailedViewVisible}    
            />
        </div>
        <CreateStudent
            isVisible={isCreateStudentVisible}
            onClose={() => {
                setIsEditMode(false);
                setCreateStudentVisible(false)}
            }
            isEditMode={isEditMode}
            editData={editData}
        />
        <MakePayment
            isVisible={isPaymentModalVisible}
            onClose={() => setIsPaymentModalVisible(false)}
            studentData={editData}
        />
    </div>
  )
}

export default Students