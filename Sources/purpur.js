import fetch from "node-fetch";

export default async function purpur(version, build, res) {
    const purpur = await (await fetch("https://api.purpurmc.org/v2/purpur")).json();
    if(!purpur.versions.includes(version) && version !== "latest") return res.status(400).json({ error: true, msg: "Invalid Version Number!" });

    if(version === "latest") {
        version = purpur.versions[purpur.versions.length - 1];
    }

    const versioninfo = await (await fetch(`https://api.purpurmc.org/v2/purpur/${version}`)).json();
    if(!versioninfo.builds.all.includes(build) && build !== "latest") return res.status(400).json({ error: true, msg: "Invalid Build Number!" });

    if(build === "latest") {
        build = versioninfo.builds.latest;
    }

    res.redirect(301, `https://api.purpurmc.org/v2/purpur/${version}/${build}/download`);
}