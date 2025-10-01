import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import path from "node:path";
import { UserEntity } from "../../user/domain/entities/user.entity";
import { DatesEntity } from "../../dates/domain/entities/dates.entity";
dotenv.config();

const host: string = process.env.DB_HOST;
const port: number = +process.env.DB_PORT;
const username: string = process.env.DB_USER;
const password: string = process.env.DB_PASSWORD;
const database: string = process.env.DB_NAME;

export const AppDataSource = new DataSource({
  type: "postgres",
  host,
  port,
  username,
  password,
  database,
  synchronize: false,
  entities: [
    UserEntity,
    DatesEntity
  ],
  migrations: [
    path.join(__dirname, "./migrations/*.{ts,js}")
  ],
});

export async function getConnection() {
    try {
        if (!AppDataSource.isInitialized) {
            console.log("Initializing database connection...");
            await AppDataSource.initialize();
        }
    } catch (error) {
        console.error("Error creating database connection:", error);
    }
    return AppDataSource;
}