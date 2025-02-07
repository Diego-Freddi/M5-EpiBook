import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, Row, Col, Card } from 'react-bootstrap';
import AreaCommenti from './AreaCommenti';
import { useTheme } from '../context/ThemeContext';
// Importiamo tutti i generi
import fantasy from '../dati/fantasy.json';
import history from '../dati/history.json';
import romance from '../dati/romance.json';
import scifi from '../dati/scifi.json';
import horror from '../dati/horror.json';

// Oggetto generi come in books.js
const generi = {
    fantasy,
    history,
    romance,
    scifi,
    horror
}

const BookDetails = () => {
    const { asin } = useParams();
    const [book, setBook] = useState(null);
    const { theme } = useTheme();

    useEffect(() => {
        // Cerchiamo il libro in tutti i generi
        const foundBook = Object.values(generi)
            .flat()
            .find(book => book.asin === asin);
        setBook(foundBook);
    }, [asin]);

    if (!book) {
        return <div className="text-center">Libro non trovato</div>;
    }

    return (
        <Container className="my-4">
            <Row>
                <Col md={8}>
                    <Card className={theme === 'scuro' ? 'df-dark-mode' : ''}>
                        <Row className="g-0">
                            <Col md={4}>
                                <div className="img-container"
                                    style={{
                                        height: '400px',
                                        backgroundImage: `url(${book.img})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat'
                                    }}>
                                </div>
                            </Col>
                            <Col md={8}>
                                <Card.Body>
                                    <Card.Title className={theme === 'scuro' ? 'df-text-light' : ''}>
                                        {book.title}
                                    </Card.Title>
                                    <Card.Text className={theme === 'scuro' ? 'df-text-light' : ''}>
                                        <span className="fw-bold">Categoria:</span> {book.category}
                                    </Card.Text>
                                    <Card.Text className={theme === 'scuro' ? 'df-text-light' : ''}>
                                        <span className="fw-bold">Prezzo:</span> {book.price}€
                                    </Card.Text>
                                    <Card.Text className={theme === 'scuro' ? 'df-text-light' : ''}>
                                        <span className="fw-bold">ASIN:</span> {book.asin}
                                    </Card.Text>
                                </Card.Body>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col md={4}>
                    <AreaCommenti 
                        codiceLibro={asin}
                        theme={theme}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default BookDetails;
