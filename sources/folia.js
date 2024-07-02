import fetch from "node-fetch";

export default async function folia(version, build, res) {
    const folia = await (await fetch("https://api.papermc.io/v2/projects/folia")).json();
    if(!folia.versions.includes(version) && version !== "latest") return res.status(400).json({ error: true, msg: "Invalid Version Number!" });

    if(version === "latest") {
        version = folia.versions[folia.versions.length - 1];
    }

    const versioninfo = await (await fetch(`https://api.papermc.io/v2/projects/folia/versions/${version}`)).json();
    if(!versioninfo.builds.includes(parseInt(build)) && build !== "latest") return res.status(400).json({ error: true, msg: "Invalid Build Number!" });

    if(build === "latest") {
        build = versioninfo.builds[versioninfo.builds.length - 1];
    }

    const buildinfo = await (await fetch(`https://api.papermc.io/v2/projects/folia/versions/${version}/builds/${build}`)).json();
    res.redirect(301, `https://api.papermc.io/v2/projects/folia/versions/${version}/builds/${build}/downloads/${buildinfo.downloads.application.name}`);
}