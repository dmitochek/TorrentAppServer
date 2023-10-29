import http from 'http';
import fs from 'fs';

export class LoadRutor
{
    constructor(link)
    {
        this.link = link;
    }

    load()
    {
        let targetFile = "tmp/" + this.link.substring(this.link.lastIndexOf("/") + 1) + ".torrent";

        return new Promise((resolve, reject) =>
        {
            http.get(this.link, response =>
            {
                const code = response.statusCode ?? 0;
                if (code >= 400)
                {
                    return reject(new Error(response.statusMessage));
                }

                if (code > 300 && code < 400 && !!response.headers.location)
                {
                    return resolve(
                        downloadFile(response.headers.location, targetFile)
                    );
                }

                const fileWriter = fs.createWriteStream(targetFile);
                response.pipe(fileWriter);

                fileWriter.on('close', () =>
                {
                    return resolve('File Saved !');
                });

            }).on('error', error =>
            {
                reject(error);
            });

        });
    }

}