import React from 'react'
import './Rating.css'

const Rating = (props) => {
    const score = (props.score/5) * 100

    return (
        <span className="star-wrapper">
            <span className="stars" style={{ width: score + "%"}}></span>
        </span>
    )
}

export default Rating

// step1: yarn add @fortawesome/fontawesome-free
// step2: Add these two lines in application.js file
    // import "@fortawesome/fontawesome-free/js/all";
    // import "@fortawesome/fontawesome-free/css/all";
// step3: bundle install
