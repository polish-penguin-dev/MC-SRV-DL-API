Here is the basic format for downloading a JAR:

`(GET) /download/[software]/[version]/[build]`

You MUST include all of these parameters (except for build when using Vanilla).

[version] and [build] can be 'latest' to retrieve the latest value for each parameter.

Request examples:

- `(GET) /download/paper/latest/latest`
- `(GET) /download/vanilla/1.21`
- `(GET) /download/purpur/1.20.6/2232`
