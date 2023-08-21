import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './books.css';

function Books() {
    const [books, setBooks] = useState([]);
    const [countBook, setCountBook] = useState(0);
    const [searchBook, setSearchBook] = useState('');

    useEffect(() => {
        const getBooks = async () => {
            try {
                const response = await axios.get("http://localhost:4000/books");
                setBooks(response.data);
                setCountBook(response.data.length);
            }catch(err) {
                console.log("Error: " + err);
            }
        }   
        getBooks();
    }, []);

    const deleteBook = async (id) => {
        try{
            await axios.delete(`http://localhost:4000/books/${id}`);
            window.location.reload();
        }catch(err){
            console.log("Erro: " + err);
        }
    } 

    const filterBook = books.filter(book => {
        return book.title.toLowerCase().startsWith(searchBook.toLowerCase());
    })

    return (
        <div className='container mt-5'>
            <div className='columns is-full'>
            <div className='column'>
                <p style={{fontSize: '1.5rem'}}>Total de Livros: {countBook}</p>
            </div>
            <div className='column'>
                <Link className='button is-fullwidth is-primary' to="/add">Adicionar livro</Link>
            </div>
            </div>

            <div className='columns is-multiline'>
                <div className='column is-full'>
                    <input
                        id='inputSearchBook'
                        type="text"
                        placeholder="Pesquisar livro por título"
                        value={searchBook}
                        onChange={(e) => setSearchBook(e.target.value)}
                    />
                </div>

                {searchBook.length > 0 && filterBook.map(book =>(
                    <div className='column is-one-quarter' id='searchedBook' key={book.id}>
                         <div className="card">
                        <div className="card-image">
                            <figure className="image is-4by3">
                            <img src={book.url} alt="imag"/>
                            </figure>
                        </div>
                        <div className="card-content">
                            <div className="media">
                            <div className="media-content">
                                <p className="title is-4 book-title">{book.title}</p>
                                <p className="subtitle is-6 book-description">{book.description}</p>
                            </div>
                            </div>
                        </div>
                        <footer className='card-footer'>
                        <Link className="card-footer-item" to={`/update/${book.id}`} style={{ backgroundColor: '#5F9EA0', color: 'white' }}>Editar</Link>
                        <Link className="card-footer-item" onClick={() => deleteBook(book.id)} style={{backgroundColor: '#B22222', color: 'white'}}>Deletar</Link>
                        </footer>
                    </div>
                    </div>
                ))}
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
                                <p className="title is-4 book-title">{book.title}</p>
                                <p className="subtitle is-6 book-description">{book.description}</p>
                            </div>
                            </div>
                        </div>
                        <footer className='card-footer'>
                        <Link className="card-footer-item" to={`/update/${book.id}`} style={{ backgroundColor: '#5F9EA0', color: 'white' }}>Editar</Link>
                        <Link className="card-footer-item" onClick={() => deleteBook(book.id)} style={{backgroundColor: '#B22222', color: 'white'}}>Deletar</Link>
                        </footer>
                    </div>
                </div>
                ))}
            </div>
        </div>
    )
}

export default Books