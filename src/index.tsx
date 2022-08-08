import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false
        }
    }
});
const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <App />
                </ThemeProvider>
            </QueryClientProvider>
        </BrowserRouter>
    </>
);
