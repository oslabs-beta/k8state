import generalService from '../services/generalService.js';
const generalController = {
    //middleware function to check if the env file exists
    checkEnv: (_req, res, next) => {
        ;
        try {
            const check = generalService.checkEnv();
            if (check === 'exist') {
                res.locals.env = {
                    address: process.env.KUBERNETES_SERVER,
                    key: process.env.KUBERNETES_TOKEN,
                };
            }
            else {
                res.locals.env = check;
            }
            next();
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: 'error checking env ' });
        }
    }
};
export default generalController;
