import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "../../axios";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const Translations = styled.div`
  padding: 20px;
`;

const TranslationsTitlePrimary = styled.h2`
  margin: 60px 20px;
  padding: 5px 20px;
  font-weight: 400;
  background-color: #00000003;
  font-size: 1.7rem;
  letter-spacing: 2px;
  text-transform: uppercase;
`;

const TranslationsShow = styled.div`
  margin: 60px 30px 80px;
`;

const TranslationsNames = styled.div`
  display: flex;
  background-color: #3a3a3a;
  color: #fff;
  border-radius: 5px;
  width: fit-content;
  padding: 8px 15px;
  text-align: center;

  > div {
    margin: 0 2px;
  }
`;

const TranslationsTitleSecondary = styled.h3`
  margin: 20px 0 5px;
`;

const TranslationsButton = styled.button`
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

const FaArrowCircleLeft = styled.i`
  color: #fff;
  margin-right: 8px;
`;

function TranslationsTVSerie() {
  const { id } = useParams();
  const { t } = useTranslation();
  let history = useHistory();

  const [translationsSeries, setTranslationsSeries] = useState([]);

  useEffect(() => {
    async function fetchSeriesData() {
      try {
        const request = await axios.get(
          `/tv/${id}/translations?api_key=${process.env.REACT_APP_THEMOVIEDB_API_KEY}`
        );
        setTranslationsSeries(request.data.translations);
      } catch (err) {
        console.error(err);
      }
    }
    fetchSeriesData();
  }, [id]);

  function handleClick() {
    history.push(history.goBack());
  }

  return (
    <Translations>
      <TranslationsTitlePrimary>
        {t("translations__title")}
      </TranslationsTitlePrimary>
      {translationsSeries?.map((translationsSerie, idx) => (
        <TranslationsShow key={idx}>
          {translationsSerie.data.overview.length > 0 && (
            <>
              <TranslationsNames>
                <div>{translationsSerie.english_name}/</div>
                <div>{translationsSerie.name}</div>
              </TranslationsNames>
              <TranslationsTitleSecondary>
                {translationsSerie.data.name}
              </TranslationsTitleSecondary>
              <p>{translationsSerie.data.overview}</p>
            </>
          )}
        </TranslationsShow>
      ))}
      <TranslationsButton onClick={handleClick}>
        <FaArrowCircleLeft className="fas fa-arrow-circle-left" />
        {t("button--four")}
      </TranslationsButton>
    </Translations>
  );
}

export default TranslationsTVSerie;
