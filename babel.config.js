module.exports = api => {
    const isExtract = api.env("extract");

    const presets = ["next/babel"]
    const plugins = [
        [
            "react-intl-auto",
            {
                "filebase": true,
                "includeExportName": "all",
                "separator": "_dot_"
            }
        ],
    ]
    if (isExtract) {
        plugins.push([
            "react-intl",
            {
                extractFromFormatMessageCall: true,
                messagesDir: "build/locale/"

            }
        ]);
    }
    return {
        presets,
        plugins
    };
}