import React from 'react'
import styled from 'styled-components'
import Input from './Input'

export default function Login() {
  return (
    <Container>
      <Wrapper>
        <Input/>
      </Wrapper>
    </Container>
  )
}

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
`
const Wrapper = styled.div`
    backdrop-filter: blur(35px);
    background-color: rgba(255, 255, 255, 0.8);
    height: 270px;
    width: 300px;
    border-radius: 20px;
`
