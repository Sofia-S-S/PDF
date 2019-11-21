const axios = require("axios");

const api = {
  getUser(username) {
    return axios.get(`https://api.github.com/users/${username}`).catch(err => {
      console.log("user not found");
      process.exit(1);
    });
  },
  getTotalStarts(username) {
    return axios
      .get(`https://api.github.com/users/${username}`)
      .then(responce => {
        return responce.data.reduce((acc, curr) => {
          acc += curr.stargazers_count;
          return acc;
        });
      });
  }
};
module.exports = api;
