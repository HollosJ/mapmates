const fs = require("fs");
const path = require("path");

const generateCountries = async () => {
  try {
    console.log("Fetching countries data...");

    // Fetch data from the API using the built-in fetch
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,ccn3,flags",
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch countries: ${response.statusText}`);
    }

    const countries = await response.json();

    // Simplify the data (adjust fields as needed)
    const simplifiedCountries = countries.map((country) => ({
      name: country.name.common,
      ccn3: country.ccn3,
      flag: country.flags.png,
    }));

    // Define the output path
    const outputPath = path.join(__dirname, "../public/countries.json");

    // Write the JSON data to the file system
    fs.writeFileSync(outputPath, JSON.stringify(simplifiedCountries, null, 2));

    console.log("countries.json has been successfully generated!");
  } catch (error) {
    console.error("Error generating countries.json:", error);
    process.exit(1); // Exit with a non-zero code on error
  }
};

// Execute the function
generateCountries();
