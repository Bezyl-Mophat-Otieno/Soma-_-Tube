import React from 'react'
import styled from 'styled-components'
import somaLinkLogo from '../images/1.png'

const Container = styled.div`
flex:1;
background-color:${({theme})=>theme.bg};
color:${({theme})=>theme.textColor};
height:100vh;
width: 40px;
font-size: 14px;
`;

const Wraper= styled.div`
padding:18px 20px;
`;
const Logo = styled.div`
display: flex;
align-items: center;
gap: 5px;
font-weight: bold;
margin-bottom: 25px;
`;
const Img = styled.img`
height: 25px;
`;
const Item = styled.div`
display: flex;
align-items: center;
gap: 20px;
cursor: pointer;
padding: 7.5px 0;
`;

const Hr = styled.hr`
margin: 15px 0;
border: 0.5px solid;
`;

const Login = styled.div`



`;
const Button = styled.button`
padding: 5PX 15PX;
background-color: transparent;
border : 1px solid #1077ec;
color : #1077ec;
border-radius: 4px;
font-weight: 500;
margin-top: 10px;
cursor: pointer;


`;
function Menu({darkMode , setDarkMode}) {

  const handleThemes = ()=>{
    setDarkMode(!darkMode);
  }
  return (
    <Container>
        <Wraper>
        <Logo>
        <Img src={somaLinkLogo}/>SomaTube
        </Logo>
        <Item> Home </Item>
        <Item> Home </Item>
        <Item> Home </Item>
        <Login>
        Sign in to view videos , Like , Share and Comment
          <Button onClick={handleThemes}>SIGN IN</Button>
        </Login>
        <Item> Home </Item>
        </Wraper>
    </Container>
  )
}

export default Menu