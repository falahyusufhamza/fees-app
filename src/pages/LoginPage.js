import React, { useEffect } from 'react';
import './LoginPage.css';
import { Form, Button, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { API_URLS } from '../apiUrls';
import axios from 'axios';

const LoginPage = () => {
    const navigate = useNavigate();
    const onLogin = (values) => {
        const {username, password} = values;
        axios.post("/signin", {
          userName: username,
          password,
        }).then((res) => {
          if (res?.data?.success) {
            navigate("/passengers");
          }
        }).catch((error) => {
          console.log(error);
        })
    }
    useEffect(() => {
        if (localStorage.getItem("USER_ID") === "ADMIN") {
            navigate("/")
        }
        // eslint-disable-next-line
    }, [])
  return (
    <div className="login-page">
      <div className="login-container">
        <div className='login-form'>
        <Form
          name="normal_login"
          className=""
          onFinish={onLogin}
        >
        <p className='title'>Sign in</p>

          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item className='submit-button-container'>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
