import path from "path";
import sqlite3 from "sqlite3";

const __dirname = path.resolve();
const dbpath = path.join(__dirname, "db", "university.db");

export const db = new sqlite3.Database(dbpath);
