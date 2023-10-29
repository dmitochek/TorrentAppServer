import axios from 'axios';
const RUTOR_URL = "http://rutor.info/";
import { parse } from 'node-html-parser';


export class Rutor
{
    constructor(search, category)
    {
        this.search = search;
        this.category = category;
    }

    async execute()
    {
        try
        {   
            let path;
            if (this.category == null)
                path = `${RUTOR_URL}/search/${this.search}`;
            else
                path = `${RUTOR_URL}/browse/0/${this.category}/0/2`;
            
            const { data } = await axios.get(path);
            
            const root = parse(data);
            let arr = [...root.querySelectorAll(".tum, .gai")];
            let answer = [];
            for (const tr of arr)
            {
                const childs = tr.childNodes;
                const date = childs[0].textContent;

                const name = childs[1].textContent.replace(/\n/g, '');
                let tmp = childs[1].childNodes;
                const file_link = tmp[0].rawAttributes.href.substring(2);

                const isNumeric = n => !!Number(n);
                let size = childs[3].textContent;
                if (isNumeric(size))
                {
                    size = childs[5].textContent;
                }
                const seeds = tr.lastChild;
                
                const regex = /\d+/g;
                let matches = seeds.textContent.trim().match(regex);

                const elem = {
                    date: date,
                    name: name,
                    file_link: file_link,
                    size: size,
                    error: false,
                    seeders: Number(matches[0]),
                    lichers: Number(matches[1]),
                };
                answer.push(elem);
            }

            return answer;
            //TODO check list

        } catch (error)
        {
            return [{
                date: null,
                name: error,
                file_link: null,
                size: null,
                error: true
            }];
        }
    }
}
