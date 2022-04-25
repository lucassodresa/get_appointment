import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

body {
  font-family: 'Lato', sans-serif;
}

.App {
  height: 100vh;
  width: 100%;
}

.animationLeft {
  opacity: 0;
  transform: translateX(-20px);
  animation: animationLeft 0.3s forwards;
}

@keyframes animationLeft {
  to {
    opacity: 1;
    transform: initial;
  }
}
`;
