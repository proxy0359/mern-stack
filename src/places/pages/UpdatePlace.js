import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

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
import { getPlace } from '../../api/getPlace';

import './PlaceForm.css';

let runSetFormData = false;

const UpdatePlace = () => {
  const [place, setPlace] = useState({});
  console.log(place);

  const placeId = useParams().placeId;

  console.log(placeId);

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: { value: '', isValid: false },
      description: { value: '', isValid: false },
    },
    false
  );

  const { isLoading, error, errorReset, sendRequest } = useHttpRequest();

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await getPlace(placeId);

        console.log(response);
        console.log('get placece');
        setPlace(response);
        runSetFormData = true;
      } catch (err) {
        console.log(err);
      }
    };
    if (runSetFormData) {
      setFormData(
        {
          title: { value: place.title, isValid: true },
          description: { value: place.description, isValid: true },
        },
        true
      );

      console.log('formdata');
    }
    sendRequest();
  }, [runSetFormData, setPlace, setFormData]);

  if (!place) {
    return (
      <div className="center">
        <h2>Place not found</h2>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="center">
        <Spinner />
      </div>
    );
  }

  const updatePlaceHandler = async (event) => {
    event.preventDefault();

    const title = formState.inputs.title.value;
    const description = formState.inputs.description.value;

    try {
      const response = await sendRequest(`/api/places/${placeId}`, api.post, {
        title,
        description,
      });
    } catch (err) {}
  };

  return (
    <form onSubmit={updatePlaceHandler} className="place-form">
      {place.description || place.title ? (
        <>
          <Input
            id="title"
            element="input"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText={'Please enter a valid title'}
            onChange={inputHandler}
            initialValue={place.title}
            valid={formState.inputs.title.isValid}
          />

          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText={'Please Enter a valid description'}
            onChange={inputHandler}
            initialValue={place.description}
            valid={formState.inputs.description.isValid}
          />
        </>
      ) : (
        <Spinner />
      )}

      <Button type={'submit'} disabled={!formState.isValid}>
        Update place
      </Button>
    </form>
  );
};

export default UpdatePlace;
