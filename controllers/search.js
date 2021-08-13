const { request, response } = require('express');

const search = (req = request, res = response) => {
  const { collection, end } = req.params;

  res.json({
    collection,
    end,
  });
};

module.exports = { search };
