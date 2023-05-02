import React, { useEffect, useRef, useState } from 'react';
import Button from '../../shared/components/FormElements/Buttons';

const UploadImage = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);
  const selectFileRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setPreviewUrl(fileReader.result);
      console.log(fileReader);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  console.log(previewUrl);

  const filePickedHandler = (e) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (e.target.files && e.target.files.length === 1) {
      pickedFile = e.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
      console.log(e.target.files[0]);
      console.log(previewUrl);
    } else {
      fileIsValid = false;
      setIsValid(false);
    }

    props.onPicked(props.id, pickedFile, fileIsValid);
  };

  const clickHandler = (e) => {
    selectFileRef.current.click();
  };

  return (
    <div className="form-control">
      <input
        id={props.id}
        type="file"
        accept=".jpeg,.png,jpg"
        style={{ display: 'none' }}
        ref={selectFileRef}
        onChange={filePickedHandler}
      />

      <div className={`image-upload ${props.center ? 'center' : ''}`}>
        <div className="image-upload__preview">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="preview of profile picture"
              style={{ height: '200px', width: '90%' }}
            />
          ) : (
            <p> Please pick a image</p>
          )}
        </div>
      </div>
      {!isValid ? <p>{props.errorText}</p> : null}

      <Button type="button" onClick={clickHandler}>
        Select File
      </Button>
    </div>
  );
};

export default UploadImage;
