import React from 'react';
import { Link } from "react-router-dom";
import { MenuOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { useSelector } from 'react-redux';

// Helper function to convert page hierarchy to Ant Design dropdown items with indentation
const convertHierarchyToMenuItems = (pages, setParentPage, parentPath = '', level = 0) => {
  return pages.map((page) => {
    const hasChildren = page.children && page.children.length > 0;
    const itemStyle = { paddingLeft: `${level * 20}px` }; // Adjust indentation
    const formattedTitle = page.title.rendered.replace(/\s+/g, '-').toLowerCase(); // Format title for URL
    const fullPath = `${parentPath}/${formattedTitle}`; // Include parent path

    const item = {
      key: `${page.id}-${formattedTitle}`,
      label: (
        <Link to={fullPath} onClick={() => setParentPage(page.title.rendered)} style={itemStyle}>
          {page.title.rendered}
        </Link>
      ),
    };

    if (hasChildren) {
      item.children = convertHierarchyToMenuItems(page.children, setParentPage, fullPath, level + 1);
    }

    return item;
  });
};

const MainMenu = ({ parentPage, setParentPage }) => {
  const menuPageHierarchy = useSelector((state) => state.pages.pageHierarchy);
  console.log('menu page hieracrcy reducer state: ', menuPageHierarchy)
  const items = convertHierarchyToMenuItems(menuPageHierarchy, setParentPage);

  return (
    <div>
      <Dropdown menu={{ items }}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <MenuOutlined />
          </Space>
        </a>
      </Dropdown>
    </div>
  );
};

export default MainMenu;
