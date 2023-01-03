import styled from 'styled-components';

export const Main = styled.main`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const SlideImage = styled.div<{ img: string }>`
  width: 100%;
  height: 0;
  padding-top: 66.64%;
  background-image: url(${(p: any) => p.img});
  background-size: cover;
`;
