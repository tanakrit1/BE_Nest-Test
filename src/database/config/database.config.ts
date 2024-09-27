import { configDotenv } from "dotenv";
import { DataSourceOptions } from "typeorm";

configDotenv({ path: '.env' });

const dataSource : DataSourceOptions = {
    type: 'postgres',
    host: process.env.APP_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    password: process.env.DATABASE_PASSWORD,
    username: process.env.DATABASE_USERNAME,
    entities: ['dist/database/entities/*.entity{.ts,.js}'],
    database: process.env.DATABASE_NAME,
    synchronize: true,
    logging: true,
  }

export  { dataSource }