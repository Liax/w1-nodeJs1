const dataSource = require("../db").dataSource;
const Wilder = require("../entity/Wilder");

module.exports = {
	create: (req, res) => {
		const { name } = req.body;
		if (name.length > 100 || name.length === 0)
			return res
				.status(422)
				.send("The name should have a length between 1 and 100 character");

		dataSource
			.getRepository(Wilder)
			.save(req.body)
			.then((created) => {
				res.status(201).send(created);
			})
			.catch(() => {
				res.send("Error while creating wilder");
			});
	},

	read: (req, res) => {
		dataSource
			.getRepository(Wilder)
			.find({})
			.then((wilders) => {
				res.json(wilders);
			})
			.catch(() => {
				res.send("Error while fetching wilder");
			});
	},

	update: (req, res) => {
		const { name } = req.body;
		if (name.length > 100 || name.length === 0)
			return res
				.status(422)
				.send("The name should have a length between 1 and 100 character");

		dataSource
			.getRepository(Wilder)
			.update(req.params.id, { name })
			.then(({ affected }) => {
				if (affected) {
					res.send("Success while updating");
				} else {
					res.sendStatus(404);
				}
			})
			.catch(() => {
				res.send("Error while updating wilder");
			});
	},

	delete: (req, res) => {
		dataSource
			.getRepository(Wilder)
			.delete(req.params.id)
			.then(({ affected }) => {
				if (affected) {
					res.send("Success while deleting");
				} else {
					res.sendStatus(404);
				}
			})
			.catch(() => {
				res.send("Error while deleting wilder");
			});
	},
};
