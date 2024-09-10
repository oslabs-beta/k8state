import fs from 'fs';
import path from 'path';
const generalService = {
    // Function checks if the .env file exists
    checkEnv: () => {
        if (!process.env.KUBERNETES_SERVER || !process.env.KUBERNETES_TOKEN) {
            const envPath = path.resolve('./.env');
            if (!fs.existsSync(envPath)) {
                const defaultEnv = 'KUBERNETES_SERVER=\n' + 'KUBERNETES_TOKEN=';
                fs.writeFileSync(envPath, defaultEnv.trim());
                return 'init';
            }
            else {
                return 'noVar';
            }
        }
        else {
            return 'exist';
        }
    },
    //Function creates an .env file if it does not exist
    writeEnv: (key, address) => {
        const envPath = path.resolve('./.env');
        const fileEnv = 'KUBERNETES_SERVER=https://' + address + '\n' + 'KUBERNETES_TOKEN=' + key;
        fs.writeFileSync(envPath, fileEnv, 'utf-8');
        process.env.KUBERNETES_SERVER = 'https://' + address;
        process.env.KUBERNETES_TOKEN = key;
    },
    //Function checks if the logs folder exists
    checkLogs: () => {
        const logFolder = path.resolve('../logs/');
        fs.access(logFolder, (err) => {
            if (err) {
                fs.mkdir(logFolder, (err) => {
                    if (err) {
                        throw new Error(`Something went wrong: ${err.message}`);
                    }
                });
            }
        });
    },
    //Function creates a new log in JSON
    writeLogs: (input) => {
        const time = new Date();
        const year = time.getFullYear();
        const month = time.getMonth() + 1;
        const day = time.getDate();
        const hours = time.getHours();
        const minutes = time.getMinutes();
        const seconds = time.getSeconds();
        const logFile = path.resolve(`../logs/log-${year}-${month}-${day}-${hours}-${minutes}-${seconds}.json`);
        if (!fs.existsSync(logFile)) {
            fs.writeFileSync(logFile, JSON.stringify(input, null, 2));
        }
        else {
            fs.writeFileSync(logFile, JSON.stringify(input, null, 2));
        }
    },
    //Function gets the logs in the logs directory
    getDirLogs: () => {
        const logDir = path.resolve('../logs/');
        const filesInDir = fs.readdirSync(logDir);
        return filesInDir;
    },
};
export default generalService;
