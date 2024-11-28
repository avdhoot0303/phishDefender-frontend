import React from 'react';
import { Menu } from 'antd';

const Sidebar = ({ selectedFolder, onSelectFolder }) => {
  const folders = ['inbox', 'trash'];

  return (
    <Menu
      mode="vertical"
      selectedKeys={[selectedFolder]}
      // onClick={(e) => onSelectFolder(e.key)}
      style={{ height: '100%', borderRight: 0 }}
    >
      {folders.map((folder) => (
        <Menu.Item key={folder}>
          {folder.charAt(0).toUpperCase() + folder.slice(1)}
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default Sidebar;
