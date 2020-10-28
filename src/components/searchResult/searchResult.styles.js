import styled from "styled-components";

export const Separator = styled.div`
    width: 100%;
    border-bottom: 1px solid var(--color-separator);
    margin: 16px 0 12px;
    &:last-child {
        display: none;
    }
`;

export const Container = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%); /* for IE 9 */
  -webkit-transform: translate(-50%, -50%); 
`;
