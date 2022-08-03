import axios, { AxiosResponse } from "axios";
import { instance } from "./axios.js";
interface breedIdProps {
    breedId?: any;
    limit?: any;
    order?: any;
    id?: string;
}
interface breedVoteProps{
   data?:any;
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
    async getBreedsById({ breedId, limit, order }: breedIdProps) {
        let query_params = {
            breed_id: breedId,
            limit: limit,
            order: order,
            has_breeds: 1
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
            .get(`/votes?limit=4&order=DESC`)
            .then((res: AxiosResponse) => {
                return res.data;
            });
    },
    async makeVote({data}: breedVoteProps) {
        console.log("data",data);
        
        return await instance
            .post(`/votes`, data)
            .then((res: AxiosResponse) => {
                return res.data;
            });
    }

    //
    // async deleteComment(id){
    //     return await axios.get(`/commentDelete/${id}`)
    // },
    // async setUserLike(params){
    //    return await axios.patch('/auth/user/setLike', params)
};
