import React, {useState} from 'react'
import StudentsTable from '../components/common/Dashboard/StudentsTable'
import { studentsData } from '../constants/dummyData'
import { Button, Input } from 'antd';
import './Dashboard.css';
import StudentProfile from '../components/common/Dashboard/StudentProfile';
import { PlusOutlined } from '@ant-design/icons';
import CreateStudent from '../components/common/Dashboard/CreateStudent';
const { Search } = Input;

const Dashboard = () => {
    const [isDetailedViewVisible, setDetailedViewVisible] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState();
    const [isCreateStudentVisible, setCreateStudentVisible] = useState(false);
    const onSelectStudent = (studentId) => {
        setDetailedViewVisible(true);
        setSelectedStudent(studentsData.find(item => item.grno === studentId));
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
                <StudentsTable data={studentsData} onSelectStudent={onSelectStudent}/>
            </div>
            <StudentProfile
                studentData={selectedStudent}
                onClose={() => setDetailedViewVisible(false)}
                isVisible={isDetailedViewVisible}    
            />
        </div>
        <CreateStudent
            isVisible={isCreateStudentVisible}
            onClose={() => setCreateStudentVisible(false)}
        />
    </div>
  )
}

export default Dashboard