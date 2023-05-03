import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { async } from "@firebase/util";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../modules.js";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: 50px;
`;

const Link = styled.span`
  margin-left: 30px;
`;

const SignIn = () => {
  const [userName , setUserName] = useState("")
  const [email , setUserEmail] = useState("")
  const [password , setPassword] = useState("")
// dispatch the various actions
  const dispatch = useDispatch()

  // handle login
  const handleSignIn = async(e)=>{
    e.preventDefault()
    dispatch(loginStart())
    try {
      const res = await axios.post(`${serverUrl}auth/signIn`,{email,password})
     dispatch(loginSuccess(res.data))

      // handle the login success...
      
    } catch (error) {
      // handle the error in the frontend...
      console.log(error)
      dispatch(loginFailure())
    }

  }


  const signInWithGoogle = async () => {
    dispatch(loginStart());
    signInWithPopup(auth, provider)
      .then((result) => {
        axios
          .post(`${serverUrl}auth/google`, {
            name: result.user.displayName,
            email: result.user.email,
            img: result.user.photoURL,
          })
          .then((res) => {
            console.log(res)
            dispatch(loginSuccess(res.data));
          });
      })
      .catch((error) => {
        dispatch(loginFailure());
      });
  };

  const handleSignUp = async()=>{
    dispatch(loginStart())
    
    try {
    console.log("Into sign up")
     const res = await axios.post(`${serverUrl}auth/signUp`,{
        name:userName,
        email,password
      })
      dispatch(loginSuccess(res.data))
      //handle successfull registration...
      
    } catch (error) {
      dispatch(loginFailure())
      //handle an error in registration..
      
    }


  }
  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <SubTitle>to continue to LamaTube</SubTitle>
        <Input name="email" type="email" placeholder="Email" onChange={(e)=>setUserEmail(e.target.value)} />
        <Input name="password" type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)} />
        <Button onClick={handleSignIn}>Sign in</Button>
        <Title>or</Title>
        <Button onClick={signInWithGoogle}>Signin with Google</Button>
        <Title>or</Title>
        <Input name="username" placeholder="Username" onChange={(e)=>setUserName(e.target.value)}/>
        <Input name="email" placeholder="Email" onChange={(e)=>setUserEmail(e.target.value)} />
        <Input name="password" type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)} />
        <Button onClick={handleSignUp} >Sign up</Button>
      </Wrapper>
      <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  );
};

export default SignIn;
