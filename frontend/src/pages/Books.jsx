import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Books() {
    const [books, setBooks] = useState([]);
    
    useEffect(() => {
        const getBooks = async () => {
            try {
                const response = await axios.get("http://localhost:4000/books");
                setBooks(response.data);
            }catch(err) {
                console.log("Error: " + err);
            }
        }   
        getBooks();
    }, []);


    /*const handleUpdate = async (id) => {
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
    }*/

    const deleteBook = async (id) => {
        try{
            await axios.delete(`http://localhost:4000/books/${id}`);
            window.location.reload();
        }catch(err){
            console.log("Erro: " + err);
        }
    } 

    return (
        <div className='container mt-5'>
            <div className='columns is-full'>
            <Link className='button is-fullwidth is-primary' to="/add">Adicionar livro</Link>
            </div>
            <div className='columns is-multiline'>
                {books.map(book => (
                    <div className='column is-one-quarter' key={book.id}>
                    <div className="card">
                        <div className="card-image">
                            <figure className="image is-4by3">
                            <img src={book.url} alt="imag"/>
                            </figure>
                        </div>
                        <div className="card-content">
                            <div className="media">
                            <div className="media-content">
                                <p className="title is-4">{book.title}</p>
                                <p className="subtitle is-6">{book.description}</p>
                            </div>
                            </div>
                        </div>
                        <footer className='card-footer'>
                        <Link className="card-footer-item"to={`/update/${book.id}`}>Editar</Link>
                        <a className="card-footer-item" onClick={() => deleteBook(book.id)}>Deletar</a>
                        </footer>
                    </div>
                </div>
                ))}
            </div>
        </div>
        /*<div>
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
            
        </div>*/
    )
}

export default Books