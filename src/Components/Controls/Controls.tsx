import React, {
    FC,
    ReactEventHandler,
    useEffect,
    useLayoutEffect,
    useMemo,
    useState
} from "react";
import ButtonIcon from "../ButtonIcon/ButtonIcon";
import NavMenu from "../NavMenu/NavMenu";
import styles from "./Controls.module.scss";
import { ReactComponent as BackArrow } from "./../../assets/icons/backArrow.svg";
import { ReactComponent as SortDesc } from "./../../assets/icons/sortAsc.svg";
import { ReactComponent as SortAsc } from "./../../assets/icons/sortDesc.svg";
import { ReactComponent as Upload } from "./../../assets/icons/Upload.svg";
import { Button } from "../Button/Button";
import { theme } from "../../theme";
import {
    useLocation,
    useNavigate,
    useParams,
    useSearchParams
} from "react-router-dom";
import { MenuItem, Modal, Select, Skeleton } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { breedsService } from "../../query/breeds.service";
import { useRefresh } from "../../hooks/useRefresh";
import Popup from "../Modal/Popup";
import { CSSTransition } from "react-transition-group";

interface ControlsProps {
    breeds?: boolean;
    gallery?: boolean;
    breedsCurrent?: boolean;
    nav?: boolean;
    voting?: boolean | any;
    likes?: boolean | any;
    favourite?: boolean | any;
    dislikes?: boolean | any;
    searchP?: boolean | any;
}

interface Breeds {
    name: string;
}

interface GetBreedProps {
    data: Breeds[];
}

const Controls: FC<ControlsProps> = ({
    voting,
    likes,
    favourite,
    dislikes,
    breeds,
    gallery,
    nav,
    breedsCurrent,
    searchP
}) => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const handleClick = () => {};

    const [breed, setBreed] = useState<string>("");
    const [limit, setLimit] = useState<number>(5);
    const [modal, setModal] = useState<boolean>(false);
    const [order, setOrder] = useState<string>("");
    const search = useLocation().search;
    const [searchParams, setSearchParams] = useSearchParams();

    const { data, isLoading } = useQuery<Breeds[] | any>(
        ["fetch breeds"],
        breedsService.getAllCats
    );

    const breedsArr =
        !isLoading &&
        data.map((obj: any) => ({ value: obj.id, nameBreed: obj.name }));

    !isLoading && breedsArr.unshift({ value: "", nameBreed: "All Breeds" });

    const handleSort = () => {
        searchParams.set("breed", breed);
        searchParams.set("limit", String(limit));
        searchParams.set("order", order);
        setSearchParams(searchParams);
    };
    useEffect(() => {
        if (breeds) handleSort();
    }, [breed, limit, order]);
    const configModal = {
        modal,
        setModal
    };

    return (
        <>
            {voting && (
                <div className={styles.rootVoting}>
                    <ButtonIcon
                        size={40}
                        radius={10}
                        bgColor={theme.palette.primary.light}
                        onClick={() => navigate("/")}
                        mr={"0 10px 0 0"}
                    >
                        <BackArrow />
                    </ButtonIcon>
                    <Button
                        fontWeight={600}
                        onClick={handleClick}
                        active={true}
                    >
                        {voting && "voting"}
                    </Button>
                </div>
            )}
            {nav && (
                <div className={styles.rootVoting}>
                    <ButtonIcon
                        size={40}
                        radius={10}
                        bgColor={theme.palette.primary.light}
                        mr={"0 10px 0 0"}
                        onClick={() => navigate("/")}
                    >
                        <BackArrow />
                    </ButtonIcon>
                    <Button
                        fontWeight={600}
                        onClick={handleClick}
                        active={true}
                    >
                        {voting && "voting"}
                        {likes && "likes"}
                        {favourite && "favourite"}
                        {dislikes && "dislikes"}
                        {searchP && "search"}
                    </Button>
                </div>
            )}
            {breedsCurrent && (
                <div className={styles.rootCurrent}>
                    <div style={{display:"inline-flex"}}>
                        <ButtonIcon
                            size={40}
                            radius={10}
                            mr={"0px 10px 0px 0px "}
                            bgColor={theme.palette.primary.light}
                            onClick={() => navigate("/breeds")}
                        >
                            <BackArrow />
                        </ButtonIcon>
                        <Button
                            fontWeight={600}
                            onClick={handleClick}
                            customStyle
                        >
                            breeds
                        </Button>
                    </div>

                    <span>{id}</span>
                </div>
            )}
            {breeds && (
                <div className={styles.rootBreeds}>
                    <div>
                        <ButtonIcon
                            size={40}
                            radius={10}
                            mr="0px 10px 0px 0px"
                            bgColor={theme.palette.primary.light}
                            onClick={() => navigate("/")}
                        >
                            <BackArrow />
                        </ButtonIcon>
                        <Button
                            fontWeight={600}
                            onClick={handleClick}
                            active={true}
                        >
                            breeds
                        </Button>
                    </div>
                    <div className={styles.selectWrapper}>
                        {!isLoading ? (
                            <select
                                value={breed}
                                className={styles.selectMenu}
                                onChange={(e) => {
                                    setBreed(e.target.value);
                                }}
                            >
                                {breedsArr.map((data: any, key: number) => [
                                    <option value={data.value} key={key}>
                                        {data.nameBreed}
                                    </option>
                                ])}
                            </select>
                        ) : (
                            <Skeleton
                                variant="rectangular"
                                height={35}
                                width={230}
                            />
                        )}
                        <div className={styles.wrapperOrder}>
                            <select
                                value={limit}
                                className={styles.selectMenu}
                                onChange={(e) =>
                                    setLimit(Number(e.target.value))
                                }
                            >
                                <option value="5" selected>
                                    Limit: 5
                                </option>
                                <option value="10">Limit: 10</option>
                                <option value="15">Limit: 15</option>
                                <option value="20">Limit: 20</option>
                            </select>
                            <div>
                                <ButtonIcon
                                    controls={true}
                                    active={
                                        searchParams.get("order") === "DESC"
                                    }
                                    onClick={() => setOrder("DESC")}
                                >
                                    <SortAsc />
                                </ButtonIcon>
                                <ButtonIcon
                                    controls={true}
                                    active={searchParams.get("order") === "ASC"}
                                    onClick={() => setOrder("ASC")}
                                >
                                    <SortDesc />
                                </ButtonIcon>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {gallery && (
                <div className={styles.rootGallery}>
                    <div
                        style={{
                            display: "inline-Flex",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}
                    >
                        {" "}
                        <ButtonIcon
                            size={40}
                            radius={10}
                            bgColor={theme.palette.primary.light}
                            mr={"0 10px 0 0"}
                            onClick={() => navigate("/")}
                        >
                            <BackArrow />
                        </ButtonIcon>
                        <Button
                            fontWeight={600}
                            onClick={handleClick}
                            active={true}
                        >
                            GALLERY
                        </Button>
                    </div>

                    <Button
                        fontWeight={600}
                        onClick={() => setModal(!modal)}
                        customStyle={true}
                        icon={<Upload />}
                    >
                        UPLOAD
                    </Button>

                    <CSSTransition
                        in={modal}
                        timeout={500}
                        classNames={{
                            enter: styles.enter,
                            enterActive: styles.enterActive,
                            exit: styles.exitActive
                        }}
                        mountOnEnter
                        unmountOnExit
                    >
                        <Popup {...configModal} />
                    </CSSTransition>
                </div>
            )}
        </>
    );
};

export default Controls;
