const dataSource = require("../db").dataSource;
const Wilder = require("../entity/Wilder");

module.exports = {
	create: (req, res) => {
		dataSource
			.getRepository(Wilder)
			.save(req.body)
			.then(() => {
				res.send("Created wilder");
			})
			.catch(() => {
				res.send("Error while creating wilder");
			});
	},

	find: (req, res) => {
		dataSource
			.getRepository(Wilder)
			.find({})
			.then((Wilders) => {
				res.json(Wilders);
			})
			.catch(() => {
				res.send("Error while fetching wilder");
			});
	},

	update: (req, res) => {
		dataSource
			.getRepository(Wilder)
			.update(req.body.id, { name: req.body.name })
			.then(() => {
				res.send("Success");
			})
			.catch(() => {
				res.send("Error while fetching wilder");
			});
	},

	delete: (req, res) => {
		dataSource
			.getRepository(Wilder)
			.delete(req.body.id)
			.then(() => {
				res.send("Succes while deleting");
			})
			.catch(() => {
				res.send("Error while fetching wilder");
			});
	},
};
