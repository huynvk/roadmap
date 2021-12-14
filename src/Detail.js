import styled from 'styled-components';
import { ReactComponent as Bookmark } from './icons/Bookmark.svg';
import { ReactComponent as Like } from './icons/Like.svg';
import { ReactComponent as Star } from './icons/Star.svg';

const getRecommendationIcon = (level) => {
  switch (level) {
    case 1:
      return <Bookmark />;
    case 2:
      return <Like />;
    case 3:
      return <Star />;
    default:
      return null;
  }
};

const DetailContainer = styled.div`
  position: absolute;
  right: 40px;
  top: -20px;
  box-sizing: border-box;
  border: 1px solid #cdd1d6;
  padding: 20px 30px;
  width: 500px;
  min-height: 350px;
  border-radius: 5px;
  z-index: 99;
  background: #ffffff;

  h3 {
    font-size: 20px;
    color: #172b4d;
    margin-bottom: 10px;
  }

  .skill-type {
    font-size: 12px;
    color: #42526e;
  }

  h6 {
    font-size: 14px;
    color: #172b4d;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  p {
    font-size: 14px;
    color: #172b4d;
  }
`;

const Details = ({ details, recommendation }) => {
  return (
    <DetailContainer>
      <h3 className='title'>
        {getRecommendationIcon(recommendation)} {details.label}
      </h3>
      {details.skillType && (
        <div className='skill-type'>{details.skillType}</div>
      )}

      <h6>Description</h6>
      {details.description
        ? details.description.split('\n').map((e, i) => <p key={i}>{e}</p>)
        : 'N/A'}

      <h6>References</h6>
      {details.reference
        ? details.reference.split('\n').map((e, i) => <p key={i}>{e}</p>)
        : 'N/A'}
    </DetailContainer>
  );
};

export default Details;
