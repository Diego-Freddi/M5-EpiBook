import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Books from './books';
import AreaCommenti from './AreaCommenti';
import { useTheme } from '../context/ThemeContext';

const LatestRelease = ({ searchQuery, sceltaGenere }) => {
    const [asinSelezionato, setAsinSelezionato] = useState(null);
    const { theme } = useTheme();

    const handleLibroSelezionato = (asin) => {
        // Se clicco sullo stesso libro, lo deseleziono
        setAsinSelezionato(currentAsin => currentAsin === asin ? null : asin);
    };

    return (
        <Container>
            <Row>
                <Col xs={12}>
                    <Books
                        searchQuery={searchQuery}
                        sceltaGenere={sceltaGenere}
                        asinSelezionato={asinSelezionato}
                        onLibroSelezionato={handleLibroSelezionato}
                    />
                </Col>
                {/* <Col xs={4}>
                    <AreaCommenti 
                        codiceLibro={asinSelezionato} 
                        theme={theme} 
                    />
                </Col> */}
            </Row>
        </Container>
    );
};

export default LatestRelease; 