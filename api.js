const axios = require("axios");

const api = {
  getUser(username) {
    return axios.get(`https://api.github.com/users/${username}`).catch(err => {
      console.log("user not found");
      process.exit(1);
    });
  },
  getTotalStars(username) {
    return axios
      .get(`https://api.github.com/users/${username}/repos`)
      .then(response => {
        /* console.log(response.data);
        return response.data.reduce((acc, curr) => {
          acc += curr.stargazers_count;
          return acc;
          });
      });
  }*/
        var stars = [];
        //console.log(response)
        console.log(response.data.starred_url);
        stars.push(response.data.starred_url);
        console.log("starts : " + stars.length);
      });
  }
};

module.exports = api;
