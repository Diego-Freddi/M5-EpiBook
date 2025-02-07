import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const AggiungiCommento = ({ codiceLibro, onCommentoAggiunto, token, theme }) => {
    const [commento, setCommento] = useState('');
    const [voto, setVoto] = useState(1);
    const [invioInCorso, setInvioInCorso] = useState(false);
    const [errore, setErrore] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setInvioInCorso(true);
        setErrore(null);
        
        fetch('https://striveschool-api.herokuapp.com/api/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                comment: commento,
                rate: voto,
                elementId: codiceLibro
            })
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                return response.text().then(text => {
                    throw new Error(`Errore durante l'invio del commento: ${text}`);
                });            
            }
        })
        .then(() => {
            onCommentoAggiunto();
            setCommento('');
            setVoto(1);
        })
        .catch((error) => {
            setErrore(error.message);
        })
        .finally(() => {
            setInvioInCorso(false);
        });
    }

    return (
        <Form onSubmit={handleSubmit} className='mt-4'>
            <Form.Group className='mb-3'>
                <Form.Label className={theme === 'scuro' ? 'df-text-light' : ''}>Commento</Form.Label>
                <Form.Control
                    as='textarea'
                    rows={3}
                    value={commento}
                    onChange={(e) => setCommento(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Label className={theme === 'scuro' ? 'df-text-light' : ''}>Voto</Form.Label>
                <Form.Select
                    className={theme === 'scuro' ? 'df-dark-input' : ''}
                    value={voto}
                    onChange={(e) => setVoto(parseInt(e.target.value))}
                >
                    {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>{num}</option>
                    ))}
                    {/* <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option> */}
                </Form.Select>
            </Form.Group>
            {errore && <p className='text-danger'>{errore}</p>}

            <Button
                type='submit'
                disabled={invioInCorso}
                variant={theme === 'scuro' ? 'light' : 'primary'}
            >
                {invioInCorso ? 'Invio in corso...' : 'Invia'}
            </Button>
        </Form>
    );   
}

export default AggiungiCommento;