\// Import required modules
const fs = require('fs');
const csv = require('csv-parser');

// Function to read and process CSV file
function readCSV(filePath, filterCountry, outputFileName) {
    const writeStream = fs.createWriteStream(outputFileName);

    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
            // Check if the country matches the filter
            if (row.country.toLowerCase() === filterCountry.toLowerCase()) {
                // Write data to the output file
                writeStream.write(`${Object.values(row).join(',')}\n`);
            }
        })
        .on('end', () => {
            console.log(`Processing of ${filterCountry} data completed`);
            writeStream.end();
        });
}

// Function to delete file if exists
function deleteFileIfExists(filePath) {
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`${filePath} deleted`);
    }
}

// Main function
function main() {
    // Set file paths
    const inputFilePath = 'input_countries.csv';
    const canadaOutputFilePath = 'canada.txt';
    const usaOutputFilePath = 'usa.txt';

    // Delete existing files
    deleteFileIfExists(canadaOutputFilePath);
    deleteFileIfExists(usaOutputFilePath);

    // Read and process CSV for Canada
    readCSV(inputFilePath, 'canada', canadaOutputFilePath);

    // Read and process CSV for United States
    readCSV(inputFilePath, 'united states', usaOutputFilePath);
}

// Run the main function
main();
