const createFormRequest = (
  formula,
  density,
  minEnergy,
  maxEnergy,
  energyStep
) => {
  return {
    form: {
      Material: "Enter Formula",
      Formula: formula,
      Density: density,
      Scan: "Energy",
      Min: minEnergy,
      Max: maxEnergy,
      Npts: energyStep,
      Output: "Text File",
    },
  };
};

const parseRefractionData = (data, particleWidth) => {
  let rows = data.split("\n");
  let energies = [],
    deltas = [],
    betas = [],
    lambdas = [],
    four_pi_lambdas = [],
    mus = [],
    I_I0s = [];

  for (var i = 2; i < rows.length - 1; i++) {
    let row = rows[i];
    let values = row.trim().split(/\s+/);
    let parsedValues = values.map(parseFloat);
    let energy = parsedValues[0],
      delta = parsedValues[1],
      beta = parsedValues[2],
      lmd = 12.4e-7 / energy,
      four_pi_lambda = (4 * Math.PI) / lmd,
      mu = beta * four_pi_lambda,
      I_I0 = Math.exp(-mu * particleWidth);

    energies.push(energy);
    deltas.push(delta);
    betas.push(beta);
    lambdas.push(lmd);
    four_pi_lambdas.push(four_pi_lambda);
    mus.push(mu);
    I_I0s.push(I_I0);
  }

  return {
    energies,
    deltas,
    betas,
    lambdas,
    four_pi_lambdas,
    mus,
    I_I0s,
  };
};

const extractUrlFromBody = (rawBody) => {
  let regexResult = rawBody.match("URL=(/tmp/[a-zA-Z0-9. ]+)");
  if (regexResult instanceof Array && regexResult.length >= 2) {
    return regexResult[1];
  }
  return null;
};

exports.createFormRequest = createFormRequest;
exports.parseRefractionData = parseRefractionData;
exports.extractUrlFromBody = extractUrlFromBody;
