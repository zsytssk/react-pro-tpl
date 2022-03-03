const inquirer = require("inquirer");

// const argv = require('node-argv');
// inquirer.registerPrompt('directory', require('inquirer-select-directory'));

(async () => {
    const answer = await inquirer.prompt([
        {
            message: "选择操作",
            name: "type",
            type: "list",
            choices: [
                { name: "import(导入)", value: "import", description: "导入" },
                { name: "export(导出)", value: "export", description: "导出" },
            ],
        },
    ]);
    // console.log('answer', answer);
    const { type } = answer;

    if (type === "import") {
        const answers = await inquirer.prompt([
            {
                name: "filename",
                message: "请输入文件路径(拖入csv文件)",
            },
        ]);
        let { filename } = answers;
        filename = filename.replace(/\'/g, "");
        require("./import").starter(filename);
    } else if (type === "export") {
        const answers = await inquirer.prompt([
            {
                message: "全量导出",
                name: "filterType",
                type: "list",
                choices: [
                    { name: "empty item(空项)", value: "empty", description: "空项" },
                    { name: "all(全量)", value: "all", description: "全量" },
                ],
            },
        ]);
        const { filterType } = answers;
        require("./export").starter({ filterType });
    }
})();
