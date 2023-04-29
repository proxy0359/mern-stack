import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Buttons';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';

import { useForm } from '../../shared/hooks/form-hook';

import './PlaceForm.css';

const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    imageUrl: 'https://picsum.photos/500/300?random=1',
    address: '20 W 34th St., New York, NY 10001',
    location: { lat: 40.7473414, lng: -74.0028329 },
    creator: 'u1',
  },
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    imageUrl: 'https://picsum.photos/500/300?random=1',
    address: '20 W 34th St., New York, NY 10001',
    location: { lat: 40.7473414, lng: -74.0028329 },
    creator: 'u2',
  },
];

const UpdatePlace = () => {
  const [isLoading, setIsLoading] = useState(true);

  const placeId = useParams().placeId;

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: { value: '', isValid: false },
      description: { value: '', isValid: false },
    },
    false
  );

  const identifiedPlace = DUMMY_PLACES.find((p) => p.id === placeId);
  useEffect(() => {
    setFormData(
      {
        title: { value: identifiedPlace.title, isValid: true },
        description: { value: identifiedPlace.description, isValid: true },
      },
      true
    );
    setIsLoading(false);
  }, [setFormData, identifiedPlace, setIsLoading]);

  console.log(formState);

  if (!identifiedPlace) {
    return (
      <div className="center">
        <h2>Place not found</h2>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="center">
        <h2>Luding</h2>
      </div>
    );
  }

  console.log(formState.inputs.description.isValid);

  console.log(formState.inputs.description.isValid);

  const updatePlaceHandler = (event) => {
    event.preventDefault();

    console.log(formState.inputs.description.isValid);
  };

  return (
    <form onSubmit={updatePlaceHandler} className="place-form">
      <Input
        id="title"
        element="input"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText={'Please enter a valid title'}
        onChange={inputHandler}
        initialValue={formState.inputs.title.value}
        valid={formState.inputs.title.isValid}
      />

      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText={'Please Enter a valid description'}
        onChange={inputHandler}
        initialValue={formState.inputs.description.value}
        valid={formState.inputs.description.isValid}
      />

      <Button type={'submit'} disabled={!formState.isValid}>
        Update place
      </Button>
    </form>
  );
};

export default UpdatePlace;
