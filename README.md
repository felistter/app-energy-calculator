# Refraction calculator
The web service simplifying estimation of appropriate energies for samples using https://henke.lbl.gov.

## Getting Started

### Install and run
```bash
git clone https://github.com/felistter/app-refraction-calculator.git
cd app-refraction-calculator
npm install
npm start
```

### Request example 
```bash
curl -d '{"formula":"Si3N4", "density":-1, "minEnergy":30, "maxEnergy":30000, "energyStep":100, "particleWidth":0.005}' -H "Content-Type: application/json" -X POST http://localhost:3000/refraction
```

## License

Licensed under the MIT License.
