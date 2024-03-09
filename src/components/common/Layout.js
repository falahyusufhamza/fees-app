import React, {useState} from 'react'
import {Button, Layout, Menu} from 'antd';
import './Layout.css'
import { dashboardConfig } from '../Students/DashboardConfig';
import { LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { API_URLS } from '../../apiUrls';

const { Header, Sider, Content } = Layout;

const AppLayout = (props) => {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(true);

    const logout = () => {
      axios.post(API_URLS.LOGOUT).then((res) => {
        if (res?.data?.success) {
          navigate("/login")
        }
      }).catch((error) => {
        console.log(error);
      })
    }

  return (<Layout className='layout-container'>
      <Sider className='sider' trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          color='red'
          mode="inline"
          defaultSelectedKeys={['1']}
          items={dashboardConfig(navigate).map(item => {
            if (item.key === "menu") {
                return {
                    ...item,
                    onClick: () => setCollapsed(prevState => !prevState)
                }
            }
            return item
          })}
        />
      </Sider>
      <Layout className="header-and-content">
        <Header
            className='header'
        >
          <div className='header-desktop-view'>
            <div className='left'>
                <div className='header-title'>BUS FEE TRACKER</div>  
            </div>
            <div className='right'>
                <Button onClick={logout} icon={<LogoutOutlined/>} type='primary' children="Logout" />
            </div>
          </div>
          <div className='header-mobile-view'>
            <div className='header-title'>BUS FEE TRACKER</div>  
          </div>                   
        </Header>
        <Content
            className='content-container'
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          {props.children}
        </Content>
        <div className='footer'>
          <Menu
            color='white'
            mode="horizontal"
            defaultSelectedKeys={['1']}
            items={dashboardConfig(navigate).map(item => {
              if (item.key === "menu") {
                  return {
                      ...item,
                      onClick: () => setCollapsed(prevState => !prevState)
                  }
              }
              return item
            })}
          />
        </div>
      </Layout>
    </Layout>
  )
}

export default AppLayout