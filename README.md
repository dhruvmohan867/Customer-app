# CustomerApp

A sleek and intuitive **Customer Management** application built with Angular and Angular Material. It allows users to **view**, **create**, **edit**, and **delete** customers via a clean,
responsive UI—plus it's themable with light, dark, and system modes.

---

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development](#development)
- [Usage](#usage)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

---

## Features

- Landing **Hero Section** with quick access buttons: *View Customers*, *Add Customer*
- Fully **responsive UI** using Angular Material and custom theming
- **Dark / Light / System theme toggle**, with persistent user preference
- **Placeholder action handler**: buttons without functionality show a snack notification prompting navigation
- Smooth **toolbar navigation** across Home, Customers, and Create views

---

## Demo

*(Replace with your live app link or GIF)*  
![App Demo](assets/images/demo.gif)

---

## Technologies

- **Framework**: Angular (Standalone components)  
- **UI Library**: Angular Material  
- **Tooling**: Vite or Angular CLI  
- **Languages**: TypeScript & SCSS/CSS 

---

## Getting Started

### Prerequisites

- Node.js (>=14.x recommended)  
- npm (comes with Node)  
- Git

### Installation


# Clone the repo
```bash
git clone https://github.com/your-username/CustomerApp.git
cd CustomerApp/frontend
```


# Install dependencies
```bash
npm install
```

# Development
```bash
npm run start
# or if you use Angular CLI:
ng serve --open
```
---

- Open http://localhost:4200  n your browser.

---

# Usage
- Navigate via the toolbar: Home, Customers, Create
- Theme toggle (top-right) cycles through:
     -System (default)
     -Light
     -Dark
-Click View Customers or Add Customer on the hero to navigate directly
-Buttons without assigned functionality trigger a helpful snackbar prompt

---

# Configuration

-Material Theme: Edit src/styles.css or angular.json
-API Endpoints: If applicable, update in environment.ts
-Placeholder Routing: Handled via PlaceholderActionDirective, customize the behavior as needed
-Theme Storage: User preference stored in localStorage and respects system color scheme

---

# Contributing
 -Contributions are welcome! Please follow these steps:
       -Fork the repo
       -Create a feature branch

  ```bash
    git checkout -b feature/YourFeature
    git commit -m "Add AwesomeFeature"
    git push origin feature/YourFeature
  ```
---

# License
Distributed under the MIT License. See LICENSE for details.
  


