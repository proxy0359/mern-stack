import React, { useState } from 'react';
import style from './PlaceItem.module.css';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Buttons';
import Modal from '../../shared/components/UIElements/Modal';
import Map from '../../shared/components/UIElements/Map';

const PlaceItem = (props) => {
  const [showMap, setShowMap] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const mapHandler = () => setShowMap((show) => !show);

  const deleteModalHandler = () => setShowDeleteModal((modal) => !modal);

  const deleteHandler = () => {
    setShowDeleteModal((modal) => !modal);
  };

  return (
    <>
      {/* MAP MODAL */}
      <Modal
        show={showMap}
        onCancel={mapHandler}
        header={props.address}
        contentClass={style['place-item__modal-content']}
        footerClass={style['place-item__modal-actions']}
        footer={<Button onClick={mapHandler}>Close</Button>}
      >
        <div className={style['map-container']}>
          <Map center={props.coordinates} zoom={16} />
        </div>
      </Modal>

      {/* DELETE MODAL */}
      <Modal
        show={showDeleteModal}
        header="Are you sure?"
        footerClass={style['place-item__modal-actions']}
        footer={
          <>
            <Button inverse onClick={deleteModalHandler}>
              CANCEL
            </Button>
            <Button danger onClick={deleteHandler}>
              DELETE
            </Button>
          </>
        }
      >
        <p>
          Do you want to proceed and delete this place? Please note that it
          can't be undone thereafter
        </p>
      </Modal>

      <li className={style['place-item']}>
        <Card className={style['place-item__content']}>
          <div className={style['place-item__image']}>
            <img src={props.image} alt={props.title} />
          </div>

          <div className={style['place-item__info']}>
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>

          <div className={style['place-item__actions']}>
            <Button inverse onClick={mapHandler}>
              VIEW ON MAP
            </Button>
            <Button to={`/places/${props.id}`}>EDIT</Button>
            <Button danger onClick={deleteModalHandler}>
              DELETE
            </Button>
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;
