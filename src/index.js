const express = require("express");
const typeorm = require("typeorm");
const Wilders = require("./entity/Wilders");

const app = express();

const dataSource = new typeorm.DataSource({
	type: "sqlite",
	database: "./wildersdb.sqlite",
	synchronize: true,
	entities: [require("./entity/Wilders")],
});

app.get("/", (req, res) => {
	res.send("Hello World");
});

const start = async () => {
	await dataSource.initialize();
	dataSource.getRepository(Wilders).save({ name: "First Wilder" });
	app.listen(3000, () => console.log("Server started on 3000"));
};

start();
