import React, { useEffect, useState } from "react";
import { toAbsoluteUrl } from "../../../helpers";
// import { useFormik } from "formik";
import clsx from "clsx";

const getBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

interface IUploadPhotoProps {
  label?: string;
  classNameExtra?: string;
  withoutRemove?: boolean;
  extendList: (newImage: string) => void;
}

export const UploadPhoto: React.FC<IUploadPhotoProps> = ({
  label,
  classNameExtra,
  withoutRemove,
  extendList,
}) => {
  const [pic, setPic] = useState<File | undefined>(undefined);
  const blankImg = toAbsoluteUrl("media/svg/avatars/blank.svg");
  const [picBase64, setPicBase64] = useState<string>(blankImg);
  // const formik = useFormik({
  //   initialValues: {
  //     avatar: "",
  //   },
  //   enableReinitialize: true,
  //   onSubmit(values) {
  //     console.log(values);
  //   },
  // });

  const handleChangePhoto = async (): Promise<void> => {
    if (pic !== undefined) {
      const newPic = await getBase64(pic);
      setPicBase64(newPic);
    }
  };

  useEffect(() => {
    handleChangePhoto();
  }, [pic]);

  useEffect(() => {
    if (picBase64 !== blankImg) {
      extendList(picBase64);
    }
  }, [picBase64]);

  const handleUploadPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];
    setPic(file);
  };

  const handleRemovePhoto = (): void => {
    setPicBase64(blankImg);
  };

  // const userAvatarImg = toAbsoluteUrl(`media/${userForEdit.avatar}`)
  return (
    <div className="fv-row mb-7 min-w-200px">
      {/* begin::Label */}
      {label !== undefined && (
        <label className="d-block fw-bold fs-6 mb-5">{label}</label>
      )}
      {/* end::Label */}
      <div
        className={clsx(
          classNameExtra ?? "",
          "image-input image-input-outline w-100 p-5"
        )}
        data-kt-image-input="true"
        style={{ backgroundImage: `url('${blankImg}')` }}
      >
        {/* begin::Preview existing avatar */}
        <img className="w-100 mh-300px h-auto" src={blankImg} />
        {/* <img className="w-100 mh-300px h-auto" src={picBase64} /> */}

        {/* {picBase64 !== "" ? (
          <img
            className="image-input-wrapper w-125px h-125px"
            src={picBase64}
          />
        ) : (
          <div
            className="image-input-wrapper w-125px h-125px"
            // style={{ backgroundImage: 'url(/assets/media/avatars/300-20.jpg)"' }}
            style={{ backgroundImage: picBase64 }}
          ></div>
        )} */}
        {/* end::Preview existing avatar */}

        {/* begin::Label */}
        <label
          className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body"
          data-kt-image-input-action="change"
          data-bs-toggle="tooltip"
          title="Change avatar"
          style={{
            left: "95%",
            top: "8%",
          }}
        >
          <i className="bi bi-pencil-fill fs-7"></i>

          <input
            onChange={handleUploadPhoto}
            type="file"
            name="avatar"
            accept=".png, .jpg, .jpeg"
          />
          <input type="hidden" name="avatar_remove" />
        </label>
        {/* end::Label */}

        {/* begin::Cancel */}
        <span
          className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body "
          data-kt-image-input-action="cancel"
          data-bs-toggle="tooltip"
          title="Cancel avatar"
        >
          <i className="bi bi-x fs-2"></i>
        </span>
        {/* end::Cancel */}

        {/* begin::Remove */}
        {withoutRemove !== true && (
          <span
            className="absolute btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body "
            data-kt-image-input-action="remove"
            data-bs-toggle="tooltip"
            title="Remove avatar"
            onClick={handleRemovePhoto}
            style={{
              left: "87%",
              top: "8%",
            }}
          >
            <i className="bi bi-x fs-2"></i>
          </span>
        )}
        {/* end::Remove */}
      </div>
      {/* end::Image input */}

      {/* begin::Hint */}
      {/* <div className="form-text">Allowed file types: png, jpg, jpeg.</div> */}
      {/* end::Hint */}
    </div>

    // =============================

    // <div
    //   className="image-input image-input-circle"
    //   data-kt-image-input="true"
    //   style={{ backgroundImage: `url(${blankImg})` }}
    // >
    //   <div
    //     className="image-input-wrapper w-125px h-125px"
    //     style={{ backgroundImage: `url(/assets/media/avatars/300-20.jpg)` }}
    //   ></div>

    //   <label
    //     className="btn btn-icon btn-circle btn-color-muted btn-active-color-primary w-25px h-25px bg-body shadow"
    //     data-kt-image-input-action="change"
    //     data-bs-toggle="tooltip"
    //     data-bs-dismiss="click"
    //     title="Change avatar"
    //   >
    //     <i className="ki-duotone ki-pencil fs-6">
    //       <span className="path1"></span>
    //       <span className="path2"></span>
    //     </i>

    //     <input type="file" name="avatar" accept=".png, .jpg, .jpeg" />
    //     <input type="hidden" name="avatar_remove" />
    //   </label>

    //   <span
    //     className="btn btn-icon btn-circle btn-color-muted btn-active-color-primary w-25px h-25px bg-body shadow"
    //     data-kt-image-input-action="cancel"
    //     data-bs-toggle="tooltip"
    //     data-bs-dismiss="click"
    //     title="Cancel avatar"
    //   >
    //     <i className="ki-outline ki-cross fs-3"></i>
    //   </span>

    //   <span
    //     className="btn btn-icon btn-circle btn-color-muted btn-active-color-primary w-25px h-25px bg-body shadow"
    //     data-kt-image-input-action="remove"
    //     data-bs-toggle="tooltip"
    //     data-bs-dismiss="click"
    //     title="Remove avatar"
    //   >
    //     <i className="ki-outline ki-cross fs-3"></i>
    //   </span>
    // </div>
    // =============================

    // <div className="image-input image-input-empty" data-kt-image-input="true">
    //   <div className="image-input-wrapper w-125px h-125px"></div>

    //   <label
    //     className="btn btn-icon btn-circle btn-color-muted btn-active-color-primary w-25px h-25px bg-body shadow"
    //     data-kt-image-input-action="change"
    //     data-bs-toggle="tooltip"
    //     data-bs-dismiss="click"
    //     title="Change avatar"
    //   >
    //     <i className="ki-duotone ki-pencil fs-6">
    //       <span className="path1"></span>
    //       <span className="path2"></span>
    //     </i>

    //     <input type="file" name="avatar" accept=".png, .jpg, .jpeg" />
    //     <input type="hidden" name="avatar_remove" />
    //   </label>

    //   <span
    //     className="btn btn-icon btn-circle btn-color-muted btn-active-color-primary w-25px h-25px bg-body shadow"
    //     data-kt-image-input-action="cancel"
    //     data-bs-toggle="tooltip"
    //     data-bs-dismiss="click"
    //     title="Cancel avatar"
    //   >
    //     <i className="ki-outline ki-cross fs-3"></i>
    //   </span>

    //   <span
    //     className="btn btn-icon btn-circle btn-color-muted btn-active-color-primary w-25px h-25px bg-body shadow"
    //     data-kt-image-input-action="remove"
    //     data-bs-toggle="tooltip"
    //     data-bs-dismiss="click"
    //     title="Remove avatar"
    //   >
    //     <i className="ki-outline ki-cross fs-3"></i>
    //   </span>
    // </div>
  );
};
