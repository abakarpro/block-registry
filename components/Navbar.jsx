import PropTypes from 'prop-types';
import { Navbar as BootstrapNavbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';

const Navbar = ({ user, onLogout, currentPath }) => {
  let currentPage = '';
  switch (currentPath) {
    case '/':
      currentPage = 'Home';
      break;
    case '/user':
      currentPage = 'User Form';
      break;
    case '/login':
      currentPage = 'Login';
      break;
    case '/add-doc':
      currentPage = 'Add Document';
      break;
    case '/search-doc':
      currentPage = 'Search Document';
      break;
    case '/profil':
      currentPage ='Profil'
      break;
    case '/tasklist':
      currentPage ='Tasks'
      break;
      default:
      currentPage = '';
  
  }
    const handleProfil = () => {
        window.location.href = "/profil"
    }
  return (
    <BootstrapNavbar bg="dark" variant="dark" expand="lg">
      <Container>
        <BootstrapNavbar.Brand href="/">
        <img src={"/doc.svg"} alt="logo" style={{ width: '20px', height: '20px'}}/> <></>
        Block-Registry </BootstrapNavbar.Brand> 
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {currentPage && <Nav.Link href={currentPath}>{currentPage}</Nav.Link>}
          </Nav>
          <Nav className="ms-auto">
            {user ? (
              <NavDropdown title={`Welcome, ${user.username}`} id="basic-nav-dropdown" align="end">
                <NavDropdown.Item onClick={handleProfil}> <FaUserCircle /> Profil</NavDropdown.Item>
                <hr />
                <NavDropdown.Item onClick={onLogout}> <FaSignOutAlt /> Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link href="/login"> <FaSignInAlt /> Login</Nav.Link>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};



Navbar.propTypes = {
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object.isRequired,
  onLogout: PropTypes.func.isRequired,
  currentPath: PropTypes.string.isRequired,
};

export default Navbar;
