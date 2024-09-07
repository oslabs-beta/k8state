import fs from 'fs';
import path from 'path';

interface data {
    name: string;
    namespace: string;
    logs: string;
}

const generalService = {
        //function that checks if the environment variables exist and if the env file exists, otherwise create it
        checkEnv: (): string | undefined => {
            if(!process.env.KUBERNETES_SERVER || !process.env.KUBERNETES_TOKEN){
                const envPath = path.resolve('./.env');
                if(!fs.existsSync(envPath)){
                    const defaultEnv = 'KUBERNETES_SERVER=\n' + 'KUBERNETES_TOKEN=';
                    fs.writeFileSync(envPath, defaultEnv.trim());
                    return 'init';
                }
                else{
                    return 'noVar';
                }
            }
            else{
                return 'exist';
            }
        },
        writeEnv: (key: string, address: string) => {
            const envPath = path.resolve('./.env');
            const fileEnv = 'KUBERNETES_SERVER=https://' + address + '\n' + 'KUBERNETES_TOKEN=' + key;
            fs.writeFileSync(envPath, fileEnv, 'utf-8');
            process.env.KUBERNETES_SERVER='https://' + address;
            process.env.KUBERNETES_TOKEN=key;
        },
        checkLogs: () => {
            const logFolder = path.resolve('../logs/');
            //console.log(logFolder);
            //fs is async
            fs.access(logFolder, (err) => {
                if(err){
                    fs.mkdir(logFolder, (err) => {
                        if(err){
                            console.log(err);
                        }
                    });
                }
            });
        },
        writeLogs: (input: data[] | undefined) => {
            const time = new Date();
            const year = time.getFullYear();
            const month = time.getMonth() + 1;
            const day = time.getDate();
            const hours = time.getHours();
            const minutes = time.getMinutes();
            const seconds = time.getSeconds();
            //console.log(input);
            const logFile = path.resolve(`../logs/log-${year}-${month}-${day}-${hours}-${minutes}-${seconds}.json`);
            if(!fs.existsSync(logFile)){
                fs.writeFileSync(logFile, JSON.stringify(input, null, 2));
            }
            else{
                fs.writeFileSync(logFile, JSON.stringify(input, null, 2));
            }
        },
        getDirLogs: (): string[] => {
            const logDir: string = path.resolve('../logs/');
            const filesInDir: string[] = fs.readdirSync(logDir);
            return filesInDir;
        }
}

export default generalService;