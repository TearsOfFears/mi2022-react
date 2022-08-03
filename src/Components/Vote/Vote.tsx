import { Grid, Input, Paper, Typography } from "@mui/material";
import React from "react";
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
interface RandomCat {
    id?: string;
    url?: string;
}
const Vote = () => {
    const handleClick = () => {};
    const { data, isFetching } = useQuery<RandomCat[] | any>(
        ["get random cat"],
        () => breedsService.getRandomImageVote()
    );

    const makeVotes = useMutation(["make Vote"], breedsService.makeVote);
    const getVotes = useQuery(["get votes"], breedsService.getVotes);
    const handleVote = async (val: number, id?: string) => {
        const data = {
            image_id: id,
            value: val
        };
        await makeVotes.mutateAsync({ data: data });
    };
    console.log(getVotes.data);

    return (
        <SideBlockLayout>
            <>
                <Controls voting={true} />
                <Grid container className={styles.root}>
                    <Grid item xs={12} style={{ width: "100%" }}>
                        {!isFetching ? (
                            <div className={styles.wrapperVote}>
                                {data.map((obj: RandomCat, key: number) => {
                                    return (
                                        <div
                                            key={key}
                                            style={{
                                                width: "100%",
                                                display: "flex",
                                                justifyContent: "center"
                                            }}
                                        >
                                            <img src={obj?.url}></img>
                                            <div
                                                className={
                                                    styles.wrapperIconsVoting
                                                }
                                            >
                                                <button
                                                    onClick={(e) =>
                                                        handleVote(1, obj?.id)
                                                    }
                                                >
                                                    <Like />
                                                </button>
                                                <button>
                                                    <Fav />
                                                </button>
                                                <button
                                                    onClick={(e) =>
                                                        handleVote(-1, obj?.id)
                                                    }
                                                >
                                                    <Dislike />
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <h1>loading...</h1>
                        )}
                    </Grid>
                    <Grid item xs={12} marginTop="15px">
                        {!getVotes.isFetching ? (
                            getVotes.data.map((data: any, key: number) => {
                                return (
                                    <div key={key} className={styles.history}>
                                        <span className={styles.time}>
                                            {moment(data?.created_at).format(
                                                "H:MM"
                                            )}
                                        </span>
                                        <Typography variant="h5">
                                            Image ID:{" "}
                                            <span>{data?.image_id} </span>
                                            was added to{" "}
                                            {data?.value === 1 ? (
                                                <>Likes</>
                                            ) : (
                                                <>Dislike</>
                                            )}
                                        </Typography>
                                        {data?.value === 1 ? (
                                            <>
                                                <Like className={styles.likes}/>
                                            </>
                                        ) : (
                                            <>
                                                <Dislike className={styles.disLikes}/>
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
