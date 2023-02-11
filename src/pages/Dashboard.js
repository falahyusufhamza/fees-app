import React, {useState} from 'react'
import StudentsTable from '../components/common/Dashboard/StudentsTable'
import { studentsData } from '../constants/dummyData'
import { Input } from 'antd';
import './Dashboard.css';
import StudentProfile from '../components/common/Dashboard/StudentProfile';
const { Search } = Input;

const Dashboard = () => {
    const [showDetailedView, setShowDetailedView] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState();
    const onSelectStudent = (studentId) => {
        setShowDetailedView(true);
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
            {showDetailedView && <div id='profile-container'>
                <StudentProfile studentData={selectedStudent}/>
            </div>}
        </div>
    </div>
  )
}

export default Dashboard