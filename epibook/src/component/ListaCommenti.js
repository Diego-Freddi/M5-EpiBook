import { ListGroup, Button } from 'react-bootstrap';
import { useState } from 'react';
import ModificaCommento from './ModificaCommento';

const ListaCommenti = ({ commenti, token, onCommentoEliminato, onCommentoModificato, theme }) => {
    const [commentoInModifica, setCommentoInModifica] = useState(null);

    const handleElimina = (commentoId) => {
        fetch(`https://striveschool-api.herokuapp.com/api/comments/${commentoId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (response.ok) {
                onCommentoEliminato();
            } else {
                throw new Error('Errore durante l\'eliminazione del commento');
            }
        })
        .catch(error => {
            console.error('Errore:', error);
        });
    };

    return (
        <ListGroup className='mt-2'>
            {commenti.map((commento) => (
                <ListGroup.Item
                    key={commento._id}
                    className= {theme === 'scuro' ? 'df-dark-mode' : ''}
                >
                    {commentoInModifica === commento._id ? (
                        <ModificaCommento 
                            commento={commento}
                            token={token}
                            onModificaCompletata={() => {
                                setCommentoInModifica(null);
                                onCommentoModificato();
                            }}
                            onAnnulla={() => setCommentoInModifica(null)}
                        />
                    ) : (
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <p className={`mb-1 ${theme === 'scuro' ? 'df-text-light' : ''}`}>{commento.comment}</p>
                                <small className={theme === 'scuro' ? 'df-text-light' : 'text-muted'}>
                                    Voto: {commento.rate} ★
                                </small>
                            </div>
                            <div>
                                <Button 
                                    variant={theme === 'scuro' ? 'outline-light' : 'outline-primary'} 
                                    size="sm" 
                                    className="me-2"
                                    onClick={() => setCommentoInModifica(commento._id)}
                                >
                                    Modifica
                                </Button>
                                <Button 
                                    variant={theme === 'scuro' ? 'outline-light' : 'outline-danger'} 
                                    size="sm"
                                    onClick={() => handleElimina(commento._id)}
                                >
                                    Elimina
                                </Button>
                            </div>
                        </div>
                    )}
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
}

export default ListaCommenti;