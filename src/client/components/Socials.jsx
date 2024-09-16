import {
  InstagramOutlined,
  MailOutlined, 
} from '@ant-design/icons';
import { Space } from 'antd';


const Socials = () => {
  return (
    <>
      <Space>
        <a href="https://www.instagram.com/ryanhillstudios/" target="_blank"><InstagramOutlined style={{ width: '1.5em', fontSize: '1.5em'  }}/></a>
        <a href="mailto:contact@ryanhill.studio"><MailOutlined style={{ width: '1.5em', fontSize: '1.5em'  }} /></a>
      </Space>
    </>
  )
}

export default Socials;