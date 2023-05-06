import React, { useState, useContext } from 'react';
import style from './PlaceItem.module.css';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Buttons';
import Modal from '../../shared/components/UIElements/Modal';
import Map from '../../shared/components/UIElements/Map';
import { useHttpRequest } from '../../shared/hooks/httpRequestHook';
import api from './../../api/server';
import Spinner from '../../shared/components/loading/Spinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { userContext } from '../../shared/context/user-context';

const PlaceItem = (props) => {
  const [showMap, setShowMap] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const userCtx = useContext(userContext);

  const mapHandler = () => setShowMap((show) => !show);

  const deleteModalHandler = () => setShowDeleteModal((modal) => !modal);

  const { isLoading, error, errorReset, sendRequest } = useHttpRequest();

  // DELETE PLACE HANDLER
  const deleteHandler = async () => {
    try {
      const response = await sendRequest(
        `/api/places/${props.id}`,
        api.delete,
        { headers: { Authorization: `Bearer ${userCtx.token}` } }
      );

      console.log(response);

      setIsSubmitted(true);
      setTimeout(() => {
        setShowDeleteModal((modal) => !modal);
        setIsSubmitted(false);
      }, 5000);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  return (
    <>
      {/* ERROR MODAL */}
      <ErrorModal show={error} onCancel={errorReset}>
        {error}
      </ErrorModal>

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
        header={
          isSubmitted ? (
            <p className="success-alert text-center"> Deleted Successfully!</p>
          ) : (
            'Are you sure?'
          )
        }
        footerClass={style['place-item__modal-actions']}
        footer={
          isLoading ? (
            <Spinner />
          ) : (
            <>
              <Button
                inverse
                onClick={deleteModalHandler}
                disabled={isSubmitted || isLoading}
              >
                CANCEL
              </Button>
              <Button
                danger
                onClick={deleteHandler}
                disabled={isSubmitted || isLoading}
              >
                DELETE
              </Button>
            </>
          )
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
            <img src={props.image.file} alt={props.title} />
          </div>

          <div className={style['place-item__info']}>
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>

          <div className={style['place-item__actions']}>
            {/* VIEW MAP VIA SATELITE */}
            <Button inverse onClick={mapHandler}>
              VIEW ON MAP
            </Button>
            {/* EDIT PLACE */}
            <Button to={`/places/${props.id}`}>EDIT</Button>

            {/* DELETE PLACE */}
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
