import React, { useReducer, useCallback, useContext, useState } from 'react';
import './PlaceForm.css';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Buttons';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';

import { useForm } from '../../shared/hooks/form-hook';

import { useHttpRequest } from '../../shared/hooks/httpRequestHook';
import Spinner from '../../shared/components/loading/Spinner';

import ErrorModal from '../../shared/components/UIElements/ErrorModal';

import api from '../../api/server';
import { userContext } from '../../shared/context/user-context';

const NewPlace = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [inputState, InputHandler] = useForm(
    {
      title: { value: '', isValid: false },
      description: { value: '', isValid: false },
      address: { value: '', isValid: false },
    },
    false
  );

  const userCtx = useContext(userContext);

  const { error, errorReset, sendRequest, isLoading } = useHttpRequest();

  const placeSubmitHandler = async (event) => {
    event.preventDefault();

    const title = inputState.inputs.title.value;
    const description = inputState.inputs.description.value;
    const address = inputState.inputs.address.value;

    try {
      const response = await sendRequest('/api/places', api.post, {
        title,
        description,
        address,
        creator: userCtx.id,
      });

      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <ErrorModal show={error} onCancel={errorReset}>
        {error}
      </ErrorModal>
      <form onSubmit={placeSubmitHandler} className="place-form">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            {isSubmitted && !isLoading ? (
              <p className=" success-alert text-center">
                Created place successful!
              </p>
            ) : null}
            <Input
              id="title"
              type="text"
              label="Title"
              element="input"
              validators={[VALIDATOR_REQUIRE()]}
              onChange={InputHandler}
              errorText={'Please Enter a valid title'}
            />
            <Input
              id="description"
              type="text"
              label="Description"
              element="textarea"
              validators={[VALIDATOR_MINLENGTH(5)]}
              onChange={InputHandler}
              errorText={'Please Enter a valid description'}
            />
            <Input
              id="address"
              type="text"
              label="Address"
              element="input"
              validators={[VALIDATOR_REQUIRE()]}
              onChange={InputHandler}
              errorText={'Please Enter a valid address'}
            />
          </>
        )}
        <Button type="submit" disabled={!inputState.isValid && isLoading}>
          ADD A PLACE
        </Button>
      </form>
    </>
  );
};

export default NewPlace;
