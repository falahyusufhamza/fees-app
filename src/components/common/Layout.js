import React, {useState} from 'react'
import {Layout, Menu} from 'antd';
import './Layout.css'

const { Header, Sider, Content } = Layout;

const AppLayout = (props) => {
    const [collapsed, setCollapsed] = useState(false);
  return (<Layout className='layout-container'>
      <Sider className='sider' trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          color='white'
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[]}
        />
      </Sider>
      <Layout className="header-and-content">
        <Header
            className='header-container'
          style={{
            padding: 0,
            background: "#fba916",
          }}
        >
          <div className='trigger' onClick={() => setCollapsed((prevState) => !prevState)}>Trigger</div>
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