import React from 'react'

const Header = (props) => {

    const { name , image_url, avg_score } = props.attributes
    const total_reviews = props.reviews.length

    return(
        <div className='wrapper'>
            <h1> <img src={image_url} alt={name} /> {name} </h1>
             
            <div>
                <div className='totalReviews'>{total_reviews} user reviews</div>
                <div className='starReviews'></div>
                <div className='totalOutOf'> 3 out of 5</div>
            </div>
        </div>
    )
}

export default Header