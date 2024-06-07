import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './navbar.css';
import logo from '../../assets/logo.png';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';

const Menu = () => {
  return (
    <>
      <p><button onClick={() => scrollToSection('home')}>Home</button></p>
      <p><button onClick={() => scrollToSection('departements')}>About</button></p>
      <p><button onClick={() => scrollToSection('doctors')}>Doctors</button></p>
      <p><button onClick={() => scrollToSection('contact')}>Contact</button></p>
    </>
  )
}

const scrollToSection = (id) => {
  if (id === 'home' ) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
};
const Navbar = (props) => {
  const { visible } = props;
  const [toggleMenu, setToggleMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;

      if (scrollTop > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const checkIfLogedIn = () => {
      const accessToken = sessionStorage.getItem('accessToken');
      if (accessToken) setIsLoggedIn(true);

    };
    checkIfLogedIn();

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const redirectToSignUp = () => {
    navigate("/registration");
  }

  const handleLogout = () => {
    // Perform logout actions (e.g., delete access token from session storage)
    sessionStorage.removeItem("accessToken");
    setIsLoggedIn(false);
  };

  const iconColor = isScrolled ? '#000' : '#fff';

  if (!visible) return null;

  return (
    <div className={isScrolled ? 'brico__navbar scrolled ' : 'brico__navbar '}>
      <div className='brico__navbar-links_logo'>
       <button onClick={() => scrollToSection('home')}> <img src={logo} alt='logo' /></button>
      </div>
      <div className='brico__navbar-links'>
        <div className='brico__navbar-links_container'>
          <Menu />
        </div>
      </div>
      <div className={isScrolled ? 'brico__navbar-sign scrolled' : 'brico__navbar-sign'}>
        {/* Conditionally render either "Disconnect" button or "Sign Up" link */}
        {isLoggedIn ? (
          <button type='button' onClick={handleLogout}>Disconnect</button>
        ) : (<>
          <a className='mr-2 ml-4 font-bold' href="/login">Login </a>
          <button type='button' onClick={redirectToSignUp}>Sign Up</button>
        </>
        )}
      </div>
      <div className='brico__navbar-menu'>
        {toggleMenu
          ? <RiCloseLine color={iconColor} size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color={iconColor} size={27} onClick={() => setToggleMenu(true)} />
        }

        {toggleMenu && (
          <div className='brico__navbar-menu_container scale-up-center'>
            <div className='brico__navbar-menu_container-links'>
              <Menu />
              <div className='brico__navbar-menu_container-links-sign'>
                {/* Conditionally render either "Disconnect" button or "Sign Up" link */}
                {isLoggedIn ? (
                  <button type='button' onClick={handleLogout}>Disconnect</button>
                ) : (
                  <button type='button' onClick={redirectToSignUp}>Sign Up</button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar;
