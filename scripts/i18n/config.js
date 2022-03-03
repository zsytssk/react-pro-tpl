const path = require("path");
const glob = require("glob");
const fsextra = require("fs-extra");

/* console.log("modules:", chalk.green(config.modules.join(",")));
console.log("langs:", chalk.green(config.langs.join(","))); */

const langs = [/* 'zh-Hans', */ "en", "ja", "ko", "vi", "zh-Hant", "tr", "pt"];
const exportDir = path.resolve("./translate/");

fsextra.ensureDir(exportDir);

const config = {
    langs,
    headers: ["translationId", ...langs, "description"],
    output: path.resolve("./public/locales/"),
    exportDir,
    modules: glob.sync(path.resolve("./public/locales/zh-Hant/**/**.json")).map((v) => path.parse(v).name),
};

module.exports = config;
