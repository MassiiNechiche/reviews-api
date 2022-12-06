require("dotenv").config();
const { hashSync, genSaltSync, compareSync } = require("bcryptjs");
const jwt = require("jsonwebtoken");

function verifyPassword(user: any, password: string) {
  return compareSync(password, user.password);
}

module.exports = {
  verifyAuthenticationInformation: (user: any, password: string) => {
    //Compare password
    let error = false;
    if (!verifyPassword(user, password)) error = true;

    user.password = undefined;
    const jsontoken = jwt.sign({ result: user }, process.env.JWT_KEY, {
      expiresIn: "60m",
    });

    return {
      token: jsontoken,
      user,
      error,
    };
  },
  createToken: async (user: any) => {
    user.password = undefined;
    const jsontoken = await jwt.sign({ result: user }, process.env.JWT_KEY, {
      expiresIn: "60m",
    });
    return {
      token: jsontoken,
      user,
    };
  },
  decodeToken: (token: string, key: any) => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, key, (error: any, decode: any) => {
        if (error) {
          reject(null);
        } else {
          resolve(decode.result);
        }
      });
    });
  },
  hashPassword: (password: string) => {
    //Hash password
    const salt = genSaltSync(10);
    password = hashSync(password, salt);
    return password;
  },
  resetPassword: (user: any, password: string, old: string) => {
    if (verifyPassword(user, old)) {
      return module.exports.hashPassword(password);
    } else {
      return "password doesn't match";
    }
  },
};
