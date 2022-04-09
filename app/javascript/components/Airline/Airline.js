import React, { useState, useEffect, Fragment } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Header from './Header'
import styled from 'styled-components'
import ReviewForm from './ReviewForm'
import { objectOf } from 'prop-types'
import Review from './Review'

const Wrapper = styled.div`
    margin-left: auto;
    margin-right: auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr); 
`

const Column = styled.div`
    background: #fff;
    height: 100vh;
    overflow: scroll;

    &:last-child {
        background: #000;
    }
`

const Main = styled.div`
    padding-left: 50px;
`

const Airline = () => {

    const [airline, setAirline] = useState({})
    const [review, setReview] = useState({})
    const [reviews, setReviews] = useState({})
    const [loaded, setLoaded] = useState(false)

    const { slug } = useParams()
    const url = `/api/v1/airlines/${slug}`

    useEffect(() => {
        axios(url).
        then(resp => { 
            setAirline(resp.data)
            setReviews(resp.data.included)
            setLoaded(true)
        }).
        catch(resp => console.log(resp))
        
    }, [])

    const handleChange = (e) => {
        e.preventDefault()

        setReview(Object.assign({}, review, {[e.target.name]: e.target.value}))
        //console.log("review:", review)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const csrfToken = document.querySelector('[name=csrf-token]').content
        axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

        const airline_id = airline.data.id
        //console.log("airline_id:", airline_id)
        //console.log("review:", review)
        axios.post("/api/v1/reviews", {review, airline_id}).
            then(resp => {
                setReviews([...reviews, resp.data.data])
                const included = [...airline.included, resp.data.data] // push the new review in resp.data.data into airline.included
                setAirline({...airline, included}) // this is update airline : so that airline will now have airline and included 
                setReview({title:'', description: '', score: 0}) // since new review is set, clear out the review.
            }  ).
            catch(resp => console.log(resp))
    }

    const setRating = (score, e) => {
        e.preventDefault()
        setReview({...review, score})
    }
    
    let userReviews 
    let total, average = 0
    if (loaded && reviews) {

        total = reviews.reduce((total, review) => total + review.attributes.score, 0)
        average = total > 0 ? (parseFloat(total) / parseFloat(reviews.length)).toFixed(2) : 0

        userReviews = reviews.map( (review, index) => {
            return (
                <Review key={index} id={review.id} attributes={review.attributes} />
            )
        })
    }

    return (
        
        <Wrapper>
            { loaded &&
                <Fragment>
                <Column>
                    <Main>
                        <Header attributes={airline.data.attributes}
                                reviews={reviews} 
                                average = {average}/>
                        {userReviews}
                    </Main>
                </Column>
                <Column>
                    <ReviewForm handleChange={handleChange} handleSubmit={handleSubmit}
                                attributes={airline.data.attributes} setRating={setRating} review={review}/>
                </Column>
                </Fragment>
            }
        </Wrapper>
    )
}

export default Airline