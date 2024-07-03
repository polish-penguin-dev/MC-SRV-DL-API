/*
    MC-SRV-DL-API V2

    Code Credit License - LICENSE.md
    Alex Wegrzyn
*/
import paper from "./sources/paper.js";
import purpur from "./sources/purpur.js";
import vanilla from "./sources/vanilla.js";
import folia from "./sources/folia.js";
import velocity from "./sources/velocity.js";
import sponge from "./sources/sponge.js";

import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

const sources = ["vanilla", "paper", "purpur", "folia", "velocity", "sponge"];

app.get("/", (req, res) => {
    res.redirect(301, "https://polish-penguin-dev.github.io/MC-SRV-DL-API/");
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
        case "folia":
            folia(version, build, res);
            break;
        case "velocity":
            velocity(version, build, res);
        case "sponge":
            sponge(version, build, res);
    }
});

app.use((req, res) => {
    res.status(404).json({ error: true, msg: "Page Not Found! For Download Endpoint, Did You Specify Required Parameters (Software, Version)?" })
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});