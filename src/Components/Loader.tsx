import * as React from "react";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

export default function Loader() {
    return (
        <div
            style={{
                marginTop: "15px",
                width: "100%",
                height: "50vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <CircularProgress color="primary" size="25vh" />
        </div>
    );
}
