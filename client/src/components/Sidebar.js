import React, { useState, useEffect } from 'react';
import {  FaBars, FaHome, FaEye, FaScroll, FaBriefcase, FaChevronRight, FaChevronDown, FaChartLine,
          FaMoneyCheckAlt, FaUsers, FaUserTie, FaTag, FaShieldAlt} from 'react-icons/fa';
import GreeLogo from '../assets/gree_logo.png';
import { Link, useParams } from 'react-router-dom';

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [menuItem, setMenuItem] = useState([]);

  const [userType, setUserType] = useState(1)
  const access = sessionStorage.getItem('accessString')
  console.log('accessString', access)

  useEffect(() => {
    if (access) {
      if(access[0] === 1){
        console.log('access sales', access[0])
        setMenuItem([
          { name: 'Home', icon: FaHome, link:'/home', submenuNames: [], submenuLinks: [] },
          { name: 'Oculars', icon: FaEye, link: '', submenuNames: ['Manage Oculars', 'Set Ocular'], submenuLinks: ['/viewoculars', '/setocular']},
          { name: 'Quotations', icon: FaScroll, link: '', submenuNames: ['Manage Quotations', 'Generate Quotation'], submenuLinks: ['/viewquotations','/generatequotation'] },
          { name: 'Sales', icon: FaBriefcase, link: '/viewsales', submenuNames: [], submenuLinks: []},
          { name: 'Clients', icon: FaUserTie, link: '/viewclients', submenuNames: [], submenuLinks: [] }
        ])
      }  
      if(access[1] === 1){
        console.log('access aftersales', access[1])
        setMenuItem([
          { name: 'Home', icon: FaHome, link:'/home', submenuNames: [], submenuLinks: [] },
          { name: 'Warranties', icon: FaShieldAlt, link: '', submenuNames: ['Manage Warranties', 'Set Warranty'], submenuLinks: ['/viewwarranties', '/searchwarranty']}
        ])
      } 
      if(access[2] === 1){
        console.log('access exec', access[2])
        setMenuItem([
          { name: 'Home', icon: FaHome, link:'/home', submenuNames: [], submenuLinks: [] },
          { name: 'Expenses', icon: FaMoneyCheckAlt, link: '', submenuNames: ['Manage Expenses', 'Record Expenses'], submenuLinks: ['/viewexpenses', '/recordexpenses']},
          { name: 'Reports', icon: FaChartLine, link: '/report', submenuNames: [], submenuLinks: []}
        ])
      }
      if (access[3] === 1) {
        console.log('access sysad', access[3])
        setMenuItem([
          { name: 'Home', icon: FaHome, link:'/home', submenuNames: [], submenuLinks: [] },
          { name: 'Products', icon: FaTag, link: '/viewproducts', submenuNames: [], submenuLinks: []},
          { name: 'Employees', icon: FaUsers, link: '', submenuNames: ['Manage System Users', 'Manage Technicians'], submenuLinks: ['/viewusers', '/viewtechnicians']}
        ])
      }
    }
  }, [access]);

  useEffect(() => {
    const menuList = []
    if (access) {
      menuList.push({ name: 'Home', icon: FaHome, link:'/home', submenuNames: [], submenuLinks: [] })
    }
    if (access[0] === '1') {
      menuList.push(
      { name: 'Oculars', icon: FaEye, link: '', submenuNames: ['Manage Oculars', 'Set Ocular'], submenuLinks: ['/viewoculars', '/setocular']},
      { name: 'Quotations', icon: FaScroll, link: '', submenuNames: ['Manage Quotations', 'Generate Quotation'], submenuLinks: ['/viewquotations','/generatequotation'] },
      { name: 'Sales', icon: FaBriefcase, link: '/viewsales', submenuNames: [], submenuLinks: []},
      { name: 'Clients', icon: FaUserTie, link: '/viewclients', submenuNames: [], submenuLinks: [] })
    }
    if (access[1] === '1') {
      menuList.push(
        { name: 'Warranties', icon: FaShieldAlt, link: '', submenuNames: ['Manage Warranties', 'Set Warranty'], submenuLinks: ['/viewwarranties', '/searchwarranty']}
      )
    }
    if (access[2] === '1') {
      menuList.push(
        { name: 'Expenses', icon: FaMoneyCheckAlt, link: '', submenuNames: ['Manage Expenses', 'Record Expenses'], submenuLinks: ['/viewexpenses', '/recordexpenses']},
        { name: 'Reports', icon: FaChartLine, link: '/report', submenuNames: [], submenuLinks: []}
      )
    }
    if (access[3] === '1') {
      menuList.push(
        { name: 'Products', icon: FaTag, link: '/viewproducts', submenuNames: [], submenuLinks: []},
        { name: 'Employees', icon: FaUsers, link: '', submenuNames: ['Manage System Users', 'Manage Technicians'], submenuLinks: ['/viewusers', '/viewtechnicians']}
      )
    }
    setMenuItem(menuList)
  }, [access])

  const [expandedMenuIndex, setExpandedMenuIndex] = useState(null);
  const toggleSubMenu = (index) => setExpandedMenuIndex(expandedMenuIndex === index ? null : index);

  return (
    <div style={{ display: 'flex', minHeight:"100vh"}}>
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
            <Link style={{ color: '#014c91'}}>
              <FaBars onClick={toggle} size={40}/>
            </Link>
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

                {/*Submenu Icons with link or toggle functionality*/}
                {item.submenuNames.length > 0 ? (
                  <div
                    style={{
                      marginTop: '20px',
                      cursor: isOpen ? 'pointer' : 'default',
                    }}
                    onClick={() => {
                      if (isOpen) {
                        toggleSubMenu(index); // Delayed toggleSubMenu
                      } else if (item.submenuNames.length > 0) {
                        toggle();
                        setTimeout(() => toggleSubMenu(index), 150); // Delayed toggleSubMenu
                      }
                    }}
                  >
                      {React.createElement(item.icon, { size: 40 })}
                  </div>
                ) : (
                  <div
                    style={{
                      marginTop: '20px',
                      cursor: isOpen ? 'pointer' : 'default',
                    }}
                  >
                    <Link style={{ color: '#014c91'}} to={menuItem[index].link}>
                      {React.createElement(item.icon, { size: 40 })}
                    </Link>
                  </div>
                )}


                {/* Item Name*/}
                <div style={{ display: isOpen ? 'block' : 'none', marginLeft: '10px', marginTop: '20px', fontSize: '20px', fontWeight: 'bold'   }}>{item.name}</div>
                
                {/* Toggle Chevron Functionality */}
                {isOpen && item.submenuNames && item.submenuNames.length > 0 && (
                  <div
                    style={{ marginLeft: 'auto', marginTop: '20px', cursor: 'pointer' }}
                    onClick={() => toggleSubMenu(index)}
                  >
                    {React.createElement(expandedMenuIndex === index ? FaChevronDown : FaChevronRight, { size: 20 })}
                  </div>
                )}

          
          </div>

          {/* Display submenu items */}
            {item.submenuNames && isOpen && expandedMenuIndex === index && (
              <div style={{ marginLeft: '50px', marginTop: '12px', fontSize: '18px' }}>
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
