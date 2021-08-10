import React from 'react';
import { Layout, Input, Modal, Button } from 'antd';
import { UserOutlined, EnvironmentOutlined, GlobalOutlined, LaptopOutlined, GoogleOutlined } from '@ant-design/icons';
import { QuestionCircleOutlined } from '@ant-design/icons';

const { Content} = Layout;

function MessagesBody(props) {
  const [profileVisible, setProfileVisible] = React.useState(false);

  const showProfile = () => {
    setProfileVisible(true);
  };

  const handleReturn = () => {
    setProfileVisible(false);
  };

  return (
    <Layout>
      <Content
        className="site-layout-background"
        style={{
          margin: 0,
          minHeight: 280,
          width: '100%',
          height: '100vh',
          backgroundColor: '#ffffff',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #bbc5d7', position: 'sticky', top: 0, width: '100%', boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px -28px, rgba(0, 0, 0, 0.22) 0px 10px 10px -10px' }}>
          <div style={{ flexGrow: 1, flexShrink: 1, padding: 10, display: 'flex' }}></div>
          <h1 style={{ margin: 0, fontSize: 16, fontWeight: 500 }}>Chat with {props.friend.username}</h1>
          <div style={{ flexDirection: 'row-reverse', flexGrow: 1, flexShrink: 1, padding: 10 }}>
            <QuestionCircleOutlined style={{ float: 'right', fontSize: 25, padding: 5 }} onClick={() => showProfile()}/>
          </div>
        </div>
        <div style={{padding: 20}}>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
              <div style={{margin: '10 0', borderRadius: '20px', background: '#007aff', color: '#ffffff', padding: '10px 15px', maxWidth: '75%'}}>
                Hello {props.friend.username}
              </div>
            </div>
          </div>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <div style={{display: 'flex'}}>
              <div style={{margin: '10 0', borderRadius: '20px', background: '#f56a00', color: '#ffffff', padding: '10px 15px', maxWidth: '75%'}}>
                Hello {props.user}
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', padding: 10, alignItems: 'center', borderTop: '1px solid #bbc5d7', position: 'fixed', bottom: 0, width: '100%' }}>
          <Input 
            id="chatBox"
            name="chatBox"
            size="large"
            placeholder="Type a message to send"
            bordered={false}
          />
        </div>
        <Modal
          visible={profileVisible}
          title={`${props.friend.username}'s Profile`}
          maskClosable={true}
          onCancel={handleReturn}
          width={'50%'}
          height={'50%'}
          style={{fontSize: '5vh'}}
          footer={[
            <Button key="back" onClick={() => handleReturn()}>
              Return
            </Button>
          ]}
        >
          <div style={{fontSize: '3vh'}}>
            <span><UserOutlined />  <span style={{fontWeight: 600}}>Name:</span> {props.friend.name}</span><br />
            <span><GoogleOutlined />  <span style={{fontWeight: 600}}>Email:</span> {props.friend.email}</span><br />
            <span><EnvironmentOutlined />  <span style={{fontWeight: 600}}>City:</span> {props.friend.address.city}</span><br />
            <span><GlobalOutlined />  <span style={{fontWeight: 600}}>Website:</span> {props.friend.website}</span><br />
            <span><LaptopOutlined />  <span style={{fontWeight: 600}}>Company:</span> {props.friend.company.name}: {props.friend.company.catchPhrase}</span><br />
          </div>
        </Modal>
      </Content>
    </Layout>
  );
}

export default MessagesBody;
