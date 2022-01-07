import styled from 'styled-components';
import AppBar from '@mui/material/AppBar';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { ReactComponent as CodeLinkLogo } from './icons/CodeLink.svg';
import { Container } from './Common';
import { routeGroups } from './route';

const CustomToolBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const HSpace = styled.div`
  width: 20px;
`;

const DropDownMenuContainer = styled.div`
  position: relative;
  display: inline-block;
  margin-left: 20px;

  .dropbtn {
    padding: 20px;
    padding-left: 0;
    padding-right: 0;
    box-sizing: border-box;
    border: 2px solid transparent;
    cursor: default;
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #344563;
    background: transparent;
    font-size: 16px;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #fffffe;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;

    a {
      color: black;
      padding: 12px 16px;
      text-decoration: none;
      display: block;

      &:hover {
        background: #a1c0ff;
      }
    }
  }

  &:hover {
    .dropdown-content {
      display: block;
    }

    .dropbtn {
      border-bottom-color: #0052cc;
    }
  }
`;

const DropDownMenu = ({ label, routes }) => {
  return (
    <DropDownMenuContainer>
      <button className='dropbtn'>
        {label}
        <KeyboardArrowDownIcon />
      </button>
      <div className='dropdown-content'>
        {routes.map(({ url, subCategory }, i) => (
          <a key={i} href={url}>
            {subCategory}
          </a>
        ))}
      </div>
    </DropDownMenuContainer>
  );
};

const AppBarContainer = styled.div`
  height: 50px;
`;

const FullSpace = styled.div`
  flex: 1;
`;

const FeedbackButton = styled.a`
  color: #344563;
  text-decoration: none;
  border: 1px solid silver;
  padding: 5px 10px;
  border-radius: 5px;

  &:hover {
    background: #a1c0ff;
  }
`;

const Header = () => {
  return (
    <>
      <AppBarContainer>
        <AppBar color='transparent'>
          <Container>
            <CustomToolBar>
              <a href='/'>
                <CodeLinkLogo />
              </a>
              <HSpace />
              {Object.keys(routeGroups).map((category, i) => (
                <DropDownMenu
                  key={i}
                  label={category}
                  routes={routeGroups[category]}
                />
              ))}
              <FullSpace />
              <FeedbackButton
                href='https://forms.gle/9p8cScKvm2nughDC9'
                target='_blank'
              >
                Feedback
              </FeedbackButton>
            </CustomToolBar>
          </Container>
        </AppBar>
      </AppBarContainer>
    </>
  );
};

export default Header;
