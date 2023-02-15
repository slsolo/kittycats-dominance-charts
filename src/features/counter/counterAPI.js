export function fetchSpreadsheetData() {
  return fetch(`https://content-sheets.googleapis.com/v4/spreadsheets/${process.env.REACT_APP_SPREADSHEET_ID}?ranges=Fur!B2:B&ranges=Eyes!B2:B&ranges=Tails!A2:A&ranges=Ears!A2:A&ranges=Other!F3:F&includeGridData=true&key=${process.env.REACT_APP_AUTH_KEY}`
)
}
