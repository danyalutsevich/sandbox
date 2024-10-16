import React, { useEffect, useState } from "react";
import { UploadPhoto } from "./UploadPhoto";

interface IPhotoContainerProps {
  imagesList: string[];
  textOverlayBtn: string;
  clickOverlayBtnFn: () => void;
}

const PhotoContainer: React.FC<IPhotoContainerProps> = ({
  imagesList,
  textOverlayBtn,
  // clickOverlayBtnFn,
}) => {
  const [extendableImagesList, setExtendableImagesList] = useState(imagesList);

  const extendList = (newImage: string): void => {
    setExtendableImagesList([...extendableImagesList, newImage]);
  };

  const handleRemoveFromImageList = (index: number) => {
    const copy = [...extendableImagesList];
    copy.splice(index, 1);
    setExtendableImagesList(copy);
  };

  useEffect(() => {
    console.log(extendableImagesList);
  }, [extendableImagesList]);

  return (
    <div className="d-flex flex-column gap-5">
      {extendableImagesList.length === 0 && (
        <UploadPhoto extendList={extendList} withoutRemove />
      )}

      {extendableImagesList.length > 0 && (
        <div className="overlay">
          <div className="overlay-wrapper">
            <img
              alt="img"
              className="rounded img-fluid"
              src={extendableImagesList[0]}
              // src={toAbsoluteUrl("media/stock/600x400/img-29.jpg")}
            />
          </div>

          <div className="overlay-layer bg-dark bg-opacity-10 rounded">
            <p
              className="btn btn-sm btn-primary btn-shadow"
              onClick={() => {
                console.log(extendableImagesList[0]);
                handleRemoveFromImageList(0);
              }}
            >
              {textOverlayBtn}
            </p>
          </div>
        </div>
      )}

      {extendableImagesList.length > 0 && (
        <div className="overflow-auto pb-5">
          <div className="d-flex align-items-center rounded min-w-700px">
            {extendableImagesList
              .filter((_, i) => i > 0)
              .map((imageSrc, index) => (
                <div className="overlay me-10" key={index}>
                  <div className="overlay-wrapper">
                    <img
                      alt="img"
                      className="rounded w-200px"
                      src={imageSrc}
                      // src={toAbsoluteUrl("media/stock/600x400/img-29.jpg")}
                    />
                  </div>

                  <div className="overlay-layer bg-dark bg-opacity-10 rounded">
                    <p
                      className="btn btn-sm btn-primary btn-shadow"
                      onClick={() => {
                        handleRemoveFromImageList(index + 1);
                      }}
                    >
                      {textOverlayBtn}
                    </p>
                  </div>
                </div>
              ))}
            {extendableImagesList.length > 0 && (
              <div className="overlay me-10">
                <div className="overlay-wrapper ">
                  <UploadPhoto
                    classNameExtra="mw-200px"
                    extendList={extendList}
                    withoutRemove
                  />
                </div>
              </div>
            )}
            {/* <div className="overlay me-10">
                <div className="overlay-wrapper">
                  <img
                    alt="img"
                    className="rounded w-200px"
                    src={imageSrc}
                    // src={toAbsoluteUrl("media/stock/600x400/img-29.jpg")}
                  />
                </div>

                <div className="overlay-layer bg-dark bg-opacity-10 rounded">
                  <p
                    className="btn btn-sm btn-primary btn-shadow"
                    onClick={clickOverlayBtnFn}
                  >
                    {textOverlayBtn}
                  </p>
                </div>
              </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

export { PhotoContainer };
