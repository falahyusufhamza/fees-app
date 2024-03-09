import React, {useState, useEffect} from 'react'
import StudentsTable from '../components/Students/StudentsTable'
import { studentsData } from '../constants/dummyData'
import { Button, Input, message } from 'antd';
import './Students.css';
import StudentProfile from '../components/Students/StudentProfile';
import { CloudUploadOutlined, PlusOutlined } from '@ant-design/icons';
import CreateStudent from '../components/Students/CreateStudent';
import MakePayment from '../components/Students/MakePayment';
import axios from "axios";
import { API_URLS } from '../apiUrls';
import GenerateFeeModal from '../components/Students/GenerateFeeModal';

const { Search } = Input;

const Students = () => {
    const [isDetailedViewVisible, setDetailedViewVisible] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState();
    const [isCreateStudentVisible, setCreateStudentVisible] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editData, setEditData] = useState({});
    const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
    const [passengerData, setPassengerData] = useState([]);
    const [showGenerateFeeModal, setShowGenerateFeeModal] = useState(false);
    const [paginationData, setPaginationData] = useState({});
    const [params, setParams] = useState({});
    
    const onSelectStudent = (studentId) => {
        setDetailedViewVisible(true);
        setSelectedStudent(studentsData.find(item => item.grno === studentId));
    }
    useEffect(() => {
        fetchPassengers();
    }, [])

    useEffect(() => {
        fetchPassengers(params);
    }, [params])

    const fetchPassengers = (params = {}) => {
        axios.get(API_URLS.GET_PASSENGERS, {
            params,
        }).then(response => {
            if (response?.data?.success) {
                setPassengerData(response?.data?.passengers);
                setPaginationData(response?.data?.paginationData);
            }
        }).catch(err => {
            console.log(err);
            message.error(err?.data?.message || "Failed to fetch passengers")
        })
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

    const generateFee = (feeStructureId, callback = () => {}) => {
        axios.post(API_URLS.GENERATE_FEE, {feeStructureId}).then((res) => {
            console.log(res?.data);
            callback(res?.data?.success);
            if (res.data?.success) {
                message.success("Successfully triggered fee generation. Please go to invoices page to see the updated bills of all passengers");
            }
        }).catch((error) => {
            callback(false);
            console.log("Failure", error?.error);
            message.error(error?.data?.message || "Failed to generate fees");
        })
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
                    icon={<CloudUploadOutlined/>}
                    children="Generate fees"
                    type='primary'
                    onClick={() => setShowGenerateFeeModal(true)}
                />
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
                    data={passengerData}
                    onSelectStudent={onSelectStudent}
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                    editStudent={() => onClickEdit(selectedRows[0])}
                    onClickPay={() => onClickPay(selectedRows[0])}
                    params={params}
                    setParams={setParams}
                    paginationData={paginationData}
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
        <GenerateFeeModal
            isVisible={showGenerateFeeModal}
            onClose={() => setShowGenerateFeeModal(false)}
            generateFee={generateFee}
        />
    </div>
  )
}

export default Students