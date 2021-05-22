const express = require("express");
const app = express();

const request = require("request");
const utils = require("./utils");
const config = require("./config");

const port = process.env.REFRACTION_PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/refraction", function (req, res) {
  let formula = req.body.formula,
    density = req.body.density,
    minEnergy = req.body.minEnergy,
    maxEnergy = req.body.maxEnergy,
    energyStep = req.body.energyStep,
    particleWidth = req.body.particleWidth;

  request.post(
    config.TARGET_BASE_URL.concat(config.TARGET_PATH_URL),
    utils.createFormRequest(formula, density, minEnergy, maxEnergy, energyStep),
    function (error, response, rawBody) {
      if (!error && response.statusCode == 200) {
        let extractedUrl = utils.extractUrlFromBody(rawBody);
        if (extractedUrl == null) {
          return;
        }

        let dataUrl = config.TARGET_BASE_URL.concat(extractedUrl);

        request(dataUrl, function (error, response, data) {
          if (!error && response.statusCode == 200) {
            let parsedData = utils.parseRefractionData(data, particleWidth);

            res.json({
              Energy: parsedData.energies,
              Delta: parsedData.deltas,
              Beta: parsedData.betas,
              Lambda: parsedData.lambdas,
              "4PI/Lambda": parsedData.four_pi_lambdas,
              Mu: parsedData.mus,
              "I/I0": parsedData.I_I0s,
            });
          }
        });
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Refraction calculator listening at http://localhost:${port}`);
});
