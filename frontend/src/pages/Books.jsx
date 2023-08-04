import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Books() {
    const [books, setBooks] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:4000/books");
                setBooks(response.data);
            }catch(err) {
                console.log("Error: " + err);
            }
        }   
        fetchData();
    }, []);

    const handleUpdate = async (id) => {
        try{
            await axios.get("http://localhost:4000/update/" + id)
        }catch(err){
            console.log("Erro: " + err);
        }
    }

    const handleDelete = async (id) => {
        try{
            await axios.delete("http://localhost:4000/books/" + id);
            window.location.reload();
        }catch(err) {
            console.log("Erro: " + err);
        }
    }
    return (
        <div>
            <h1>Meus livros</h1>
            <div className='books'>
                {books.map(book => (
                    <div className='book' key={book.id}> 
                        {book.cover && <img src={book.cover} alt=''/>}
                        <h2>{book.title}</h2>
                        <p>{book.description}</p>
                        <button className='btn-update' onClick={() => handleUpdate(book.id)}><Link to={`/update/${book.id}`}
                         className='btn-update-link'>Atualizar livro</Link></button>
                        <button className='btn-delete' onClick={() => handleDelete(book.id)}>Excluir livro</button>
                    </div>
                ))}
            </div>
            <button><Link to="/add">Adicionar livro</Link></button>
            
        </div>
    )
}

export default Books