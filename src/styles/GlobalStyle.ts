import {createGlobalStyle} from 'styled-components'

export const GlobalStyle = createGlobalStyle`
html,
body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  background: #222528;
  box-sizing: border-box;
  font-family: 
    'SF Pro Display Regular';
}
#root{
  height: 100%;
}
::-webkit-scrollbar {
    background-color:transparent;
    width:8px;
    height: 8px;
}

::-webkit-scrollbar-track {
    background-color:transparent
}


::-webkit-scrollbar-thumb {
    background-color:#5F666D;
    border-radius:16px;
}


/* set button(top and bottom of the scrollbar) */
::-webkit-scrollbar-button {display:none}

`
