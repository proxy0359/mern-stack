import React, { useState, useContext } from 'react';
import './Auth.css';

import Card from '../../shared/components/UIElements/Card';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Buttons';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { authContext } from '../../shared/context/auth-context';

import { useNavigate, useParams } from 'react-router-dom';

import api from '../../api/server';
import Spinner from '../../shared/components/loading/Spinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { useHttpRequest } from '../../shared/hooks/httpRequestHook';
import { userContext } from '../../shared/context/user-context';
import UploadImage from '../components/UploadImage';
import { v1 } from 'uuid';

const Auth = () => {
  const [isLoggedInMode, setIsLoggedInMode] = useState(true);

  const authCtx = useContext(authContext);
  const userCtx = useContext(userContext);

  const [formState, InputHandler, setFormData] = useForm(
    {
      email: { value: '', isValid: false },
      password: { value: '', isValid: false },
    },
    false
  );

  // HTTP REQUEST HOOK
  const { isLoading, error, errorReset, sendRequest } = useHttpRequest();

  const navigate = useNavigate();

  const switchModeHandler = () => {
    if (!isLoggedInMode) {
      setFormData(
        { ...formState.inputs, name: '', image: undefined, email: '' },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: { value: '', isValid: false },
          image: { value: null, isValid: false },
          email: { value: '', isValid: false },
        },
        false
      );
    }
    setIsLoggedInMode((prevMode) => !prevMode);
  };

  const loginSubmitHandler = async (event) => {
    event.preventDefault();
    const email = formState.inputs.email.value;
    const password = formState.inputs.password.value;

    if (isLoggedInMode) {
      // LOG IN LOGIC
      try {
        const response = await sendRequest('/api/users/login', api.post, {
          password,
          email,
        });

        console.log(response);
        userCtx.getToken(response.token);

        authCtx.login();

        userCtx.setUserId(response.user);
        navigate(`/${response}/places`);
      } catch (err) {
        console.log(err.response.data.message);
      }
    } else {
      // SIGN-UP LOGIC
      const formData = new FormData();

      formData.append('email', formState.inputs.email.value);
      formData.append('password', formState.inputs.password.value);
      formData.append(
        'img',
        formState.inputs.image.value,
        `${v1()}-${formState.inputs.image.value.name}`
      );
      formData.append('name', formState.inputs.name.value);

      console.log(formData);

      try {
        const response = await sendRequest(
          '/api/users/signup',
          api.post,

          formData
        );

        userCtx.getToken(response.token);
        userCtx.setUserId(response.userId);

        authCtx.login();
        console.log(response);
        navigate('/');
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      {error && (
        <ErrorModal show={error} onCancel={errorReset}>
          <p>{error}</p>
        </ErrorModal>
      )}
      <Card className="authentication">
        <h2>Login Required</h2>

        <hr />
        <form onSubmit={loginSubmitHandler}>
          {/* NAME INPUT */}
          {!isLoading && !isLoggedInMode && (
            <>
              <UploadImage
                id="image"
                center
                onPicked={InputHandler}
                errorText="Invalid Image"
              />
              <Input
                element="input"
                id="name"
                type="text"
                label="Username"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a name."
                onChange={InputHandler}
              />
            </>
          )}

          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <Input
                id="email"
                element="input"
                type="email"
                label="E-Mail"
                validators={[VALIDATOR_EMAIL()]}
                errorText="Please enter a valid email address."
                onChange={InputHandler}
              />
              <Input
                id="password"
                element="input"
                type="password"
                label="Password"
                validators={[VALIDATOR_MINLENGTH(7)]}
                errorText=" Please enter a valid password (min. 7 char) "
                onChange={InputHandler}
              />
            </>
          )}

          <Button type="submit" disabled={!formState.isValid || isLoading}>
            {isLoggedInMode ? 'Login' : 'Sign Up'}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          Switch to {isLoggedInMode ? 'Sign Up' : 'Login'}
        </Button>
      </Card>
    </>
  );
};

export default Auth;
