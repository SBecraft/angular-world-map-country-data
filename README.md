# WESTERN GOVERNORS UNIVERSITY 
## D280A – JAVASCRIPT PROGRAMMING
**Student ID**:  011607384
## World Map - Country Data Angular Project
This Angular application presents an interactive SVG world map that displays detailed country information upon selection. When a country is clicked and highlighted, the application connects to the World Bank API to retrieve and display the country's name, capital city, region, income level, population, and GDP per capita. The SVG world map and country data sections are both built as standalone Angular components and are loaded into the homepage component for display. There is only one page in the application, found at the /home URL. The application is compatible with both mouse and trackpad input.
### Project Configuration Details
- **Angular CLI:**  21.1.4
- **Node:**  24.13.0
- **Package Manager:**  npm 11.8.0
- **OS:**  win32 x64
- **Angular:**  21.1.4
 
![Homepage Screenshot](public/D280_Angular_Project_Screenshot.png)

### Methods

**`world-map.ts`**
- `ngOnInit()` — loads the SVG on startup
- `onMapClick()` — handles country click
- `onMapHover()` — handles mouse hover
- `onMapLeave()` — handles mouse leaving the map

**`homepage.ts`**
- `loadCountry()` — called when a country is clicked, fetches data from the World Bank API service

**`world-bank-api.service.ts`**
- `getCountryData()` — makes the 3 API calls for country name, capital city, region, income level, population, GDP, and returns the results
- `checkIfDone()` — counts when all 3 calls finish to display all data at once

**`country-data.ts`**
- No methods — it only has `@Input()` properties, it just receives and displays data
