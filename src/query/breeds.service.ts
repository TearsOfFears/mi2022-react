import axios, { AxiosResponse } from "axios";
import { instance } from "./axios.js";
interface breedIdProps {
    breedId?: any;
    limit?: any;
    order?: any;
    id?: string;
    type?: string;
}
interface breedVoteProps {
    data?: any;
}

export const breedsService = {
    async getAllCats() {
        return await instance.get("/breeds").then((res: AxiosResponse) => {
            return res.data;
        });
    },
    async getCurrentCat(id: any) {
        return await instance
            .get(`/breeds/${id}`)
            .then((res: AxiosResponse) => {
                return res.data;
            });
    },
    async getImagesForCurrentCat(id: any) {
        let query_params = {
            breed_id: id,
            limit: 5,
            has_breeds: 1
        };
        return await instance
            .get(`/images/search`, { params: query_params })
            .then((res: AxiosResponse) => {
                return res.data;
            });
    },
    async getBreedsById({ breedId, limit, order, type }: breedIdProps) {
        console.log(breedId);

        let query_params = {
            breed_id: breedId,
            limit: limit,
            order: order,
            has_breeds: type === "gif" ? 0 : 1,
            mime_types: type,
            size: "med"
        };
        return await instance
            .get(`/images/search`, { params: query_params })
            .then((res: AxiosResponse) => {
                return res.data;
            });
    },
    async getRandomImageVote() {
        return await instance
            .get(`/images/search`)
            .then((res: AxiosResponse) => {
                return res.data;
            });
    },
    async getVotes() {
        return await instance
            .get(`/votes?order=DESC`)
            .then((res: AxiosResponse) => {
                return res.data;
            });
    },
    async makeVote({ data }: breedVoteProps) {
        console.log("data", data);

        return await instance
            .post(`/votes`, data)
            .then((res: AxiosResponse) => {
                return res.data;
            });
    },
    async makeFavourite({ data }: breedVoteProps) {
        console.log("data", data);

        return await instance
            .post(`/favourites`, data)
            .then((res: AxiosResponse) => {
                return res.data;
            });
    },
    async getFavourites() {
        return await instance
            .get(`/favourites?order=DESC`)
            .then((res: AxiosResponse) => {
                return res.data;
            });
    },
    async uploadImage(file: any) {
        console.log(file);

        return await instance
            .post(`/images/upload`, file)
            .then((res: AxiosResponse) => {
                return res.data;
            });
    },
    async searchBreed(q: string | any) {
        return await instance
            .get(`/breeds/search?q=${q}`)
            .then((res: AxiosResponse) => {
                return res.data;
            });
    },
    async getImageById(id: string ) {
        return await instance
            .get(`/images/${id}`)
            .then((res: AxiosResponse) => {
                return res.data;
            });
    },
    async deleteFav(favourite_id: string) {
        return await instance.delete(`/favourites/${favourite_id}`);
    }
    // async setUserLike(params){
    //    return await axios.patch('/auth/user/setLike', params)
};
