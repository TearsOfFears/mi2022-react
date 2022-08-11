import React, { FC, useEffect, useState, useRef, ChangeEvent } from "react";
import ButtonIcon from "../ButtonIcon/ButtonIcon";
import styles from "./Modal.module.scss";
import { Button } from "../Button/Button";
import { ReactComponent as Close } from "./../../assets/icons/Close.svg";
import { ReactComponent as PlaceImage } from "./../../assets/icons/placeImage.svg";
import { ReactComponent as Success } from "./../../assets/icons/Success.svg";
import { ReactComponent as Failed } from "./../../assets/icons/Failed.svg";
import { Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { breedsService } from "../../query/breeds.service";
interface Modal {
    modal?: boolean;
    setModal?: any;
}

interface ImageProps {
    src?: string;
    data?: object | any;
    name?: string;
}
const Popup: FC<Modal> = ({ modal, setModal }) => {
    const close = useRef<HTMLDivElement>(null);
    const refFile = useRef<HTMLInputElement>(null);
    const [dragActive, setDragActive] = useState(false);
    const [image, setImage] = useState<ImageProps>({});

    const handleOutsideClick = (e: MouseEvent) => {
        const target = e.target as HTMLDivElement;
        const el = close?.current;
        if (!el || el.contains(target)) {
            if (modal) {
                setModal(false);
            }
        }
    };
    useEffect(() => {
        document.body.addEventListener("click", handleOutsideClick);
        return () => {
            document.body.removeEventListener("click", handleOutsideClick);
        };
    }, []);
    const formData = new FormData();
    const handleDrag = function (e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };
    const handleDrop = function (e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            formData.append("file", e.dataTransfer.files[0]);
            setImage({
                src: URL.createObjectURL(e.dataTransfer.files[0]),
                name: e.dataTransfer.files[0].name,
                data: formData
            });
        }
    };
    const handleChange = function (e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            formData.append("file", e.target.files[0]);
            setImage({
                src: URL.createObjectURL(e.target.files[0]),
                name: e.target.files[0].name,
                data: formData
            });
        }
    };
    const onClickBlock = () => {
        refFile?.current?.click();
    };
    const uploadData = useMutation(
        ["upload Image"],
        breedsService.uploadImage,
        {
            onSuccess() {
                setImage({});
            }
        }
    );
    const handleUpload = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const file = image.data;
        await uploadData.mutateAsync(file);
    };
    modal
        ? (document.body.style.overflow = "hidden")
        : (document.body.style.overflow = "visible");
    return (
        <>
            <div
                style={{
                    background: "rgba(0,0,0,.6)",
                    position: "fixed",
                    zIndex: 1,
                    top: "0",
                    right: "0",
                    bottom: "0",
                    left: "0"
                }}
                ref={close}
            ></div>
            <div className={modal ? `${styles.show} ` : styles.root}>
                <ButtonIcon
                    onClick={() => {
                        setModal(false);
                        setImage({});
                        uploadData.reset();
                    }}
                    size={window.innerWidth < 760 ? 60 : 40}
                    radius={window.innerWidth < 760 ? 20 : 10}
                    mr="0 0 0 auto"
                >
                    <Close />
                </ButtonIcon>
                <div className={styles.wrapperAddImage}>
                    <Typography variant="h2">
                        Upload a .jpg or .png Cat Image
                    </Typography>
                    <Typography>
                        Any uploads must comply with the{" "}
                        <a href="">upload guidelines </a> or face deletion.
                    </Typography>
                    <div
                        className={styles.placeImage}
                        onClick={onClickBlock}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        style={{
                            background: uploadData.isError ? "#FF868E" : "white"
                        }}
                    >
                        <input
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            ref={refFile}
                            onChange={handleChange}
                        />
                        {Object.keys(image).length > 0 ? (
                            <div className={styles.imageSelected}>
                                <img src={image?.src} alt="" />
                            </div>
                        ) : (
                            [
                                <PlaceImage />,
                                <Typography variant="h5">
                                    <span>Drag here</span> your file or{" "}
                                    <span>Click here</span> to upload
                                </Typography>
                            ]
                        )}
                    </div>
                    {Object.keys(image).length > 0 ? (
                        [
                            <Typography marginTop="20px" marginBottom="20px">
                                Image File Name: {image?.name}
                            </Typography>,
                            <button
                                className={styles.specialButt}
                                onClick={(e) => handleUpload(e)}
                                type="submit"
                                disabled={uploadData.isLoading}
                            >
                                {uploadData.isLoading && (
                                    <span
                                        className={styles.loader}
                                        style={{ marginRight: "10px" }}
                                    ></span>
                                )}
                                UPLOAD PHOTO
                            </button>
                        ]
                    ) : (
                        <Typography marginTop="20px">
                            No file selected
                        </Typography>
                    )}
                    {uploadData.isSuccess && (
                        <div className={styles.stateUpload}>
                            <Typography>
                                <Success />
                                Thanks for the Upload - Cat found!
                            </Typography>
                        </div>
                    )}
                    {uploadData.isError && (
                        <div className={styles.stateUpload}>
                            <Typography>
                                <Failed />
                                No Cat found - try a different one!
                            </Typography>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Popup;
