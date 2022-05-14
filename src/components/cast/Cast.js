import React, { useState, useEffect } from "react";
import axios from "../../axios";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const CastTitle = styled.h2`
  font-weight: 500;
  padding: 5px 20px;
  margin: 10px 0 40px;
  background-color: rgba(0, 0, 0, 0.01);
  font-size: 1.7rem;
  letter-spacing: 2px;
  text-transform: uppercase;
`;
const CastWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;

  @media (max-width: 720px) {
    justify-content: center;
  }
`;

const CastMember = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;
`;

const CastPicture = styled.img`
  width: 250px;
  height: 275px;
`;

const CastInfo = styled.h3`
  font-family: "Poppins", sans-serif;
  height: 40px;
  background-color: rgb(51, 51, 51);
  font-size: 14px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 300;
`;

const CastButton = styled.button`
  width: 90%;
  padding: 15px 0;
  outline: none;
  color: #fff;
  background-color: #0073cf;
  margin: 30px auto 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 0.1vw;
  border: #0073cf;

  &:hover {
    background-color: #0f52b9;
  }
`;
const FaSpinnerIcon = styled.i`
  margin-left: 10px;
  color: #fff;
`;

function Cast({ fetchData }) {
  const imgUrl = "https://image.tmdb.org/t/p/w1280";
  const { t } = useTranslation();

  const [credits, setCredits] = useState([]);
  const [visible, setVisible] = useState(6);

  useEffect(() => {
    async function fetchCastData() {
      const request = await axios.get(fetchData);
      setCredits(request.data.cast);
    }
    fetchCastData();
  }, [fetchData]);

  const showMoreCharacters = () => {
    setVisible((prevNumber) => prevNumber + 6);
  };

  return (
    <div>
      {credits.length > 0 && (
        <>
          <CastTitle>{t("show__title--two")}</CastTitle>
          <CastWrapper>
            {credits?.slice(0, visible).map((credit) => (
              <div key={credit.id}>
                <CastMember>
                  <CastPicture
                    src={
                      credit.profile_path
                        ? imgUrl + credit.profile_path
                        : "https://bit.ly/3v9TucS"
                    }
                    alt="Character"
                  />
                  <CastInfo>{credit.name || credit.original_name}</CastInfo>
                </CastMember>
              </div>
            ))}
          </CastWrapper>
          {credits.length > 6 && (
            <CastButton onClick={showMoreCharacters}>
              {t("button--two")}
              <FaSpinnerIcon className="fas fa-spinner" />
            </CastButton>
          )}
        </>
      )}
    </div>
  );
}

export default Cast;
