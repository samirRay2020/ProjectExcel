# 📗 Excel Clone – Web-Based Spreadsheet Application

This is a **browser-based Excel clone** built using **HTML, CSS, JavaScript, and jQuery**. It mimics core spreadsheet functionalities like **cell formatting, multiple sheets, text alignment, color customization**, and more — all from scratch without any external spreadsheet libraries!

---

## 🚀 Features

- 📄 **Dynamic Grid**: 20x20 editable cell grid with row and column headers
- 📝 **Cell Editing**: Double-click to enter data, single-click to select
- 🔤 **Text Styling**: Bold, Italic, Underline support
- 🎨 **Colors**:
  - Background color picker
  - Text color picker
- ✏️ **Font Control**:
  - Font family dropdown
  - Font size selector
- 📐 **Text Alignment**: Left, center, right alignment tools
- 📑 **Multiple Sheets**: Up to 4 separate sheets with data persistence
- 🔎 **Formula Bar**: Displays selected cell's coordinates and content
- 🧠 **Cell Data Structure**: Smart internal storage using a JavaScript object (`cellData`)
- 📁 **Menu Bar**: Simple navigation to File, Home, and Help sections

---

## 💻 Tech Stack

| Technology   | Usage                        |
|--------------|------------------------------|
| HTML         | Structure of the app         |
| CSS          | Styling grid and UI elements |
| JavaScript   | App logic, event handling    |
| jQuery       | DOM manipulation & UI control |

---


## 🧠 How It Works

- All cell states (text, style, color, alignment, etc.) are stored in a global JS object called `cellData`.
- Sheet tabs allow switching between up to 4 individual sheets.
- Style changes are applied via event listeners and updated in `cellData`.
- The grid is generated dynamically on page load.
- Formula bar reflects live cell content and position.

---

## Live Hosted Link - https://samirray2020.github.io/ProjectExcel/
