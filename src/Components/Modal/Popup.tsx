import React, { FC, useEffect, useState, useRef, ChangeEvent } from "react";
import ButtonIcon from "../ButtonIcon/ButtonIcon";
import styles from "./Modal.module.scss";
import { Button } from "../Button/Button";
import { ReactComponent as Close } from "./../../assets/icons/Close.svg";
import { ReactComponent as PlaceImage } from "./../../assets/icons/placeImage.svg";
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
}
const Popup: FC<Modal> = ({ modal, setModal }) => {
    const close = useRef<HTMLDivElement>(null);
    const refFile = useRef<HTMLInputElement>(null);
    const [dragActive, setDragActive] = useState(false);
    const [image, setImage] = useState<ImageProps>({});
    // const handleOutsideClick = (e: MouseEvent) => {
    //     window.onclick = (event: MouseEvent) => {
    //         const target = event.target as HTMLBodyElement;
    //         if (!target?.contains(close.current)) {
    //             setModal(!modal)
    //         }
    //     };
    // };
    // useEffect(() => {
    //     document.body.addEventListener('click',handleOutsideClick);
    // }, [])

    function handleFile(files: any) {
        if (files.length !== 0) {
            setImage({ src: URL.createObjectURL(files[0]), data: files[0] });
        }
    }
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
            handleFile(e.dataTransfer.files);
        }
    };
    const handleChange = function (e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files);
        }
    };
    const onClickBlock = () => {
        refFile?.current?.click();
    };
    const uploadData = useMutation(
        ["uplaod Image"],
        breedsService.uploadImage,
        {
            onSuccess() {
                setImage({});
            }
        }
    );
    const handleUplaod = async () => {
        console.log(image.data);

        await uploadData.mutateAsync({ file: image.data });
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
                    left: "0",
                    opacity: !modal ? "0" : "1",
                    transition: "all .5s",
                    visibility: !modal ? "hidden" : "visible"
                }}
            ></div>
            <div
                ref={close}
                className={modal ? `${styles.show} ` : styles.root}
            >
                <ButtonIcon
                    onClick={() => setModal(false)}
                    size={40}
                    radius={10}
                    mr="0 0 0 auto"
                >
                    <Close />
                </ButtonIcon>
                <div className={styles.wrapperAddImage}>
                    <Typography variant="h2">
                        Upload a .jpg or .png Cat Image
                    </Typography>
                    <Typography>
                        Any uploads must comply with the upload guidelines or
                        face deletion.
                    </Typography>
                    <div
                        className={styles.placeImage}
                        onClick={onClickBlock}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        <input
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            ref={refFile}
                            onChange={(e) => handleChange(e)}
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
                                Image File Name: {image?.data?.name}
                            </Typography>,
                            <Button onClick={handleUplaod} customStyle={true}>
                                UPLOAD PHOTO
                            </Button>
                        ]
                    ) : (
                        <Typography marginTop="20px">
                            No file selected
                        </Typography>
                    )}
                </div>
            </div>
        </>
    );
};

export default Popup;
