// database for this project
"use strict";
const sqlite3 = require("sqlite3").verbose();
class Db {
  constructor(file) {
    this.db = new sqlite3.Database(file);
    this.CreateTable();
  }
  CreateTable() {
    const sql = `
      Create table if not exists userAuth(
          id integer primary key,
          name text,
          email text unique,
          password text
      )`;
    return this.db.run(sql);
  }
  selectByEmail(email, callback) {
    return this.db.get(
      `select * from userAuth where email=?`,
      [email],
      (err, row) => {
        callback(err, row);
      }
    );
  }
  insert(user, callback) {
    return this.db.run(
      `insert into userAuth(name,email,password) values (?,?,?)`,
      user,
      err => {
        callback(err);
      }
    );
  }
}
module.exports = Db;
