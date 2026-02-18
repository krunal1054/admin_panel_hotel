const Sub = require("../models/subPackagesModels");

exports.searchTours = async (req, res) => {
  res.json(await Sub.find(req.query));
};
