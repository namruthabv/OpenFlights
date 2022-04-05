import React, {Fragment} from "react";

const ReviewForm = (props) => {
    const ratingOptions = [5,4,3,2,1].map( (score, index) => {
        return (
            <Fragment>
                <input type="radio" value={score} key={index} name="rating" onChange={ () => console.log("selected : ", score) } id={`rating-${score}`}/>
                <label></label>
            </Fragment>
        )
    })

    return (
        <div className="wrapper">
            <div className="form">
                <form onSubmit={props.handleSubmit}>
                    <div>Have a experience with airline {props.attributes.name} ? Share your review!</div>
                    <div className="field">
                        <input type="text" onChange={props.handleChange} title="title" name="title" value={props.review.title} placeholder="Review Title" />
                    </div>
                    <div className="field">
                        <input type="text" onChange={props.handleChange} title="description" name="description" value={props.review.description} placeholder="Review Description" />
                    </div>
                    <div className="field">
                        <div className="rating-container">
                            <div className="rating-title-text">"Rate this Airline"</div>
                            {ratingOptions}
                        </div>
                    </div>
                    <button type="submit">Submit your review</button>
                </form>

            </div>
        </div>
    )
}

export default ReviewForm