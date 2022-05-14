import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const WatchlistButton = styled.button`
  width: 100%;
  left: 0;
  bottom: 0;
  border: none;
  position: absolute;
  font-size: 14px;
  cursor: pointer;
  color: #fff;
  background-color: rgb(51, 51, 51);
  padding: 10px 25px;

  &:hover {
    height: 40px;
  }
`;

const FaPlusCircleIcon = styled.i`
  color: #fff;
  margin-left: 8px;
`;

const RemoveFromWatchlist = () => {
  const { t } = useTranslation();

  return (
    <div>
      <WatchlistButton>
        {t("button--six")}
        <FaPlusCircleIcon className="fas fa-plus-circle" />
      </WatchlistButton>
    </div>
  );
};

export default RemoveFromWatchlist;
