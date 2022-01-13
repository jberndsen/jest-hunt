const {exec} = require('child_process');

async function test() {
    return new Promise((resolve, reject) => {
        exec("npm run test", (error) => {
           resolve(!error)
        })
    })
}

async function main() {
    const result = await test();
    console.log(result);
}

main();


