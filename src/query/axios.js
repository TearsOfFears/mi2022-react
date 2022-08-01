import axios from "axios";
export const instance = axios.create({
    baseURL: 'https://api.thecatapi.com/v1'
});
instance.defaults.headers.common['x-api-key'] = "6cc4158d-dfc9-4644-8c51-c3a77eba9df3"