const { json } = require("express");
const fs = require("fs");
const crypto = require("crypto");
const util = require("util");
const Repository = require("./repository");

const scrypt = util.promisify(crypto.scrypt);

class UsersRepository extends Repository {
  async create(attrs) {
    attrs.id = this.randomId();

    const salt = crypto.randomBytes(8).toString("hex");
    const buf = await scrypt(attrs.password, salt, 64);

    const records = await this.getAll();
    const record = {
      ...attrs,
      password: `${buf.toString("hex")}.${salt}`,
    };
    records.push(record);

    await this.writeAll(records);

    return record;
  }

  async comparePassword(saved, supplied) {
    // Saved -> password saved in our database. 'hased.salt'
    //Supplied -> password given to us by a user tyring sign in

    const [hashed, salt] = saved.split(".");
    const hashedSuppliedbuf = await scrypt(supplied, salt, 64);
    // hashedsuppliedbuf is in buffer code
    return hashed === hashedSuppliedbuf.toString("hex");
  }
}

module.exports = new UsersRepository("users.json");
