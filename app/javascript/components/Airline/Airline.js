import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Header from './Header'
import styled from 'styled-components'

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
    const [reviews, setReviews] = useState({})
    const [loaded, setLoaded] = useState(false)

    const { slug } = useParams()
    const url = `/api/v1/airlines/${slug}`

    useEffect(() => {
        axios(url).
        then(resp => { 
            setAirline(resp.data)
            setLoaded(true)
        }).
        catch(resp => console.log(resp))
        
    }, [])

    return (
        
        <Wrapper>
            <Column>
                <Main>
                    { loaded && 
                        <Header attributes={airline.data.attributes}
                                reviews={airline.included} />
                    }
                </Main>
                <div className="reviews"></div>
            </Column>
            <Column></Column>
            
        </Wrapper>
    )
}

export default Airline