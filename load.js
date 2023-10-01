import http from 'http';
import fs from 'fs';
//tmp
import Q from 'q';
import path from 'path';


export class LoadRutor
{
    constructor(link)
    {
        this.link = link;
    }

    /*
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

                const fileWriter = fs
                    .createWriteStream(targetFile)
                    .on('finish', () =>
                    {
                        return resolve('File Saved !');
                    });

                response.pipe(fileWriter);

            }).on('error', error =>
            {
                reject(error);
            });

        });
    }*/

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

    /*
    download()
    {
        let url = this.link, dest = "tmp/" + this.link.substring(this.link.lastIndexOf("/") + 1) + ".torrent";
        return new Promise((resolve, reject) =>
        {
            http.get(url, (res) =>
            {
                if (res.statusCode !== 200)
                {
                    var err = new Error('File couldn\'t be retrieved');
                    err.status = res.statusCode;
                    return reject(err);
                }
                var chunks = [];
                res.setEncoding('binary');
                res.on('data', (chunk) =>
                {
                    chunks += chunk;
                }).on('end', () =>
                {
                    var stream = fs.createWriteStream(dest);
                    stream.write(chunks, 'binary');
                    stream.on('finish', () =>
                    {
                        resolve('File Saved !');
                    });
                    res.pipe(stream);
                })
            }).on('error', (e) =>
            {
                console.log("Error: " + e);
                reject(e.message);
            });
        })
    }*/
    /*
    download()
    {
        let url = this.link, filepath = "tmp/" + this.link.substring(this.link.lastIndexOf("/") + 1) + ".torrent";
        var fileStream = fs.createWriteStream(filepath),
            deferred = Q.defer();

        fileStream.on('open', function ()
        {
            http.get(url, function (res)
            {
                res.on('error', function (err)
                {
                    deferred.reject(err);
                });

                res.pipe(fileStream);
            });
        }).on('error', function (err)
        {
            deferred.reject(err);
        }).on('finish', function ()
        {
            deferred.resolve(filepath);
        });

        return deferred.promise;
    }*/

}