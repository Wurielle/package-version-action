const fs = require('fs');
const path = require('path');

const core = require('@actions/core');

try {
    let version = core.getInput('version');
    if (version.startsWith('v')) version = version.substring(1);

    const targets = core.getMultilineInput('targets');
    targets.forEach((packagePath) => {
        const packageFilePath = path.join(process.env.GITHUB_WORKSPACE, packagePath);
        const packageFileData = fs.readFileSync(packageFilePath);
        const currentPackage = JSON.parse(packageFileData);
        const newPackage = {
            ...currentPackage,
            version,
        }
        fs.writeFileSync(packageFilePath, JSON.stringify(newPackage, null, 2));
        console.log(JSON.parse(fs.readFileSync(packageFilePath, null, 2)));
    })
} catch (error) {
    core.setFailed(error.message);
}
