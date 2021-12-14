import styled from 'styled-components';
import { Container } from './Common';
import { ReactComponent as Bookmark } from './icons/Bookmark.svg';
import { ReactComponent as Like } from './icons/Like.svg';
import { ReactComponent as Star } from './icons/Star.svg';

const Title = styled.h1`
  padding-top: 30px;
  padding-bottom: 10px;
  font-size: 24px;
  color: #172b4d;
`;

const LegendContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
`;

const LegendItem = styled.div`
  display: flex;
  justify-content: center;
  margin-right: 20px;
  svg {
    margin-right: 10px;
  }
`;

const Legend = ({ title }) => (
  <Container>
    <Title>{title}</Title>
    <LegendContainer>
      <LegendItem>
        <Star />
        Highly Recommended
      </LegendItem>
      <LegendItem>
        <Like />
        Recommended
      </LegendItem>
      <LegendItem>
        <Bookmark />
        Nice to Have
      </LegendItem>
    </LegendContainer>
  </Container>
);

export default Legend;
