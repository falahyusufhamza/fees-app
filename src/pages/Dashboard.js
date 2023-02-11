import React, {useState} from 'react'
import StudentsTable from '../components/common/Dashboard/StudentsTable'
import { studentsData } from '../constants/dummyData'
import { Input } from 'antd';
import './Dashboard.css';
import StudentProfile from '../components/common/Dashboard/StudentProfile';
const { Search } = Input;

const Dashboard = () => {
    const [isDetailedViewVisible, setDetailedViewVisible] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState();
    const onSelectStudent = (studentId) => {
        setDetailedViewVisible(true);
        setSelectedStudent(studentsData.find(item => item.grno === studentId));
    }
  return (
    <div className='dashboard-container'>
        <Search
            className='search-input'
            placeholder="input search text"
            onSearch={() => {}}
            style={{
                width: 500,
            }}
        />
        <div className='table-and-profile-container'>
            <div className='table-container'>
                <StudentsTable data={studentsData} onSelectStudent={onSelectStudent}/>
            </div>
            <div id='profile-container'>
                <StudentProfile
                    studentData={selectedStudent}
                    onClose={() => setDetailedViewVisible(false)}
                    isVisible={isDetailedViewVisible}    
                />
            </div>
        </div>
    </div>
  )
}

export default Dashboard