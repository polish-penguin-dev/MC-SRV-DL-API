Error messages:

**Page Not Found! For Download Endpoint, Did You Specify Required Parameters (Software, Version)?**

This is a HTTP 404 error (not found). This means the page you were looking for was not found.
To solve this issue, ensure that you are using the correct URL and spellings, as well as making sure you have included the [software] and [version] parameter which are both required for all softwares.

**Include Build!**

This is a HTTP 400 error (bad request). Like the error above, ensure you are including the [build]parameter which is also required for all softwares but vanilla.

**Invalid Software Type!**

This is a HTTP 400 error (bad request). This means that the software string inputted does not match any softwares we provide for download. This is case sensitive, so make sure the software string is all lowercase. Find a list of all softwares on the info page.

**Invalid Version Number!**

This is a HTTP 400 error (bad request). The version number you have inputted is not valid. Ensure that the software you are trying to download supports the version you are trying to get and that the version is using a format such as: "1.20.1", "1.8", etc.

**Invalid Build Number!**

This is a HTTP 400 error (bad request). The build number you have inputted is not valid. Ensure the build number is correct and relates to the version you have inputted. Builds per version usually don't start with 0 or 1.

Common mistakes:

- All is CaSE SeNsITIve! Make sure the strings you have inputted are in the correct case.
- Make sure we support the software you are trying to download!
- Always check spellings!