import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Airline = () => {

    const [airline, setAirline] = useState({})
    const [reviews, setReviews] = useState({})

    const { slug } = useParams()
    const url = `/api/v1/airlines/${slug}`
    useEffect(() => {

        axios(url).
        then(resp => console.log(resp)).
        catch(resp => console.log(resp))
    }, [])

    return (<div> This is the Airline#index ......s component!</div>)
}

export default Airline