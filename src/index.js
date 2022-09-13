const express = require("express");
const wildersController = require("./controller/wilders");
const { dataSource } = require("./db");

const app = express();

app.use(express.json());

app.post("/wilders", wildersController.create);
app.get("/wilders", wildersController.read);
app.patch("/wilders/:id", wildersController.update);
app.delete("/wilders/:id", wildersController.delete);

const start = async () => {
	await dataSource.initialize();
	app.listen(3000, () => console.log("Server started on 3000"));
};

start();
