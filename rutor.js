//const axios = require('axios').default;
import axios from 'axios';
const RUTOR_URL = "http://rutor.info/";
import { parse } from 'node-html-parser';


export class Rutor
{
    constructor(search)
    {
        this.search = search;
    }

    async execute()
    {
        try
        {
            console.log("here")
            const { data } = await axios.get(`${RUTOR_URL}/search/${this.search}`);
            console.log(data);
            const root = parse(data);
            let arr = root.querySelectorAll(".tum, .gai");



        } catch (error)
        {
            console.error(error);
        }
        return [{ title: "Success!", link: "url" }];
    }
}