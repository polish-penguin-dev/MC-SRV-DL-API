import fetch from "node-fetch";

export default async function sponge(version, build, res) {
    const sponge = await (await fetch("https://dl-api.spongepowered.org/v2/groups/org.spongepowered/artifacts/spongevanilla")).json();
    if(!sponge.tags.minecraft.includes(version) && version !== "latest") return res.status(400).json({ error: true, msg: "Invalid Version Number!" });

    if(version === "latest") {
        version = sponge.tags.minecraft[0];
    }

    const versioninfo = await (await fetch(`https://dl-api.spongepowered.org/v2/groups/org.spongepowered/artifacts/spongevanilla/versions?tags=,minecraft:${version}`)).json();
    if(build in versioninfo.artifacts === false && build !== "latest") return res.status(400).json({ error: true, msg: "Invalid Build Number! NOTE: Only The 25 Latest Builds May Be Specified For Sponge." });

    if(build === "latest") {
        build = Object.keys(versioninfo.artifacts)[0];
    }

    const buildinfo = await (await fetch(`https://dl-api.spongepowered.org/v2/groups/org.spongepowered/artifacts/spongevanilla/versions/${build}`)).json();
    const asset = buildinfo.assets.find(asset => asset.classifier === "universal");
    const download = (asset && asset.downloadUrl) || buildinfo.assets[0].downloadUrl;
    
    res.redirect(301, download);
}