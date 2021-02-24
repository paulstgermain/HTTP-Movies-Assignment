import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

import MovieCard from './MovieCard';

const initFormValues = {
    id:'',
    title: '',
    director: '',
    metascore: '',
    stars: []
}

export default function UpdateMovie(props){
    const [movie, setMovie] = useState(initFormValues);
    const { movieList, setMovieList } = props;
    const { id } = useParams();
    const { push } = useHistory();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
        .then(res => {
            setMovie(res.data);
        })
    }, [])

    const handleChange = e => {
        e.preventDefault();

        setMovie({...movie, [e.target.name]: e.target.value});
    }

    const handleSubmit = e => {
        e.preventDefault();

        axios.put(`http://localhost:5000/api/movies/${id}`, movie)
        .then(res => {
            let movies = movieList.map(movie => {
                if (`${movie.id}` === id){
                    return res.data
                }
                return movie;
            });

            setMovieList(movies);

            push(`/`);
        })
        .catch(err => {
            console.log(err);
        })
    }

    return(
        <div>
            {movie && <MovieCard movie={movie} />}
            {movie && <form onSubmit={handleSubmit}>
                <input
                type='text'
                name='title'
                value={movie.title}
                placeholder='Film title here...'
                onChange={handleChange} />
                <input
                type='text'
                name='director'
                value={movie.director}
                placeholder='Director name here...'
                onChange={handleChange} />
                <input
                type='text'
                name='metascore'
                value={movie.metascore}
                placeholder='Metascore here...'
                onChange={handleChange} />
                <button>Submit Changes</button>
            </form>
            }
        </div>
    )
}