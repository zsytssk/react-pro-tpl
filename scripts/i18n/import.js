#!/usr/bin/env node
const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");
const prettier = require("prettier");
const csv = require("fast-csv");
const { runPromisesInSeries } = require("./utils");
const config = require("./config");
const { isEmpty, merge, omitBy } = require("lodash");

const DELETE_TAG = "____DEL_TAG____";

async function readCsvFile(filename) {
    const { langs } = config;
    const datastore = langs.reduce((s, lang) => {
        s[lang] = {};
        return s;
    }, {});

    return new Promise((resolve) => {
        let rowCount = 0;

        const onRow = (row) => {
            const { translationId } = row;
            if (!translationId) return;
            let isDel = String(row["description"]).toLowerCase() === "del" || String(row["zh-Hans"]).toLowerCase() === "del";
            langs.forEach((lang) => {
                const rowObj = {};
                let text = (row[lang] || "").trim();
                if (/^"(.+)"$/.test(text)) text = RegExp.$1;
                if (isDel) text = DELETE_TAG;
                // let nameArr = translationId.split(/[\:\.]/);
                let nameArr = [];
                let _index = 0;
                if (translationId.indexOf(":") > -1) {
                    _index = translationId.indexOf(":");
                    nameArr.push(translationId.substring(0, _index));
                    if (translationId.substring(_index + 1)) {
                        nameArr.push(translationId.substring(_index + 1));
                    }
                } else if (translationId.indexOf(".") > -1) {
                    _index = translationId.indexOf(".");
                    nameArr.push(translationId.substring(0, _index));
                    if (translationId.substring(_index + 1)) {
                        nameArr.push(translationId.substring(_index + 1));
                    }
                }
                nameArr.reduce((s, k, i, arr) => (s[k] = i < arr.length - 1 ? {} : text), rowObj);
                merge(datastore[lang], rowObj);
            });
            rowCount++;
        };

        const onEnd = () => {
            console.log(chalk.cyan(`Parsed ${filename} ${rowCount} rows`));
            // console.log(datastore);
            resolve(datastore);
        };

        fs.createReadStream(path.resolve(__dirname, filename))
            .pipe(csv.parse({ headers: true }))
            .on("error", (error) => console.error(error))
            .on("data", onRow)
            .on("end", onEnd);
    });
}

async function writeJsonFile(datastore) {
    const { langs, output } = config;
    await runPromisesInSeries(
        langs.map((lang) => async () => {
            const langData = datastore[lang];
            const modules = Object.keys(langData);

            modules.forEach((mod) => {
                const dir = path.join(output, `${lang}`);
                fs.mkdirSync(dir, { recursive: true });
                const filepath = path.join(dir, `${mod}.json`);
                let fileData = langData[mod];
                if (!fileData) return;

                if (fs.existsSync(filepath)) {
                    try {
                        const preData = fs.readJSONSync(filepath);
                        fileData = merge(preData, fileData);
                    } catch (error) {
                        console.log(chalk.yellow("json读取错误" + filepath));
                    }
                }

                fileData = omitBy(fileData, (v) => v === DELETE_TAG);
                fs.writeFileSync(
                    filepath,
                    prettier.format(JSON.stringify(fileData), {
                        parser: "json",
                    })
                );
            });
        })
    );
}

const starter = async (filename) => {
    const source = await readCsvFile(String(filename).trim());
    if (!isEmpty(source)) {
        await writeJsonFile(source);
        console.log(chalk.green("✅  导入完成"));
    } else {
        console.log(chalk.green("✴️  数据未导入"));
    }
    return true;
};

module.exports = {
    starter,
};
