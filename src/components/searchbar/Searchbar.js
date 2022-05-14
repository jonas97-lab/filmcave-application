import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const SearchBar = styled.form`
  max-width: 75%;
  height: 50px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  padding: 0px 20px;
  border: solid 1px #a0a0a0;
  margin: 0 auto;
`;

const SearchBarInput = styled.input`
  font-family: "Poppins", sans-serif;
  width: 100%;
  height: 30px;
  border: none;
  outline: none;
  font-size: 13px;
`;

const FaSearchIcon = styled.i`
  color: #3a3a3a;
  font-size: 16px;
`;

function Searchbar({ getQuery }) {
  const { t } = useTranslation();
  const [text, setText] = useState("");

  const onChange = (q) => {
    setText(q);
    getQuery(q);
  };

  return (
    <SearchBar>
      <SearchBarInput
        className="searchbar__input"
        type="text"
        placeholder={t("searchbar__text")}
        value={text}
        onChange={(e) => onChange(e.target.value)}
      />
      <FaSearchIcon className="fas fa-search" />
    </SearchBar>
  );
}

export default Searchbar;
