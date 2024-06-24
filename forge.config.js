module.exports = {
    packagerConfig: {
        asar: true,
    },
    rebuildConfig: {},
    makers: [
        {
            name: "@electron-forge/maker-squirrel",
            config: {},
        },
        {
            name: "@electron-forge/maker-zip",
            platforms: ["darwin"],
        },
        {
            name: "@electron-forge/maker-deb",
            config: {
                options: {
                    icon: "./src/assets/logo.png",
                },
            },
        },
        {
            name: "@electron-forge/maker-rpm",
            config: {
                options: {
                    icon: "./src/assets/logo.svg",
                },
            },
        },
    ],
    plugins: [
        {
            name: "@electron-forge/plugin-auto-unpack-natives",
            config: {},
        },
    ],
};
