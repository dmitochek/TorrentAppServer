import express from 'express';
const app = express();
const PORT = 3000;

const path = "../TorrentAppServer/"
export function InitDownloadingServer()
{
    app.get("/download/:filename", (req, res) =>
    {
        const filePath = path + "/tmp/" + req.params.filename;
        res.download(
            filePath,
            (err) =>
            {
                if (err)
                {
                    res.send({
                        error: err,
                        msg: "Problem downloading the file"
                    });
                }
            });
    });
    app.listen(PORT, () => console.log("Server listening to port " + PORT));
}
