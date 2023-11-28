import { createConnection } from "typeorm";
import { UserEntity } from "../entities/user_entity";
import { config as dotenvConfig } from "dotenv";
dotenvConfig();

const DB = async () => {
    const DB_TYPE: any = process.env.DB_TYPE;
    const DB_HOST: any = process.env.DB_HOST;
    const DB_PORT: any = process.env.DB_PORT;
    const DB_USER: any = process.env.DB_USER;
    const DB_PASS: any = process.env.DB_PASS;
    const DB_NAME: any = process.env.DB_NAME;
    try {
        await createConnection({
            type: DB_TYPE,
            host: DB_HOST,
            port: DB_PORT,
            username: DB_USER,
            password: DB_PASS,
            database: DB_NAME,
            entities: [UserEntity],
            synchronize: true
        })
        console.log("connected to mySql");

    } catch (error) {
        console.log(error);
        throw new Error("unable to connect to mySql")
    }
}

export default DB
