import React, { useState } from 'react';
import { AlertCircle, Ambulance, ClipboardList, Phone, Home, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const EmergencyNav = () => {
  const { pathname } = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const routes = [
    {
      label: 'Home',
      icon: Home,
      href: '/',
      active: pathname === '/',
    },
    {
      label: 'Emergency',
      icon: AlertCircle,
      href: '/emergency',
      active: pathname === '/emergency',
    },
    {
      label: 'Contacts',
      icon: Phone,
      href: '/emergency/contacts',
      active: pathname === '/emergency/contacts',
    },
    {
      label: 'Ambulance',
      icon: Ambulance,
      href: '/emergency/ambulance-booking',
      active: pathname === '/emergency/ambulance-booking',
    },
    {
      label: 'Triage',
      icon: ClipboardList,
      href: '/emergency/triage',
      active: pathname === '/emergency/triage',
    },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-[#f6f3f3] shadow-sm py-2 sticky top-0 z-50">
      <div className="max-w-[1700px] container mx-auto lg:w-[86%] w-11/12 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center cursor-pointer">
          <Link to="/emergency" className="flex items-center">
          <img src="/collapse-logo.png" className="w-12 h-12" alt="Logo of care matrix" />
            <span className="text-2xl font-bold text-gray-800">Emergency Care</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-10">
          {routes.map((route, index) => (
            <Link
              key={index}
              to={route.href}
              className={`flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors duration-300 ${
                route.active
                  ? 'text-red-600 font-semibold border-b-2 border-red-500'
                  : 'border-b-2 border-transparent'
              } py-2`}
            >
              <route.icon className="h-5 w-5" />
              <span className="text-sm font-medium">{route.label}</span>
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-gray-700 hover:text-red-600 focus:outline-none"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="flex flex-col items-start space-y-2 py-4 px-6">
            {routes.map((route, index) => (
              <Link
                key={index}
                to={route.href}
                className={`flex items-center space-x-2 w-full text-gray-700 hover:text-red-600 transition-colors duration-300 ${
                  route.active
                    ? 'text-red-500 font-semibold border-l-4 border-red-500 pl-2'
                    : ''
                } py-2`}
                onClick={toggleMobileMenu}
              >
                <route.icon className="h-5 w-5" />
                <span className="text-sm font-medium">{route.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default EmergencyNav;  