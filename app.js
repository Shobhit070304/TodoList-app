const express = require("express");
const app = express();
const path = require("path");
const todoModel = require("./models/todo");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  let tasks = await todoModel.find({});
  res.render("home", { tasks });
});

app.post("/createtask", async (req, res) => {
  const { title, date, task } = req.body;

  const newtask = await todoModel.create({
    title,
    date,
    task,
  });

  res.redirect("/");
});

app.get("/delete/:id", async (req, res) => {
  const { id } = req.params;
  await todoModel.findOneAndDelete({ _id: id });

  res.redirect("/");
});

app.get("/edit/:id", async (req, res) => {
  const { id } = req.params;

  let task = await todoModel.findOne({ _id: id });
  console.log(task);

  res.render("edit", { task });
});

app.post("/edit/:id", async (req, res) => {

  let updatedtask = await todoModel.findOneAndUpdate(
    { _id: req.params.id },
    { title: req.body.title, task: req.body.task, date: req.body.date },
    { new: true }
  );

  res.redirect("/")
});

app.get("/about", (req,res)=>{
    res.render("about")
})

app.listen(3000);
