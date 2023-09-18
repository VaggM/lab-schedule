const fs = require("fs");
const xlsx = require("xlsx");
const dotenv = require("dotenv");
dotenv.config();

const get_schedule = (req, res) => {
  const schedulePath = process.env.DATA_FOLDER + "/schedule.xlsx";

  if (!schedulePath) {
    return res
      .status(500)
      .send({ error: "SCHEDULE_PATH not specified in .env" });
  }

  try {
    // Read the Excel file
    const workbook = xlsx.readFile(schedulePath);

    // Assuming the Excel file has only one sheet, you can change this if needed
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const classes = readClasses(worksheet);

    return res.status(200).send({ classes });
  } catch (error) {
    return res.status(500).send({ error: "Error on excel read" });
  }
};

const readClasses = (worksheet) => {
  const mergedCells = worksheet["!merges"] || [];
  const classes = [];
  let idCounter = 0;

  const maxRow = xlsx.utils.decode_range(worksheet["!ref"]).e.r;
  const maxCol = xlsx.utils.decode_range(worksheet["!ref"]).e.c;

  for (let col = 0; col <= maxCol; col++) {
    for (let row = 0; row <= maxRow; row++) {
      const cellAddress = xlsx.utils.encode_cell({ r: row, c: col });
      const cell = worksheet[cellAddress];

      if (cell) {
        const cellValue = cell.v;

        if (cellValue.includes("\n")) {
          let rowspan = 1;

          mergedCells.forEach((range) => {
            const { s, e } = range;
            const startRow = s.r;
            const endRow = e.r;
            const startCol = s.c;
            const endCol = e.c;

            if (
              row >= startRow &&
              row <= endRow &&
              col >= startCol &&
              col <= endCol
            ) {
              rowspan = endRow - startRow + 1;
            }
          });

          const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

          const startTime = row + 7;
          const startTimeStr = startTime.toString().padStart(2, "0");
          const endTime = row + 7 + rowspan;

          const timeRange = `${startTimeStr}:00 - ${endTime}:00`;
          const lines = cellValue.split("\n");

          classes.push({
            id: idCounter++,
            day: days[col - 1],
            time: timeRange,
            title: lines[0],
            professor: lines[1],
          });
        }
      }
    }
  }

  return classes;
};

module.exports = {
  get_schedule,
};
