/*
 * Given a number, a range within which that number falls, and an output
 * range, scale the input to the output range.
 *
 * @param {Object} _params - a dict of the following:
 * @param {number} _params.input - the input number
 * @param {number} _params.inMin - the minimum of the range of inputs
 * @param {number} _params.inMax - the maximum of the range of inputs
 * @param {number} _params.outMin - the minimum of the range of outputs
 * @param {number} _params.outMax - the minimum of the range of outputs
 * @return {number} - the scaled number
 */
module.exports = (_params = {}) => {
  const params = { ..._params };

  if (params.input == null) {
    return 0;
  }

  if (params.inMin == null) {
    return params.input;
  }

  if (params.inMax == null) {
    return params.input;
  }

  if (params.outMin == null) {
    return params.input;
  }

  if (params.outMax == null) {
    return params.input;
  }

  // keep the input in bounds
  if (params.inMax > params.inMin) {
    if (params.input < params.inMin) {
      params.input = params.inMin;
    }

    if (params.input > params.inMax) {
      params.input = params.inMax;
    }
  } else {
    if (params.input > params.inMin) {
      params.input = params.inMin;
    }

    if (params.input < params.inMax) {
      params.input = params.inMax;
    }
  }

  // convert the input to a percentage
  const percent = ((params.input - params.inMin) * 100) / (params.inMax - params.inMin);

  // convert the percentage to the output scale
  return percent * ((params.outMax - params.outMin) / 100) + params.outMin;
};
