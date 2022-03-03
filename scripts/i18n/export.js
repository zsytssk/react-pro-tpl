const fs = require("fs-extra");
const path = require("path");
const chalk = require("react-dev-utils/chalk");
const { runPromisesInSeries, formatDate } = require("./utils");
const CsvFile = require("./CsvFile");
const config = require("./config");

function genFileData(namespace, fileData, lang, isPkg) {
    if (!fileData) return [];
    return Object.keys(fileData).reduce((s, key) => {
        const v = fileData[key];
        const translationId = [namespace, key].join(isPkg ? ":" : ".");
        if (typeof v === "object") {
            return s.concat(genFileData(translationId, v, lang, false));
        }
        const text = v.trim();
        s.push({ translationId, [lang]: text });
        return s;
    }, []);
}

async function parseJsonFile({ empty } = {}) {
    const { langs, output, modules } = config;
    let datastore = [];
    await runPromisesInSeries(
        modules.map((pkg) => async () => {
            await runPromisesInSeries(
                langs.map((lang) => async () => {
                    const dir = path.join(output, `${lang}`);
                    const filepath = path.join(dir, `${pkg}.json`);
                    if (!fs.existsSync(filepath)) return;

                    const preData = fs.readJSONSync(filepath);
                    if (!preData) return;
                    const langData = genFileData(pkg, preData, lang, true);

                    langData.forEach((row) => {
                        const preRow = datastore.find((v) => v.translationId === row.translationId);
                        if (!preRow) {
                            datastore.push(row);
                        } else if (row[lang] && !preRow[lang]) {
                            preRow[lang] = row[lang];
                        } else {
                            if (!preRow) {
                                console.log("未清理:", lang, row.translationId);
                            } else {
                                // console.log(chalk.green('空:'), lang, row.translationId);
                            }
                        }
                    });
                })
            );
        })
    );

    return datastore;
}

/**
 *
 * @param {Array} datastore
 * @param {fs.PathLike} path
 */
async function writeCsvFiles(datastore, filepath) {
    const { headers } = config;
    if (datastore.length) {
        const writeFile = new CsvFile({
            path: filepath,
            headers,
        });
        await writeFile.add(datastore);
    }
}

const starter = async ({ filterType }) => {
    const { exportDir, langs } = config;
    let source = await parseJsonFile();
    if (source.length > 0) {
        const outputPath = path.join(exportDir, `${formatDate("MMDDHHmm")}.csv`);
        if (filterType === "empty") {
            source = source.filter((v) => langs.some((lang) => !v[lang]));
        }
        await writeCsvFiles(source, outputPath);
        console.log(chalk.green("✅  导出完成"));
        console.log(outputPath);
    } else {
        console.log(chalk.green("✴️  数据未导出"));
    }
    return true;
};

module.exports = {
    starter,
};
