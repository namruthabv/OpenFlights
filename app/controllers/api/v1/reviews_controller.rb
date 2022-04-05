module Api 
    module V1 
        class ReviewsController < ApplicationController
            def create
                review = airline.reviews.new(review_param)
                if review.save
                    render json: ReviewSerializer.new(review).serializable_hash.to_json
                else
                    render json: {error: review.errors.messages}, status: 422
                end
            end

            def destroy
                review = Review.find(params[:id])

                if review.destroy
                    head :no_content
                else
                    render json: {error: review.errors.messages}, status: 422
                end
            end

            private

            def airline
                @airline ||= Airline.find(params[:airline_id])
            end

            def review_param
                params.require(:review).permit(:title, :description, :score, :airline_id)
            end
        end
    end
end