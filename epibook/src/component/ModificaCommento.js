import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const ModificaCommento = ({ commento, token, onModificaCompletata, onAnnulla }) => {
    const [testoModificato, setTestoModificato] = useState(commento.comment);
    const [votoModificato, setVotoModificato] = useState(commento.rate);
    const [invioInCorso, setInvioInCorso] = useState(false);
    const [errore, setErrore] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setInvioInCorso(true);
        setErrore(null);

        fetch(`https://striveschool-api.herokuapp.com/api/comments/${commento._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                comment: testoModificato,
                rate: votoModificato
            })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Errore nella modifica del commento');
            }
        })
        .then(data => {
            onModificaCompletata(data);
        })
        .catch(error => {
            setErrore(error.message);
        })
        .finally(() => {
            setInvioInCorso(false);
        });
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Control
                as="textarea"
                rows={3}            
                value={testoModificato}
                onChange={(e) => setTestoModificato(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Select    
                value={votoModificato}
                onChange={(e) => setVotoModificato(e.target.value)}>
                    {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>{num}</option>
                    ))}
                </Form.Select>
            </Form.Group>

            {errore && (
                <div className="alert alert-danger">{errore}</div>
            )}

            <div className="d-flex justify-content-end gap-2">
                <Button 
                variant='secondary'
                size='sm'   
                onClick={onAnnulla}>
                    Annulla
                </Button>
                <Button 
                type='submit'
                variant='primary'
                size='sm'
                disabled={invioInCorso}>
                    {invioInCorso ? 'Modificando...' : 'Modifica'}
                </Button>
            </div>
        </Form>
    )
}

export default ModificaCommento;