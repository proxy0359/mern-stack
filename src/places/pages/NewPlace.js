import React, { useReducer, useCallback } from 'react';
import './PlaceForm.css';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Buttons';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';

import { useForm } from '../../shared/hooks/form-hook';

const NewPlace = () => {
  const [inputState, InputHandler] = useForm(
    {
      title: { value: '', isValid: false },
      description: { value: '', isValid: false },
      address: { value: '', isValid: false },
    },
    false
  );

  const placeSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={placeSubmitHandler} className="place-form">
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
      <Button type="submit" disabled={!inputState.isValid}>
        ADD A PLACE
      </Button>
    </form>
  );
};

export default NewPlace;
