import React, {useState} from 'react'
import StudentsTable from '../components/Dashboard/StudentsTable'
import { studentsData } from '../constants/dummyData'
import { Button, Input } from 'antd';
import './Dashboard.css';
import StudentProfile from '../components/Dashboard/StudentProfile';
import { PlusOutlined } from '@ant-design/icons';
import CreateStudent from '../components/Dashboard/CreateStudent';
import MakePayment from '../components/Dashboard/MakePayment';
const { Search } = Input;

const Dashboard = () => {
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
    <div className='dashboard-container'>
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

export default Dashboard