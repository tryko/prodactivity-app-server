// lets make a server
/* eslint-disable */
// import util from 'util';
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import TaskModel from "./tasks.model.js";

mongoose.Promise = global.Promise;
const app = express();
app.use(cors());
app.use(bodyParser.json());

/* creating connection to mongodb */
mongoose.connect("mongodb://localhost:27017/task-attention", {
  useMongoClient: true,
  /* other options */
});
const db = mongoose.connection;

db.on("er", err => {
  console.log(err);
});
db.once("open", () => {
  console.log("connected to monhgodb");
});
/* ------------------------------------- */

/* making get request using express and mongodb */
app.get("/", async(req, res) => {
  console.log("get latest record");
  try {
    const tasks = await TaskModel.find({});
    res.json(tasks);
  } catch (err) {
    console.log("error: ", err);
  }
});

app.post("/", async(req, res) => {
  try {
    console.log("req.body in post :", req.body);
    const data = req.body;
    let taskID = "";
    await TaskModel.create(data, (err, task) => {
      taskID = task._id;
    });
    res.status(200).json({
      id: taskID
    });
  } catch (err) {
    console.log("post error:", err);
  }
});

// push date to thoughtsToStop
app.put("/update-stage/:id", (req, res) => {
  try {
    console.log(typeof req.body);
    console.log("stop body: ", req.body);

    req.body.forEach(async obj => {
      await TaskModel.findOneAndUpdate({
        _id: req.params.id
      }, {
        [obj.dbActionType]: {
          [obj.taskParm]: obj.data
        }
      });
    });
    res.status(200).send({
      response: "updated data"
    });
  } catch (err) {
    console.log("problem with update", err);
  }
});

app.get("/results/latest-result", async(req, res) => {
  try {
    const latestRecord = await TaskModel.findOne({}, {}, {
      sort: {
        initTaskTime: -1
      }
    }).exec((err, result) => {
      console.log("sending result", result);
    });

    res.json(latestRecord);
  } catch (err) {
    console.log("problem getting latest record: ", err);
  }
});

app.get("/results/ten-latests-results", async(req, res) => {
  try {
    const latestsRecords = await TaskModel.find({})
      .sort({
        initTaskTime: -1
      })
      .limit(10)
      .exec((err, result) => {
        console.log("err:", err, "results:", result);
      });

    res.json(latestsRecords);
  } catch (err) {
    console.log("error while getting latests records", err);
  }
});

app.listen(3000, () => {
  console.log("listening to port: 3000");
});

/*
  add getfor results route
 */
