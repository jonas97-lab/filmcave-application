import React from "react";
import styled from "styled-components";

const FooterMain = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  position: absolute;
  left: 0;
  bottom: 0;
  height: 60px;
  width: 100%;
`;

const FooterParagraph = styled.p`
  font-size: 0.9rem;
`;

function Footer() {
  return (
    <FooterMain>
      <FooterParagraph>
        Copyright &copy; {new Date().getFullYear()} FilmCave, Inc. All Rights
        Reserved
      </FooterParagraph>
    </FooterMain>
  );
}

export default Footer;
