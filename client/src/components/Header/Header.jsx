import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "../../styles/index.css";
import "./header.css";
import AuthService from "../../utils/auth.js";
import { useGlobalContext } from "../../utils/GlobalState.jsx";
import HeaderStyleRouter from "./HeaderStyleRouter.js";

function Header() {
  const [state, dispatch] = useGlobalContext();
  const styleRouter = new HeaderStyleRouter(state);

  return (
    <div className="search-bar ui segement fs-6">
      <Navbar className="primary-color-theme" expand="lg" fixed="top">
        <Container>
          <Nav.Link key={"home"} href="/">
            <Navbar.Brand>Project Title</Navbar.Brand>
          </Nav.Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav className={styleRouter.nav}>
              <Nav.Link href="/">Home</Nav.Link>
              {!AuthService.loggedIn() ? (
                <>
                  <Nav.Link href="/login">Login</Nav.Link>
                  <Nav.Link href="/signup">Sign Up</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link onClick={() => AuthService.logout()} href="/">
                    Sign Out
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
