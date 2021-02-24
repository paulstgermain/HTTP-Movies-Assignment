import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const initMovieValues = {
    title: '',
    director: '',
    metascore: '',
    stars: ''
}

export default function AddMovie(props){
    const [newMovie, setNewMovie] = useState(initMovieValues);
    const { push } = useHistory();
    const { setMovieList } = props;

    const changeHandler = e => {
        e.preventDefault();

        setNewMovie({...newMovie, [e.target.name]: e.target.value});
    }

    const submitHandler = e => {
        e.preventDefault();

        let starsResult = newMovie.stars.split(', ');
        let scoreResult = Number(newMovie.metascore);
        let newFilm = {
            ...newMovie,
            metascore: scoreResult,
            stars: starsResult
        }

        axios.post('http://localhost:5000/api/movies', newFilm)
        .then(res => {
            setMovieList(res.data);
            
            setTimeout(() => {
                push('/');
            }, 50)
        })
        .catch(err => {
            console.log(err);
        })
    }

    return(
        <div>
            <form onSubmit={submitHandler}>
                <label>Title
                    <input
                    type='text'
                    name='title'
                    value={newMovie.title}
                    onChange={changeHandler} />
                </label>

                <label>Director
                    <input
                    type='text'
                    name='director'
                    value={newMovie.director}
                    onChange={changeHandler} />
                </label>

                <label>Metascore
                    <input
                    type='text'
                    name='metascore'
                    value={newMovie.metascore}
                    onChange={changeHandler} />
                </label>

                <label>Stars
                    <input
                    type='text'
                    name='stars'
                    value={newMovie.stars}
                    onChange={changeHandler}
                    placeholder='Separate Stars w/ Comma' />
                </label>

                <button>Submit</button>
            </form>
        </div>
    )
}