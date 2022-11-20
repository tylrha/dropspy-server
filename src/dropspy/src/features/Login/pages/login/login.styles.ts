import styled from 'styled-components'

const LoginStyled = styled.div`

  margin: 0 auto;
  margin-top: 100px;
  width: 350px;
  height: 500px;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 5px 20px 50px #000;

  #chk {
    display: none;

    &:checked~.signup {
      transform: translateY(-500px);
    }

    &:checked~.signup label {
      transform: scale(1);
    }

    &:checked~.login label {
      transform: scale(.6);
    }

  }

  .login {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .signup {
    height: 460px;
    background: #eee;
    border-radius: 60% / 10%;
    transform: translateY(-180px);
    transition: .8s ease-in-out;

    label {
      color: #573b8a;
      transform: scale(.6);
    }

  }

  .button {
    width: 60%;
    height: 40px;
    margin: 10px auto;
    justify-content: center;
    display: block;
    color: #fff;
    background: #573b8a;
    font-size: 1em;
    font-weight: bold;
    margin-top: 20px;
    outline: none;
    border: none;
    border-radius: 5px;
    transition: .2s ease-in;
    cursor: pointer;

    &:hover {
      background: #6d44b8;
    }
  }

  label {
    color: #fff;
    font-size: 2.3em;
    justify-content: center;
    display: flex;
    margin: 60px;
    font-weight: bold;
    cursor: pointer;
    transition: .5s ease-in-out;
  }

  input {
    width: 60%;
    height: 20px;
    background: #e0dede;
    justify-content: center;
    display: flex;
    margin: 20px auto;
    padding: 10px;
    border: none;
    outline: none;
    border-radius: 5px;
  }

`

export {LoginStyled}
