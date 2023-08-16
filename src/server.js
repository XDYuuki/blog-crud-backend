const app = require("./app");

require("./database/connection");

const PORT = 3000;

app.listen(PORT, () => {
    console.log("Stat listening port:", PORT);
});
