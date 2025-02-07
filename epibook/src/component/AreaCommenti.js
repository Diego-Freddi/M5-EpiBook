import { useEffect, useState } from 'react';
import ListaCommenti from './ListaCommenti';
import AggiungiCommento from './AggiungiCommento';

const AreaCommenti = ({ codiceLibro, theme }) => {
    const [commenti, setCommenti] = useState([]);
    const [caricamento, setCaricamento] = useState(true);
    const [errore, setErrore] = useState(null);
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzdjZjQyNjdjMWUwYjAwMTUxNzIxYWQiLCJpYXQiOjE3Mzc3NDA4ODEsImV4cCI6MTczODk1MDQ4MX0.X23fXNuGqMToGB2A0VIYWqvOIJXXMpVOWIXD4Eij-gc";

    const caricaCommenti = () => {
        if (!codiceLibro) {
            setCaricamento(false);
            return;
        }

        fetch(`https://striveschool-api.herokuapp.com/api/books/${codiceLibro}/comments`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Errore nel caricamento dei commenti");
            }
        })
        .then((data) => {
            setCommenti(data);
            setErrore(null);
        })
        .catch((error) => {
            setErrore(error.message);
        })
        .finally(() => {
            setCaricamento(false);
        });
    }

    useEffect(() => {
        setCaricamento(true);
        caricaCommenti();
    }, [codiceLibro]);

    return (
        <div className={`area-commenti mt-3 ${theme === 'scuro' ? 'df-dark-mode' : ''}`}>
            {!codiceLibro && <p className={theme === 'scuro' ? 'df-text-light' : ''}>Seleziona un libro per vedere i commenti</p>}
            {codiceLibro && caricamento && <p className={theme === 'scuro' ? 'df-text-light' : ''}>Caricamento commenti...</p>}
            {codiceLibro && errore && <p className="text-danger">Attenzione: {errore}</p>}
            {codiceLibro && <ListaCommenti
                commenti={commenti}
                token={token}
                onCommentoEliminato={caricaCommenti}
                onCommentoModificato={caricaCommenti}
                theme={theme}
            />}
            {codiceLibro && <AggiungiCommento 
                codiceLibro={codiceLibro} 
                onCommentoAggiunto={caricaCommenti}
                token={token}
                theme={theme}
            />}
        </div>
    )
}

export default AreaCommenti;