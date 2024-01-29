import React, { useState } from 'react';
import { FaBars, FaHome, FaEye, FaScroll, FaBriefcase, FaMale, FaChevronRight, FaChevronDown } from 'react-icons/fa';
import GreeLogo from '../assets/gree_logo.png';
import { Link, useParams } from 'react-router-dom';

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const menuItem = [
    { name: 'Home', icon: FaHome, link:'/home', submenuNames: [], submenuLinks: [] },
    { name: 'Oculars', icon: FaEye, link: '', submenuNames: ['Manage Oculars', 'Set Ocular'], submenuLinks: ['/viewoculars', '/setocular']},
    { name: 'Quotations', icon: FaScroll, link: '', submenuNames: ['Manage Quotations', 'Generate Quotation'], submenuLinks: ['/home','/home'] },
    { name: 'Sales', icon: FaBriefcase, link: '/home', submenuNames: [], submenuLinks: []},
    { name: 'Clients', icon: FaMale, link: '/home', submenuNames: [], submenuLinks: [] },
  ];

  const [expandedMenuIndex, setExpandedMenuIndex] = useState(null);
  const toggleSubMenu = (index) => setExpandedMenuIndex(expandedMenuIndex === index ? null : index);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div
        style={{
          width: isOpen ? '260px' : '80px',
          transition: 'width 0.3s ease',
          backgroundColor: '#CCDBE9',
          color: '#014c91',
          padding: '15px',
          boxSizing: 'border-box',
          overflowY: 'auto',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <img
            src={GreeLogo}
            alt="Gree Logo"
            style={{ display: isOpen ? 'block' : 'none', margin: '0', width: '180px', height: '30px' }}
          />
          <div style={{ cursor: 'pointer'}}>
            <FaBars onClick={toggle} size={40}/>
          </div>
        </div>
        {menuItem.map((item, index) => (
          <>
          <div
            key={index}
            style={{
              textDecoration: 'none',
              color: '#014c91',
              display: 'flex',
              alignItems: 'center',
              marginBottom: '10px',
              transition: 'background-color 0.3s ease',
            }}
          > 
{item.submenuNames && (
  <div
    style={{
      marginTop: '30px',
      cursor: isOpen ? 'pointer' : 'default',
    }}
    onClick={() => {
      if (isOpen) {
        toggleSubMenu(index)  // Delayed toggleSubMenu
      } else if (item.submenuNames.length > 0) {
        toggle();
        setTimeout(() => toggleSubMenu(index), 150);  // Delayed toggleSubMenu
      }
    }}
  >
    {React.createElement(item.icon, { size: 40 })}
  </div>
)}



            <div style={{ display: isOpen ? 'block' : 'none', marginLeft: '10px', marginTop: '40px', fontSize: '20px', fontWeight: 'bold'   }}>{item.name}</div>
            {/* Toggle Chevron icon */}
            {isOpen && item.submenuNames && item.submenuNames.length > 0 && (
              <div
                style={{ marginLeft: 'auto', marginTop: '40px', cursor: 'pointer' }}
                onClick={() => toggleSubMenu(index)}
              >
                {React.createElement(expandedMenuIndex === index ? FaChevronDown : FaChevronRight, { size: 20 })}
              </div>
            )}

          
          </div>
                      {/* Display submenu items */}
            {item.submenuNames && isOpen && expandedMenuIndex === index && (
              <div style={{ marginLeft: '50px', marginTop: '15px', fontSize: '18px' }}>
                {item.submenuNames.map((submenuItem, submenuIndex) => (
                  <Link style={{textDecoration: 'none', color:'#014c91'}} to={menuItem[index].submenuLinks[submenuIndex]}>
                      <div style={{ marginTop: '15px'}} key={submenuIndex}>{submenuItem}</div>
                  </Link>
                ))}
              </div>
            )}
          </>
          
        ))}
      </div>
     
    </div>
  );
};

export default Sidebar;
