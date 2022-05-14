import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "../../axios";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { css } from "styled-components";

const Reviews = styled.div`
  padding: 20px;
`;

const ReviewsTitlePrimary = styled.h2`
  margin: 60px 20px 30px;
  padding: 5px 20px;
  font-weight: 400;
  background-color: #00000003;
  font-size: 1.7rem;
  letter-spacing: 2px;
  text-transform: uppercase;
`;

const ReviewsWrapper = styled.div`
  padding: 40px;
`;

const blockquote = css`	font-family: 'FontAwesome';
content: '\201C';
position: absolute;
font-size: 50px;
opacity: 0.3;`;

const ReviewsBlockquote = styled.blockquote`
  border-radius: 8px;
  position: relative;
  background-color: #fafafa;
  padding: 60px 50px 80px 50px;
  font-size: 0.9em;
  margin: 0 0 -50px;
  line-height: 1.6em;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);

  &:before {
    ${blockquote}

    top: 35px;
    left: 20px;
  }

  &:after {
    ${blockquote}

    right: 20px;
    bottom: 35px;
  }
`;

const ReviewsAuthor = styled.div`
  text-align: center;
`;

const ReviewsPicture = styled.div`
  height: 100px;
  width: 100px;
  border-radius: 50%;
  margin-bottom: 5px;
  z-index: 1;
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
`;

const ReviewsUsername = styled.h3`
  margin: 5px 0;
  font-weight: 800;
`;
const ReviewsRating = styled.p`
  margin: 5px 0;
  font-weight: 800;
`;

const ReviewsTitleSecondary = styled.h2`
  margin-top: 80px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: none;
  font-weight: 400;
  font-size: 1.9rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-align: center;
`;
const ReviewsButton = styled.button`
  position: absolute;
  bottom: 100px;
  left: 40px;
  padding: 15px 25px;
  outline: none;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  cursor: pointer;
  background-color: #a0a0a0;
  border-radius: 0.1vw;

  &:hover {
    background-color: #585858;
  }
`;

const FaArrowCircleLeftIcon = styled.i`
  color: #fff;
  margin-right: 8px;
`;

function ReviewsMovie() {
  const { id } = useParams();
  const imgUrl = "https://image.tmdb.org/t/p/w1280";
  let history = useHistory();
  const { t } = useTranslation();

  const [reviewsMovies, setReviewsMovies] = useState([]);

  useEffect(() => {
    async function fetchMoviesData() {
      try {
        const request = await axios.get(
          `/movie/${id}/reviews?api_key=${process.env.REACT_APP_THEMOVIEDB_API_KEY}`
        );
        setReviewsMovies(request.data.results);
      } catch (err) {
        console.error(err);
      }
    }
    fetchMoviesData();
  }, [id]);

  function handleClick() {
    history.push(history.goBack());
  }

  const setAvatar = (reviewsMovie) => {
    if (
      reviewsMovie.author_details.avatar_path?.startsWith(
        "/https://secure.gravatar.com/avatar"
      )
    ) {
      return "https://bit.ly/3sqhF58";
    }
    if (reviewsMovie.author_details.avatar_path) {
      return imgUrl + reviewsMovie.author_details.avatar_path;
    }

    if (!reviewsMovie.author_details.avatar_path) {
      return "https://bit.ly/3sqhF58";
    }
  };

  return (
    <Reviews>
      <ReviewsTitlePrimary>{t("reviews__title")}</ReviewsTitlePrimary>
      {reviewsMovies.length > 0 ? (
        <>
          {reviewsMovies?.map((reviewsMovie) => (
            <ReviewsWrapper>
              <figure>
                <ReviewsBlockquote>{reviewsMovie.content}</ReviewsBlockquote>
                <ReviewsAuthor>
                  <ReviewsPicture
                    src={`${setAvatar(reviewsMovie)}`}
                    alt={reviewsMovie.name}
                  />
                  <ReviewsUsername>
                    @{reviewsMovie.author_details.username}
                  </ReviewsUsername>
                  <ReviewsRating>
                    {reviewsMovie.author_details.rating ? (
                      reviewsMovie.author_details.rating + "/10"
                    ) : (
                      <ReviewsRating>{t("reviews__paragraph")}</ReviewsRating>
                    )}
                  </ReviewsRating>
                </ReviewsAuthor>
              </figure>
            </ReviewsWrapper>
          ))}
        </>
      ) : (
        <ReviewsTitleSecondary>{t("reviews__heading")}</ReviewsTitleSecondary>
      )}
      <ReviewsButton onClick={handleClick}>
        <FaArrowCircleLeftIcon className="fas fa-arrow-circle-left" />
        {t("button--four")}
      </ReviewsButton>
    </Reviews>
  );
}

export default ReviewsMovie;
