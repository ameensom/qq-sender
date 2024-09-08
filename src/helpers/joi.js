import Joi from 'joi';
import requiredParam from 'q-notifications/helpers/required.param.js';

const CustomJoi = Joi.defaults(setAbortEarlyToFalse)
  .extend(trimStrings)
  .extend(mobileNumberValidator);

function setAbortEarlyToFalse (joi) {
  return joi.options({ abortEarly: false });
}

function trimStrings (joi) {
  return {
    base: joi.string().trim(),
    type: 'string'
  };
}

function mobileNumberValidator (joi) {
  return {
    base: joi.number().integer().min(500_000_000).max(600_000_000),
    type: 'mobile'
  };
}


CustomJoi.validateAndConvert = function validateAndConvert ({ expectedObject = requiredParam('expectedObject'), object = requiredParam('object'), property = requiredParam('property') }) {
  const { error, value } = expectedObject.validate(object[property]);

  object[property] = value;

  return { error, value };
};

export default CustomJoi;