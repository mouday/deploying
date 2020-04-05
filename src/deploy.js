/**
 * 
 * node-ssh
 * https://www.npmjs.com/package/node-ssh
 * 
 */

const node_ssh = require('node-ssh')
const fs = require('fs')
const os = require('os')
const path = require('path')

/**
 * 读取运行命令所在目录下的配置文件
 * @param {string} filename  default deploying.json
 */
function readConfig(filename = './deploying.json') {

    const configPath = path.resolve(filename)

    if (fs.existsSync(configPath)) {
        return JSON.parse(fs.readFileSync(configPath));
    } else {
        throw new Error(`ERROR: 配置文件不存在：${filename}`);
    }
}


/**
 * 获取的当前用户的私钥路径
 */
function getPrivateKeyPath() {
    const homeDir = os.homedir()
    return path.join(homeDir, '.ssh/id_rsa')
}


/**
 * 通过ssh执行命令
 * config eg:
 * {
 *      "host": "localhost", 
 *      "port": 22,
 *      "username": "hina",
 *      "password": "",
 *      "privateKey": "",
 *      "commands": [
 *          "pwd"
 *      ],
 *      "stdout": true,
 *      "stderr": true
 * }
 */
async function deploy(config) {
    // 连接
    const ssh = await new node_ssh().connect({
        host: config.host,
        port: config.port,
        username: config.username,
        password: config.password,
        privateKey: config.privateKey || getPrivateKeyPath()
    })

    // 执行命令
    const result = await ssh.execCommand(config.commands.join("&&"))

    if (config.stdout) {
        console.log('STDOUT: ' + result.stdout)
    }

    if (config.stderr) {
        console.log('STDERR: ' + result.stderr)
    }

    console.log('code: ' + result.code)

    // 退出
    ssh.dispose()
}

/**
 * 运行命令的入口
 * @param {string} name 
 */
function runDeploy(name) {
    const config = readConfig()
    if (config[name]) {
        deploy(config[name])
    } else {
        console.log(`config ${name} not defined`);
    }
}

module.exports = runDeploy




