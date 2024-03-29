import React from 'react';
import Card from '../../shared/components/UIElements/Card';

import PlaceItem from './PlaceItem';

import style from './PlaceList.module.css';

import Button from '../../shared/components/FormElements/Buttons';

const PlaceList = (props) => {
  if (props.items.length === 0 || !props.items) {
    return (
      <div className={`${style['place-list']} center`}>
        <Card>
          <h2>No places found. Maybe create one?</h2>
          <Button to="/places/new">Share Place</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className={style['place-list']}>
      {props.items.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.img}
          title={place.title}
          description={place.description}
          address={place.address}
          creatorId={place.creator}
          coordinates={place.location}
        />
      ))}
    </ul>
  );
};

export default PlaceList;
