import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const initFormValues = {
    id:''
}

export default function UpdateMovie(){
    const [movie, setMovie] = useState(null);
    const [formValues, setFormValues] = useState();
    const params = useParams();
    console.log(params);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${params.id}`)
        .then(res => {
            setMovie(res.data);
        })
    }, [])


    return(
        <div>
            <form>
                <input />
                <input />
                <input />
            </form>
        </div>
    )
}