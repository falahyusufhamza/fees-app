import { Button, Col, Form, Input, Modal, Row, Select } from 'antd'
import React, { useEffect } from 'react'
import "./CreateStudent.css"

const CreateStudent = ({
    isVisible = false,
    onClose = () => {},
    isEditMode = false,
    editData = {},
}) => {
    const {Option} = Select;
    const [studentForm] = Form.useForm();
    const formItemLayout = {
        labelCol: {
          xs: {
            span: 24,
          },
          sm: {
            span: 8,
          },
        },
        wrapperCol: {
          xs: {
            span: 24,
          },
          sm: {
            span: 16,
          },
        },
      };

      useEffect(() => {
        studentForm.setFieldsValue({
            name: editData?.name || "",
            grno: editData?.grno || "",
            school: editData?.school || "",
            location: editData?.location || "",
            busNo: editData?.busNo || "",
            gender: editData?.gender || "",
            contactNo: editData?.contactNo || "",
        })
        // eslint-disable-next-line
      }, [editData])
      
      const onCloseForm = () => {
        studentForm.setFieldsValue({})
        onClose();
      }
  return (
    <Modal
        open={isVisible}
        className="create-student-modal"
        title={<div className='modal-header'>
            <p className='modal-title'>Create a new student</p>
        </div>}
        onCancel={onCloseForm}
        children={<div className='contents'>
            <Form
                {...formItemLayout}
                form={studentForm}
                name="student-form"
                onFinish={(values) => console.log(values)}
                >
                    <Row style={{width: "100%"}} gutter={20}>
                    <Col style={{width: "100%"}} span={12}>
                    <Form.Item
                    name="name"
                    label="Full name"
                    rules={[
                        {
                            required: true,
                            message: 'Name is required!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="grno"
                    label="GR No."
                    rules={[
                        {
                            required: true,
                            message: 'Please enter the GR Number!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="gender"
                    label="Gender"
                    rules={[
                    {
                        required: true,
                        message: 'Please select gender!',
                    },
                    ]}
                >
                    <Select placeholder="select your gender">
                        <Option value="male">Male</Option>
                        <Option value="female">Female</Option>
                    </Select>
                </Form.Item>
                    </Col>
                
                <Col span={12}>
                <Form.Item
                    name="school"
                    label="School"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="location"
                    label="Location"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="contactNo"
                    label="Phone Number"
                >
                    <Input/>
                </Form.Item>
                
                </Col>
                    </Row>
                <Row justify={"end"} style={{width: "100%", marginTop: 20, paddingRight: 20}}>
                        <Button onClick={onClose} type="secondary">
                            Cancel
                        </Button>
                        <Button style={{marginLeft: 10}} type="primary" htmlType="submit">
                            Submit
                        </Button>
                </Row>
            </Form>
        </div>}
        width={800}
        footer={null}
    />
  )
}

export default CreateStudent