import { Grid, Input, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { SideBlockLayout } from "../../Layouts/SideBlockLayout";
import ButtonIcon from "../ButtonIcon/ButtonIcon";
import NavMenu from "../NavMenu/NavMenu";
import styles from "./Vote.module.scss";
import { ReactComponent as BackArrow } from "./../../assets/icons/backArrow.svg";
import { Button } from "../Button/Button";
import { theme } from "../../theme";
import Controls from "../Controls/Controls";
import { useMutation, useQuery } from "@tanstack/react-query";
import { breedsService } from "../../query/breeds.service";
import { ReactComponent as Fav } from "./../../assets/icons/fav.svg";
import { ReactComponent as Like } from "./../../assets/icons/like.svg";
import { ReactComponent as Dislike } from "./../../assets/icons/dislike.svg";
import moment from "moment";
import cx from "classnames";
interface RandomCat {
    id?: string;
    url?: string;
}
const Vote = () => {
    const [imageLoaded, setImageLoaded] = useState<boolean>(false);

    const {
        data,
        isFetching,
        refetch: getRandom
    } = useQuery<RandomCat[] | any>(
        ["get random cat"],
        () => breedsService.getRandomImageVote(),
        {
            onSuccess() {
                setImageLoaded(false);
            }
        }
    );

    const getVotes = useQuery(["get votes"], breedsService.getVotes);
    const getFav = useQuery(["get Fav"], breedsService.getFavourites);
    const makeFav = useMutation(["make Fav"], breedsService.makeFavourite, {
        onSuccess() {
            getVotes.refetch();
            getFav.refetch();
            setImageLoaded(false);
            getRandom();
        }
    });
    const makeVotes = useMutation(["make Vote"], breedsService.makeVote, {
        onSuccess() {
            getVotes.refetch();
            getRandom();
        }
    });
    const handleVote = async (val: number, id?: string) => {
        const data = {
            image_id: id,
            value: val
        };
        await makeVotes.mutateAsync({ data: data });
    };

    const handleFav = async (id?: string) => {
        const data = {
            image_id: id
        };
        await makeFav.mutateAsync({ data: data });
    };
    console.log(imageLoaded);

    return (
        <SideBlockLayout>
            <>
                <Controls voting={true} />
                <Grid container className={styles.root}>
                    <Grid item xs={12} style={{ width: "100%" }}>
                        {!isFetching ? (
                            <div className={styles.wrapperVote}>
                                <div
                                    key={data[0].id}
                                    style={{
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "center"
                                    }}
                                >
                                    <img
                                        src={data[0]?.url}
                                        alt={data[0]?.url}
                                        className={cx(styles.smooth, {
                                            [styles.loaded]: imageLoaded,
                                            [styles.none]: !imageLoaded
                                        })}
                                        onLoad={() => setImageLoaded(true)}
                                    />
                                    <div className={styles.wrapperIconsVoting}>
                                        <button
                                            onClick={(e) =>
                                                handleVote(1, data[0]?.id)
                                            }
                                        >
                                            <Like />
                                        </button>
                                        <button
                                            onClick={(e) =>
                                                handleFav(data[0]?.id)
                                            }
                                        >
                                            <Fav />
                                        </button>
                                        <button
                                            onClick={(e) =>
                                                handleVote(-1, data[0]?.id)
                                            }
                                        >
                                            <Dislike />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <h1>loading...</h1>
                        )}
                    </Grid>
                    <Grid item xs={12} marginTop="15px"  style={{ width: "100%" }}>
                        {!getVotes.isLoading && !getFav.isLoading ? (
                            getVotes.data
                                .concat(getFav.data)
                                .sort(
                                    (a: any, b: any) =>
                                        Date.parse(b?.created_at) -
                                        Date.parse(a?.created_at)
                                )
                                .slice(0, 4)
                                .map((data: any, key: number) => {
                                    return (
                                        <div
                                            key={key}
                                            className={styles.history}
                                        >
                                            {window.innerWidth < 768 && (
                                                <div className={styles.mobileWrapper}>
                                                    <span
                                                        className={styles.time}
                                                    >
                                                        {moment(
                                                            data?.created_at
                                                        ).format("HH:mm")}
                                                    </span>

                                                    {data?.value === 1 && (
                                                        <>
                                                            <Like
                                                                className={
                                                                    styles.likes
                                                                }
                                                            />
                                                        </>
                                                    )}
                                                    {data?.value === -1 && (
                                                        <>
                                                            <Dislike
                                                                className={
                                                                    styles.disLikes
                                                                }
                                                            />
                                                        </>
                                                    )}
                                                    {typeof data.value ===
                                                        "undefined" && <Fav />}
                                                </div>
                                            )}
                                            <Typography variant="h5">
                                                Image ID:{" "}
                                                <span>{data?.image_id} </span>
                                                was added to{" "}
                                                {data?.value === 1 && (
                                                    <>Likes</>
                                                )}
                                                {data?.value === -1 && (
                                                    <>Dislike</>
                                                )}
                                                {typeof data.value ===
                                                    "undefined" && (
                                                    <>Favourites</>
                                                )}
                                            </Typography>
                                            {window.innerWidth > 768 && (
                                                <>
                                                    {data?.value === 1 && (
                                                        <>
                                                            <Like
                                                                className={
                                                                    styles.likes
                                                                }
                                                            />
                                                        </>
                                                    )}
                                                    {data?.value === -1 && (
                                                        <>
                                                            <Dislike
                                                                className={
                                                                    styles.disLikes
                                                                }
                                                            />
                                                        </>
                                                    )}
                                                    {typeof data.value ===
                                                        "undefined" && <Fav />}
                                                </>
                                            )}
                                        </div>
                                    );
                                })
                        ) : (
                            <h1>loading...</h1>
                        )}
                    </Grid>
                </Grid>
            </>
        </SideBlockLayout>
    );
};

export default Vote;
