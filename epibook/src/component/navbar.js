
import {Container, Nav, Navbar, NavDropdown, Form, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

function MyNavbar({onGenereChange, onSearchChange}) {
    const { theme, toggleTheme } = useTheme();
    const genere = ['fantasy', 'horror', 'history', 'romance', 'scifi'];

    return (
        <Navbar
        expand="lg"
        className={theme === 'scuro' ? 'bg-dark navbar-dark' : 'bg-body-tertiary'}>
            <Container>
                <Navbar.Brand as={Link} to="/">EpiBooks</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>

                        <NavDropdown title="Generi" id="basic-nav-dropdown">
                            <NavDropdown.Item
                                onClick={() => onGenereChange ('all')}>
                                Tutti
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            {genere.map((genere) => {
                                return (
                                    <NavDropdown.Item
                                        key={genere}
                                        href={`#/${genere}`}
                                        onClick={() => onGenereChange(genere)}>
                                        {genere}
                                    </NavDropdown.Item>
                                )
                            })}
                        </NavDropdown>
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Cerca un libro"
                            className="me-2 df-search-input"
                            aria-label="Search"
                            // Invia il valore di ricerca al componente padre
                            onChange={(e) => onSearchChange(e.target.value)}
                        />
                        <Button
                            variant={theme === 'scuro' ? 'light' : 'dark'}
                            onClick={toggleTheme}
                            className="df-theme-button"
                            aria-label={`Cambia tema in modalità ${theme === 'scuro' ? 'chiaro' : 'scuro'}`}>
                            {theme === 'scuro' ? '☀️' : '🌙'}
                        </Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MyNavbar;