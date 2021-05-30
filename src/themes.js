import { createGlobalStyle } from 'styled-components';

export const lightTheme = {
	body: '#fff',
	fontColor: '#3a3a3a',
	logoTextColor: '#3a3a3a',
	buttonColor: '#3a3a3a',
	buttonBorder: '#a0a0a0',
	buttonBg: '#fff',
	buttonHoverColor: '#fff',
	buttonHover: '#3a3a3a',
	border: '#0000000f',
	footerBg: '#fff',
	submenuBg: '#0000000f',
};

export const darkTheme = {
	body: '#032541',
	fontColor: '#fff',
	logoTextColor: '#fff',
	buttonColor: '#fff',
	buttonBorder: '#032541',
	buttonBg: '#0073cf',
	buttonHoverColor: '#fff',
	buttonHover: '#0047ab',
	border: '#0f4d92',
	footerBg: '#032541',
	submenuBg: '#0a3564 ',
};

export const GlobalStyles = createGlobalStyle`

body {
    background-color: ${(props) => props.theme.body};
    color: ${(props) => props.theme.fontColor};
}

button{
    background-color: ${(props) => props.theme.buttonBg};
    color: ${(props) => props.theme.buttonColor};
    border: 1px solid ${(props) => props.theme.buttonBorder};
}

button:hover{
    background-color: ${(props) => props.theme.buttonHover};
    color: ${(props) => props.theme.buttonHoverColor};
}

nav {
    background-color: ${(props) => props.theme.submenuBg};
    border-top: 1px solid ${(props) => props.theme.border};
    border-bottom: 1px solid ${(props) => props.theme.border};
}

h2 {
    background-color: ${(props) => props.theme.headingBg};
    border: 1px solid ${(props) => props.theme.border};
}

h1 {
    color: ${(props) => props.theme.fontColor};
}

p {
    color: ${(props) => props.theme.logoTextColor};
}

a {
    color: ${(props) => props.theme.fontColor};
}

footer {
    border-top: 1px solid ${(props) => props.theme.border};
    color: ${(props) => props.theme.fontColor};
    background-color: ${(props) => props.theme.footerBg};
}
`;
