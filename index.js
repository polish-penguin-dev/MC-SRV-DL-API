/*
    MC-SRV-DL-API V2

    Code Credit License - LICENSE.md
    Alex Wegrzyn
*/
const paper = require("./sources/paper.js");
const purpur = require("./sources/purpur.js");
const vanilla = require("./sources/vanilla.js");

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const sources = ["vanilla", "paper", "purpur"];

app.get("/", (req, res) => {
    res.redirect(301, "https://github.com/polish-penguin-dev/MC-SRV-DL-API");
});

app.get("/download/:software/:version/:build?", (req, res) => {
    const { software, version, build } = req.params;

    if(!sources.includes(software)) return res.status(400).json({ error: true, msg: "Invalid Software Type!" });
    if(!build && software !== "vanilla") return res.status(400).json({ error: true, msg: "Include Build!" });

    switch(software) {
        case "vanilla":
            vanilla(version, res);
            break;
        case "paper":
            paper(version, build, res);
            break;
        case "purpur":
            purpur(version, build, res);
            break;
    }
});

app.use((req, res) => {
    res.status(404).json({ error: true, msg: "Page Not Found! For Download Endpoint, Did You Specify Required Parameters (Software, Version)?" })
});

const port = 3000;
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

module.exports = app;