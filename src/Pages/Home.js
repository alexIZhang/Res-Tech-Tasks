import React from 'react';
import { Layout, Menu, Input, Avatar, Modal, Button, Typography, Alert } from 'antd';
import { UserOutlined, SettingOutlined } from '@ant-design/icons';
import MessagesBody from '../Components/MessagesBody';
import logo from './../Images/ResChat.png';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;


function Home() {
  const [friends, setFriends] = React.useState([]);
  const [inputFilter, setInputFilter] = React.useState('');
  const [selectedFriend, setSelectedFriend] = React.useState(undefined);
  const [settingsVisible, setSettingsVisible] = React.useState(false);
  const [currentUsername, setCurrentUsername] = React.useState('Resonate');
  const [usernameChange, setUsernameChange] = React.useState('Resonate');
  const [invalidUsername, setInvalidUsername] = React.useState('false');

  React.useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(json => {
        var friendObjects = []
        json.forEach(user => friendObjects.push(user));
        setFriends(friendObjects);
      });
  }, []);

  const handleClick = (friend) => {
    setSelectedFriend(friend);
  }

  const showSettings = () => {
    setSettingsVisible(true);
  }

  const handleReturn = () => {
    if (usernameChange === '') {
      setInvalidUsername(true);
    } else {
      setInvalidUsername(false);
      setSettingsVisible(false);
      setCurrentUsername(usernameChange);
    }
  };

  const changeUsername = (event) => {
    setUsernameChange(event.target.value);
  }

  return (
    <Layout style={{ minHeight: '100vh', width: '100%' }}>
      <Header className="header" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '0 10', background: '#00c4cc' }}>
        <div>
          <img src={logo} alt="logo" height={'100%'}/>
        </div>
        <div style={{display: 'flex', height: '100%', width: '100%', flexDirection: 'row-reverse' }}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '20%', height: '100%', color: '#ffffff', cursor: 'pointer'}} onClick={() => showSettings()}>
            <SettingOutlined width={'100%'} height={'100%'} style={{fontSize: '4vh'}}/>
            <span style={{fontWeight: 600, fontSize: '3vh'}}>
              &nbsp;Settings
            </span>
          </div>
        </div>
      </Header>
      <Layout style={{ backgroundColor: '#ffffff', display: 'flex' }}>
        <Sider width={'20%'} className="site-layout-background" style={{ height: '100vh', overflowY: 'auto' }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%' }}
          >
            <div style={{ padding: 5 }}>
              <Input 
                id="filter"
                name="filter"
                value={inputFilter}
                size="large"
                placeholder="Find a friend"
                onChange={event => setInputFilter(event.target.value)}
                bordered={false}
                prefix={<UserOutlined />}
              />
            </div>
            {friends.filter(f => (f.username.toUpperCase().includes(inputFilter.toUpperCase()) || inputFilter === ''))
              .map((friend, idx) => 
                <Menu.Item 
                  key={idx}
                  onClick={() => handleClick(friend)}
                  style={{ paddingLeft: '5%', margin: 0, height: '7%'}}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar style={{ backgroundColor: '#f56a00', verticalAlign: 'middle' }} size="small">
                      {friend.username[0]}
                    </Avatar>
                    <span style={{fontSize: '3vh'}}>&nbsp;
                    {friend.username}</span>
                  </div>
                </Menu.Item>)}
          </Menu>
        </Sider>
        {(selectedFriend === undefined)
          ? <Layout>
              <Content
                className="site-layout-background"
                style={{
                  margin: 0,
                  minHeight: 280,
                  width: '100%',
                  height: '100vh',
                  backgroundColor: '#ffffff',
                  textAlign: 'center',
                  padding: 20
                }}
              >
                <Title>Welcome {currentUsername} to ResChat!</Title>
                <br/>
                <Title level={2}>Select a contact to chat with!</Title>
              </Content>
            </Layout>
          : <MessagesBody friend={selectedFriend} user={currentUsername}/>
        }
      </Layout>
      <Modal
          visible={settingsVisible}
          title={'Your Settings'}
          maskClosable={true}
          onCancel={handleReturn}
          width={'50%'}
          height={'50%'}
          style={{fontSize: '5vh'}}
          footer={[
            <Button key="back" onClick={() => handleReturn()}>
              Apply
            </Button>
          ]}
        >
          <div style={{fontSize: '3vh'}}>
            <p>Change your username</p>
            <Input
              placeholder="Enter your username"
              prefix={<UserOutlined className="site-form-item-icon" />}
              value={usernameChange}
              onChange={(event) => changeUsername(event)}
            />
            <br/>
            {(invalidUsername === true)
              ? <Alert message="You must have at least 1 character in your username!" type="error" />
              : null
            }
          </div>
        </Modal>
    </Layout>
  );
}

export default Home;
