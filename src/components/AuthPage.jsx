import React from 'react'
import { useRecoilValue } from 'recoil'
import Login from './Login';
import SignupCard from './SignUp';
import authScreenAtom from '../atoms/authAtom';

const AuthPage = () => {
  const authScreenState = useRecoilValue(authScreenAtom);
  // console.log(authScreenState);
  return (
    <>
      {authScreenState === 'login' ? <Login /> : <SignupCard />}
    </>
  )
}

export default AuthPage
