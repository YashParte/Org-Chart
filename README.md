# Organization Chart

A lightweight, browser-based organization chart for importing employee data, exploring reporting lines, and maintaining a people directory. It runs without a build step or backend.

## Getting started

Open `index.html` in a modern browser. You can also serve this folder with any static web server. No package installation is required.

The app starts with a sample organization. Use **Import data** to replace it with your own employee file, or edit the sample in the people directory.

## Import an employee file

Choose **Excel template** to download a blank `.xlsx` workbook with the supported column headers. Fill in one employee per row, then choose **Import data** to load the workbook. CSV files with the same headers are also supported. Legacy `.xls` files are not supported; save them as `.xlsx` or CSV first.

The import replaces the current people list after confirmation. Employee ID and Name are required. Other fields may be left blank. Employee IDs should be unique, and any Reporting Manager ID in the file must refer to an employee included in that file.

Use these headers in this order, or keep the template's header row:

| Column | Required | Notes |
| --- | --- | --- |
| Employee ID | Yes | Unique identifier for the employee. |
| Name | Yes | Employee's name. |
| Designation | No | Job title or role. |
| Date of Joining | No | Excel dates or readable date values are accepted. |
| Age | No | Employee age. |
| Gender | No | Free-form value. |
| Reporting manager | No | Manager's name. |
| Reporting Manager ID | No | Manager's Employee ID; this field connects people in the chart. |
| Zone | No | Geographic zone or region. |
| Location | No | Office or work location. |
| Cost center | No | Finance or cost-center code. |
| Department | No | Department name. |
| group | No | Group name. |
| Sub-group | No | Sub-group name. |
| Status | No | For example, Active, On leave, Inactive, or Vacant. Defaults to Active when blank. |

The importer also recognizes common variations such as `Manager ID`, `Manager`, `Joining date`, `Cost centre`, and `Subgroup`.

## Working with the chart

- Choose any employee as the chart's top node.
- Search for people and filter by Department, Zone, Group, Sub-group, or Status. Filters can be combined.
- Use **Card fields** to choose which employee details appear on chart cards.
- Collapse or expand reporting branches, adjust zoom, or use **Fit** to bring the chart into view. Use **Focus** to hide the surrounding page controls and expand the chart across the right workspace; press `Esc` or choose **Exit focus** to return.
- Select a chart card or use the people directory to edit all employee fields. You can also add or delete people.
- Export the directory as CSV.
- Choose **Export PDF**, then select **Save as PDF** in the browser's print dialog. The print layout is landscape and fits the selected chart onto one page.

## Workspace and saved data

Click the workspace name in the sidebar to rename it. The workspace name, people records, and sidebar collapsed state are saved in the current browser using local storage. Data is not synchronized between browsers or devices.

## Project files

- `index.html` — app structure and dialogs.
- `styles.css` — layout, chart, responsive behavior, and print styles.
- `app.js` — employee data, chart rendering, Excel/CSV import, and export behavior.
