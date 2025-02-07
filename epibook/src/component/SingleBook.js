import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SingleBook = ({book, theme, onSelect, asinSelezionato}) => {
    const isSelected = book.asin === asinSelezionato;
    const navigate = useNavigate();

    const handleCardClick = () => {
        onSelect();
        navigate(`/book/${book.asin}`);
    };

    return (
        <Card
            className={`book-card ${isSelected ? 'selected' : ''} mt-3 ${theme === 'scuro' ? 'df-dark-mode' : ''}`}
            onClick={handleCardClick}
        >
            <div className="img-container"
                style={{
                    height: '25rem',
                    backgroundImage: `url(${book.img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}>
            </div>  
            <Card.Body>
                <Card.Title className='flex-grow-1'>{book.title.substring(0, 20)}...</Card.Title>
                <div className='d-flex justify-content-between'>
                    <Card.Text className={theme === 'scuro' ? 'text-white' : ''}>{book.category}</Card.Text>
                    <Card.Text className={theme === 'scuro' ? 'text-white' : ''}>{book.price}€</Card.Text>
                </div>
            </Card.Body>    
        </Card>
    )
}

export default SingleBook;  