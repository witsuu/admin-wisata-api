const Joi = require("@hapi/joi");

const storeDestinations = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    category_id: Joi.required,
  });
  return schema.validate(data);
};

module.exports = {
  storeDestinations,
};
