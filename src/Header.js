import styled from 'styled-components';
import AppBar from '@mui/material/AppBar';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { ReactComponent as CodeLinkLogo } from './icons/CodeLink.svg';
import { Container } from './Common';

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

const DropDownMenu = ({ label, items }) => {
  return (
    <DropDownMenuContainer>
      <button className='dropbtn'>
        {label}
        <KeyboardArrowDownIcon />
      </button>
      <div className='dropdown-content'>
        {items.map((e, i) => (
          <a key={i} href='#'>
            {e}
          </a>
        ))}
      </div>
    </DropDownMenuContainer>
  );
};

const AppBarContainer = styled.div`
  height: 50px;
`;

const Header = () => {
  return (
    <>
      <AppBarContainer>
        <AppBar color='transparent'>
          <Container>
            <CustomToolBar>
              <CodeLinkLogo />
              <HSpace />
              <DropDownMenu
                label='Front End'
                items={['Junior', 'Mid', 'Senior']}
              />
              <DropDownMenu
                label='Back End'
                items={['Junior', 'Mid', 'Senior']}
              />
              <DropDownMenu
                label='Fullstack'
                items={['Junior', 'Mid', 'Senior']}
              />
              <DropDownMenu
                label='DevOps'
                items={['Junior', 'Mid', 'Senior']}
              />
              <DropDownMenu label='QC' items={['Junior', 'Mid', 'Senior']} />
            </CustomToolBar>
          </Container>
        </AppBar>
      </AppBarContainer>
    </>
  );
};

export default Header;
