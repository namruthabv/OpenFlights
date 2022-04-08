import React, {Fragment} from "react";
import styled from 'styled-components'
import Gray from "./Stars/Gray";
import Hover from "./Stars/Hover";
import Selected from "./Stars/Selected";

const RatingContainer = styled.div`
    text-align: center;
    border-radius: 4px;
    font-size:20px;
    padding: 40px 0 10px 0;
    border: 1px solid #e6e6e6;
    margin: 20px 0;
    padding:20px;
    background: #fff;
`
const RatingBox = styled.div`
    background: #fff;
    display: flex;
    justify-content: center;
    flex-direction: row-reverse;
    position: relative;
    overflow: hidden;

    input {
        display: none;
    }
  
    label {
        cursor: pointer;
        width: 40px;
        height: 40px;
        background-image: url("data:image/svg+xml;charset=UTF-8,${Gray}"); 
        background-repeat: no-repeat;
        background-position: center;
        background-size: 76%;
        transition: .3s;
    }

    input:checked ~ label, 
    input:checked ~ label ~ label {
        background-image: url("data:image/svg+xml;charset=UTF-8,${Selected}");
    }

    input:not(:checked) ~ label:hover,
    input:not(:checked) ~ label:hover ~ label {
        background-image: url("data:image/svg+xml;charset=UTF-8,${Hover}");
      }
`

const Field = styled.div`
    border-radius: 4px;

    input {
        min-height: 50px;
        border-radius: 4px;
        border: 1px solid #e6e6e6;
        margin: 12px 0;
        padding: 12px;
        width: 96%;
    }

    textarea {
        width: 100%;
        min-height: 80px;
        border-radius: 4px;
        border: 1px solid #e6e6e6;
        margin: 12px 0;
        padding: 12px;
    }
`

const Wrapper = styled.div`
    background:white;
    padding:20px;
    margin-left: 15px;
    border-radius: 0;
    padding-bottom:80px;
    border-left: 1px solid rgba(0,0,0,0.1);
    height: 100vh;
    padding-top: 100px;
    background: black;
    padding-right: 80px;
`

const SubmitButton = styled.button`
    color: #fff;
    background: #71b406;
    border-radius: 4px;
    padding: 12px 12px;
    font-size: 18px;
    position: center
    cursor: pointer;
    transition: ease-in-out 0.1s;
    border: 1px solid #71b406;
    margin-top: 20px;
    width: 100%;

    &:hover {
        background: #71b406;
        border-color: #71b406;
    }
`
const Headline = styled.div`
    font-size:20px;
    padding: 15px 0;
    font-weight: bold;
    color: #fff;
`

const RatingTitle = styled.div`
    font-size: 20px;
    font-weight: bold;
    padding-bottom: 20px;
`

const ReviewForm = (props) => {
    const ratingOptions = [5,4,3,2,1].map( (score, index) => {
        return (
            <Fragment>
                <input type="radio" value={score} key={index} checked={props.review.score==score} name="rating" onChange={ () => console.log("selected : ", score) } id={`rating-${score}`}/>
                <label onClick={props.setRating.bind(this, score)}></label>
            </Fragment>
        )
    })

    return (
        <Wrapper>
            <div className="form">
                <form onSubmit={props.handleSubmit}>
                    <Headline>Have a experience with airline {props.attributes.name} ? Share your review!</Headline>
                    <Field>
                        <input type="text" onChange={props.handleChange} title="title" name="title" value={props.review.title} placeholder="Review Title" />
                    </Field>
                    <Field>
                        <input type="text" onChange={props.handleChange} title="description" name="description" value={props.review.description} placeholder="Review Description" />
                    </Field>
                    <Field>
                        <RatingContainer>
                            <RatingTitle>"Rate this Airline"</RatingTitle>
                            <RatingBox>
                                {ratingOptions}
                            </RatingBox>
                        </RatingContainer>
                    </Field>
                    <SubmitButton type="Submit">Submit your review</SubmitButton>
                </form>

            </div>
        </Wrapper>
    )
}

export default ReviewForm