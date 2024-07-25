import { css } from "styled-components"; // eslint-disable-line

const mobile = (props) => css`
  @media only screen and (max-width: 380px) {
    ${props}
  }
`;

export default mobile;
