const { exec } = require('child_process');
const os = require('os');
const chalk = require('chalk');

function getAllLocalIPs() {
    const interfaces = os.networkInterfaces();
    const results = [];

    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                results.push({ name, address: iface.address });
            }
        }
    }

    return results;
}

const port = 3000;
const local = `http://localhost:${port}`;
const allIPs = getAllLocalIPs();

console.log();
console.log(chalk.green.bold('🚀 Dev server running at:\n'));
console.log(`  ➜  Local:     ${chalk.cyan(local)}`);
allIPs.forEach(({ name, address }) => {
    console.log(`  ➜  ${name.padEnd(10)} ${chalk.cyan(`http://${address}:${port}`)}`);
});
console.log();

exec(`npx next dev -H 0.0.0.0 -p ${port}`, { stdio: 'inherit' });
