import fs from 'fs';
import path from 'path';
const generalService = {
    //function that checks if the environment variables exist and if the env file exists, otherwise create it
    checkEnv: () => {
        if (!process.env.KUBERNETES_SERVER || !process.env.KUBERNETES_TOKEN) {
            const envPath = path.resolve(path.resolve('./.env'));
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
    writeEnv: (key, address) => {
        const envPath = path.resolve(path.resolve('./.env'));
        const fileEnv = 'KUBERNETES_SERVER=https://' + address + '\n' + 'KUBERNETES_TOKEN=' + key;
        fs.writeFileSync(envPath, fileEnv, 'utf-8');
        process.env.KUBERNETES_SERVER = 'https://' + address;
        process.env.KUBERNETES_TOKEN = key;
    },
};
export default generalService;
