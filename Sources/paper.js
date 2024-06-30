import fetch from "node-fetch";

export default async function paper(version, build, res) {
    const paper = await (await fetch("https://api.papermc.io/v2/projects/paper")).json();
    if(!paper.versions.includes(version) && version !== "latest") return res.status(400).json({ error: true, msg: "Invalid Version Number!" });

    if(version === "latest") {
        version = paper.versions[paper.versions.length - 1];
    }

    const versioninfo = await (await fetch(`https://api.papermc.io/v2/projects/paper/versions/${version}`)).json();
    if(!versioninfo.builds.includes(build) && build !== "latest") return res.status(400).json({ error: true, msg: "Invalid Build Number!" });

    if(build === "latest") {
        build = versioninfo.builds[versioninfo.builds.length - 1];
    }

    const buildinfo = await (await fetch(`https://api.papermc.io/v2/projects/paper/versions/${version}/builds/${build}`)).json();
    res.redirect(301, `https://api.papermc.io/v2/projects/paper/versions/${version}/builds/${build}/downloads/${buildinfo.downloads.application.name}`);
}