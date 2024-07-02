import fetch from "node-fetch";

export default async function velocity(version, build, res) {
    const velocity = await (await fetch("https://api.papermc.io/v2/projects/velocity")).json();
    if(!velocity.versions.includes(version) && version !== "latest") return res.status(400).json({ error: true, msg: "Invalid Version Number!" });

    if(version === "latest") {
        version = velocity.versions[velocity.versions.length - 1];
    }

    const versioninfo = await (await fetch(`https://api.papermc.io/v2/projects/velocity/versions/${version}`)).json();
    if(!versioninfo.builds.includes(parseInt(build)) && build !== "latest") return res.status(400).json({ error: true, msg: "Invalid Build Number!" });

    if(build === "latest") {
        build = versioninfo.builds[versioninfo.builds.length - 1];
    }

    const buildinfo = await (await fetch(`https://api.papermc.io/v2/projects/velocity/versions/${version}/builds/${build}`)).json();
    res.redirect(301, `https://api.papermc.io/v2/projects/velocity/versions/${version}/builds/${build}/downloads/${buildinfo.downloads.application.name}`);
}