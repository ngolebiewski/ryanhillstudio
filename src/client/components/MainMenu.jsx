import { Link } from "react-router-dom";
import { DownOutlined, SmileOutlined, MenuOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';


const items = [
  {
    key: '1',
    label: (
      <Link to="/ryan-hill" onClick={() => setParentPage("ryan-hill")}>
        Ryan Hill
      </Link>
    ),
  },
  {
    key: '2',
    label: (
      <Link to="/drawing" onClick={() => setParentPage("drawing")}>
        Drawing
      </Link>
    ),
  },
  {
    key: '3',
    label: (
      <Link to="/installation" onClick={() => setParentPage("installation")}>
        Installation
      </Link>
    ),
  },
  {
    key: '4',
    label: (
      <Link to="/studio" onClick={() => setParentPage("studio")}>
        Studio
      </Link>
    ),
  },
  {
    key: '5',
    label: (
      <Link to="/events" onClick={() => setParentPage("events")}>
        Events
      </Link>
    ),
  },
  {
    key: '6',
    label: (
      <Link to="/contact" onClick={() => setParentPage("contact")}>
        Contact
      </Link>
    ),
  },
];


const MainMenu = ({ parentPage, setParentPage }) => {
  return (
    <Dropdown id="menu"
      menu={{
        items,
      }}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <MenuOutlined />
        </Space>
      </a>
    </Dropdown>
  )
}

export default MainMenu;
