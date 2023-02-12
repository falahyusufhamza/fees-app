import React, {useState} from 'react'
import {Layout, Menu} from 'antd';
import './Layout.css'
import { dashboardConfig } from './Dashboard/DashboardConfig';

const { Header, Sider, Content } = Layout;

const AppLayout = (props) => {
    const [collapsed, setCollapsed] = useState(true);
  return (<Layout className='layout-container'>
      <Sider className='sider' trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          color='white'
          mode="inline"
          defaultSelectedKeys={['1']}
          items={dashboardConfig.map(item => {
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
            title='BUS FEE TRACKER'
        >
            <div className='left'>
                    <div className='header-title'>BUS FEE TRACKER</div>  
                    <div className='company-name'>
                        NOOR AL SABAH INTERNATIONAL LLC    
                    </div>
            </div>
            <div className='right'>
                Profile
            </div>

                    
            
        </Header>
        <Content
            className='content-container'
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: "white",
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default AppLayout