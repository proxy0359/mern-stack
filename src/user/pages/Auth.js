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

const Auth = () => {
  const [isLoggedInMode, setIsLoggedInMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(authContext);

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: { value: '', isValid: false },
      password: { value: '', isValid: false },
    },
    false
  );

  const navigate = useNavigate();
  const { userId } = useParams();

  const switchModeHandler = () => {
    if (!isLoggedInMode) {
      setFormData(
        { ...formState.inputs, name: undefined },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        { ...formState.inputs, name: { value: '', isValid: false } },
        false
      );
    }
    setIsLoggedInMode((prevMode) => !prevMode);
  };

  const loginSubmitHandler = async (event) => {
    event.preventDefault();
    const email = formState.inputs.email.value;
    const password = formState.inputs.password.value;
    let name;
    if (!isLoggedInMode) {
      name = formState.inputs.name.value;
    }

    try {
      setIsLoading(true);
      if (isLoggedInMode) {
        const response = await api.post('/users/login', {
          email,
          password,
        });
        console.log('loging in');

        const data = await response.json();

        setIsLoading(false);
      } else {
        setIsLoading(true);
        const response = await api.post('/users/signup', {
          email,
          password,
          name,
        });
        const data = await response.json();
        console.log(data);
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err.message);
    }
    authCtx.login();
    navigate('/u1/places');
  };

  return (
    <Card className="authentication">
      <h2>Login Required</h2>

      <hr />
      <form onSubmit={loginSubmitHandler}>
        {!isLoggedInMode || isLoading ? (
          <Input
            element="input"
            id="name"
            type="text"
            label="Username"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a name."
            onChange={inputHandler}
          />
        ) : null}
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
              onChange={inputHandler}
            />
            <Input
              id="password"
              element="input"
              type="password"
              label="Password"
              validators={[VALIDATOR_MINLENGTH(7)]}
              errorText="Please enter a valid password (min. 7 char)"
              onChange={inputHandler}
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
  );
};

export default Auth;
