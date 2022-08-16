const express = require("express");
const bodyParser = require("body-parser");
const { params } = require("./create");
const {
  writeItemParams,
  getAnItemParams,
  updateItemParams,
  deleteItemParams,
  scanParams,
} = require("./items");

const app = express();

const PORT = process.env.PORT || 8080;

// Parse requests of content-type: application/json
app.use(bodyParser.json());

// Parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// DB Connection
const client = require("./client.js");

// create table
// docClient.createTable(params, function(err, data) {
//     if (err) {
//       console.log("Error", err);
//     } else {
//       console.log("Table Created", data);
//     }
//   });

// Default route for server status
app.get("/", (req, res) => {
  res.json({ message: `Server is running on port ${PORT}` });
});

// Set listen port for request
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Create
app.post("/table", (req, res) => {
  const { season, episode } = req.body;
  if (!season || !episode) {
    res.send("Please return season and episode json");
  } else {
    client.putItem(writeItemParams(season, episode), (err, data) => {
      if (err) {
        console.log("Error", err);
        res.send("error");
      } else {
        console.log("Success", data);
        res.send("succeed");
      }
    });
  }
});

// Read
app.get("/table", (req, res) => {
  const { season, episode } = req.body;
  if (!season || !episode) {
    res.send("Please return season and episode json");
  } else {
    client.getItem(getAnItemParams(season, episode), (err, data) => {
      if (err) {
        console.log("Error", err);
        res.send("error");
      } else {
        console.log("Success", data);
        res.json(data);
      }
    });
  }
});

// Update
app.put("/table", (req, res) => {
  const { season, episode, addNewCol, changeNewThing } = req.body;
  if (!season || !episode || !addNewCol || !changeNewThing) {
    res.send("Please return season, episode, addNewCol, changeNewThing json");
  } else {
    client.updateItem(
      updateItemParams(season, episode, addNewCol, changeNewThing),
      (err, data) => {
        if (err) {
          console.log("Error", err);
          res.send("error");
        } else {
          console.log("Success", data);
          res.json(data);
        }
      }
    );
  }
});

// Delete
app.delete("/table", (req, res) => {
  const { season, episode } = req.body;
  if (!season || !episode) {
    res.send("Please return season and episode json");
  } else {
    client.deleteItem(deleteItemParams(season, episode), (err, data) => {
      if (err) {
        console.log("Error", err);
        res.send("error");
      } else {
        console.log("Success", data);
        res.send("succeed");
      }
    });
  }
});

// Read all
app.get("/table/all", (req, res) => {
  const tableName = "TEST_TABLE";
  client.scan(scanParams(tableName), (err, data) => {
    if (err) {
      console.log("Error", err);
      res.send("error");
    } else {
      console.log("Success", data);
      res.json(data);
    }
  });
});
