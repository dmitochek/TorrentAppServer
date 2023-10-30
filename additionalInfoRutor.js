import axios from 'axios';
const RUTOR_URL = "http://rutor.info/torrent/";
import { parse } from 'node-html-parser';
//import * as htmlparser2 from "htmlparser2";

export class AdditionalInfoRutor
{
    constructor(link)
    {
        this.link = link;
    }

    async execute()
    {
        try
        {
            const torrentlink = RUTOR_URL + this.link.slice(this.link.lastIndexOf("/") + 1);
            let { data } = await axios.get(torrentlink);

            let firstOcc = data.indexOf('<table id="details">');
            data = data.slice(firstOcc);
            let lastOcc = data.indexOf('</table>');
            data = data.slice(0, lastOcc + 8);

            let root = parse(data);
            let info = root.getElementById("details");
            //let res = info.textContent;
            let res = root.toString();

            let imgs = [...info.getElementsByTagName("img")]
                .filter(e => !e.getAttribute('src').includes("cdnbunny.org"))
                .map(img => img.getAttribute('src'));


            return { data: res, imgs: imgs };

        } catch (error)
        {
            return { data: error, imgs: null };
        }
    }
}
