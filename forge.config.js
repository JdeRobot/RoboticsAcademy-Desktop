module.exports = {
    packagerConfig: {
        asar: true,
    },
    rebuildConfig: {
        icon: "./src/assets/logo.png",
    },
    makers: [
        {
            name: "@electron-forge/maker-squirrel",
            config: {
                iconUrl: "./src/assets/logo.ico",
                setupIcon: "./src/assets/logo.ico",
            },
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
