const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function run(command) {
    const result = {};
    try {
        let {stdout, stderr} = await exec(command);
        result.stdout = stdout;
        result.stderr = stderr;
    } catch (e) {
        result.error = e;
    }
    console.log(result);
    return result;
}

async function main(start, end) {
    // Start bisecting the commit tree
    await run("git bisect start");

    // Start with the assumption that the current commit is bad
    await run("git bisect bad");

    // Tell git which one was still fine
    await run("git bisect good " + start);

    const done = false;

    while (!done) {
        const {error} = await run("npm run test");
        console.log(error);
        if (error) {
            const {stdout} = await run("git bisect bad");
            console.log(stdout);
        } else {
            const {stdout} = await run("git bisect good");
            console.log(stdout);
        }
    }

    // finally, let's clean up after ourselves
    await run("git bisect reset");
}

// supply start and end
main('431d2f03acefe90b706ba413f9d258179a03a006', '9205447e9b5a1789ebe20acc7cb1f4a641b05c36');


