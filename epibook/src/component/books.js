import { Col, Row } from 'react-bootstrap';
import fantasy from '../dati/fantasy.json';
import history from '../dati/history.json';
import romance from '../dati/romance.json';
import scifi from '../dati/scifi.json';
import horror from '../dati/horror.json';
import SingleBook from './SingleBook.js';
import { useTheme } from '../context/ThemeContext';

const generi = {
    fantasy,
    history,
    romance,
    scifi,
    horror
}

const Books = ({ searchQuery, sceltaGenere = 'all', onLibroSelezionato, asinSelezionato }) => {
    const { theme } = useTheme(); //accediamo al tema chiaro/scuro
    
    // Creiamo un Set di libri unici basato sull'ASIN
    const getUniqueBooks = (books) => {
        const uniqueBooks = new Map();
        books.forEach(book => {
            if (!uniqueBooks.has(book.asin)) {
                uniqueBooks.set(book.asin, book);
            }
        });
        return Array.from(uniqueBooks.values());
    };

    const currentBooks = sceltaGenere === 'all'
        ? getUniqueBooks(Object.values(generi).flat()) // Applica il filtro di unicità
        : generi[sceltaGenere];

    const FilteredBooks = currentBooks.filter((libro) => {
        return libro.title.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
        <div className='df-books-container'>
            <div className={`df-books-title-container p-3 rounded my-3 ${theme === 'scuro' ? 'bg-dark navbar-dark border border-light' : 'bg-body-secondary'}`}>
                <h2 className={`df-books-title text-center my-4 ${theme === 'scuro' ? 'text-white' : 'text-muted'}`}>
                    EpiBooks
                </h2>
            </div>
        <Row>
            {FilteredBooks.map((libro) => {
                return (
                    <Col key={`${libro.asin}-${libro.category}`} sm={6} md={4} lg={3} xl={3}>
                        <SingleBook 
                            book={libro} 
                            theme={theme}
                            onSelect={() => onLibroSelezionato(libro.asin)}
                            asinSelezionato={asinSelezionato}
                        />
                    </Col>
                )
            })}
        </Row>
        </div>
    )
}

export default Books;