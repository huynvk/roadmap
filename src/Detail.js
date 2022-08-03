import { Button } from '@mui/material';
import Chip from '@mui/material/Chip';
import { useState } from 'react';
import styled from 'styled-components';
import { httpclient } from './httpclient';
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
    margin-top: 10px;
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

  i {
  }
`;

const userSkillStatuses = {
  WISH: 'wish',
  INPROGRESS: 'in-progress',
  SUBMITTED: 'submitted',
  CONFIRMED: 'confirmed',
};

const renderCTA = (userId, skillId, status, setUserSkill) => {
  // if (!userSkill) {
  //   return '';
  // }
  // const status = userSkill.status;

  if (!status) {
    return (
      <Button
        onClick={() => {
          setUserSkill({ userId, skillId, status: userSkillStatuses.WISH });
          httpclient.put(`users/${userId}/skills/${skillId}/status`, {
            status: userSkillStatuses.WISH,
          });
        }}
      >
        Add To Wish List
      </Button>
    );
  }

  if (status === userSkillStatuses.WISH) {
    return (
      <Button
        onClick={() => {
          setUserSkill({
            userId,
            skillId,
            status: userSkillStatuses.INPROGRESS,
          });
          httpclient.put(`users/${userId}/skills/${skillId}/status`, {
            status: userSkillStatuses.INPROGRESS,
          });
        }}
      >
        Start Learning
      </Button>
    );
  }

  if (status === userSkillStatuses.INPROGRESS) {
    return (
      <Button
        onClick={() => {
          setUserSkill({
            userId,
            skillId,
            status: userSkillStatuses.SUBMITTED,
          });
          httpclient.put(`users/${userId}/skills/${skillId}/status`, {
            status: userSkillStatuses.SUBMITTED,
          });
        }}
      >
        Request Review
      </Button>
    );
  }

  return '';
};

const renderUserSkillStatus = (userSkill) => {
  if (!userSkill) {
    return '';
  }
  const status = userSkill.status;

  if (!status) {
    return '';
  }

  if (status === userSkillStatuses.WISH) {
    return <Chip label='In Wish List' />;
  }

  if (status === userSkillStatuses.INPROGRESS) {
    return <Chip label='In Progress' />;
  }

  if (status === userSkillStatuses.SUBMITTED) {
    return <Chip label='Review Submitted' />;
  }

  if (status === userSkillStatuses.CONFIRMED) {
    return <Chip label='Gained' color='primary' />;
  }

  return '';
};

const Details = ({
  userId,
  skillId,
  details,
  recommendation,
  userSkill: defaultUserSkill,
}) => {
  const [userSkill, setUserSkill] = useState(defaultUserSkill);

  console.log('user skill', userSkill);
  console.log('skillId', skillId);
  console.log('userId', userId);

  return (
    <DetailContainer>
      <h3 className='title'>
        {getRecommendationIcon(recommendation)} {details.label}
      </h3>
      {renderUserSkillStatus(userSkill)}
      {details.skillType && (
        <div className='skill-type'>{details.skillType}</div>
      )}

      <h6>Description</h6>
      {details.description ? (
        details.description.split('\n').map((e, i) => <p key={i}>{e}</p>)
      ) : (
        <p>
          <i>(To be Defined)</i>
        </p>
      )}

      <h6>References</h6>
      {details.reference ? (
        details.reference.split('\n').map((e, i) => <p key={i}>{e}</p>)
      ) : (
        <p>
          <i>(To be Defined)</i>
        </p>
      )}

      {renderCTA(
        userId,
        skillId,
        userSkill ? userSkill.status : '',
        setUserSkill
      )}
    </DetailContainer>
  );
};

export default Details;
