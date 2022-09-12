const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
	name: "Wilders",
	columns: {
		id: {
			primary: true,
			type: "int",
			generated: true,
		},
		name: {
			type: "text",
		},
	},
});
