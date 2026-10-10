# CO₂ Emission Visualization Dashboard

Built in the **Fujitsu × TUHH "Fishing for Experience"** programme (2023–24): an agile student team project on *Digital Waste*, making the carbon footprint of digital data measurable and visible.

The dashboard takes server energy data (server, service, region, kWh, uptime, date), converts energy use into CO₂ emissions and shows how emissions develop over time.

## Features

- Upload server energy data as a JSON file (see `src/sample.json` for the format)
- CO₂ emissions over time as an interactive chart
- Filter by server name, service type (virtual machine, storage, web hosting, …) and month
- Date-range selection

## Run

```bash
npm install
npm start          # http://localhost:3000
```

## Tech

React (Create React App), Chart.js and Recharts.
