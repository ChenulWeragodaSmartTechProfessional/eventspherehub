# 🎓 EventSphere

## Your School. Your Events. One Place.

EventSphere is a **responsive web application for managing and discovering school events**, developed as a project for a web application competition.

Schools organize many events throughout the year, including debates, sports meets, exhibitions, competitions, ceremonies, and other activities. It can be difficult for students, teachers, and parents to keep track of all this information when it is distributed across different platforms.

EventSphere aims to solve this problem by providing a **centralized digital platform for school events**, allowing users to discover events, view event information, check upcoming dates, use an interactive calendar, see countdowns, and register for events.

---

# 🏆 Competition Challenge

The competition challenge asks participants to create a digital command center for school events.

The provided challenge describes a situation where:

> With dozens of events happening across the year—debates, sports meets, exhibitions—the administration is struggling to keep everyone updated.

The required platform should provide:

* Announcements and event pages
* Interactive calendars and countdowns
* Online registrations / ticketing
* Optional live event updates or highlights

The challenge is to create a **scalable, interactive system that can handle multiple events smoothly while maintaining a clean user experience**.

EventSphere was developed as a solution to this challenge.

---

# 💡 Our Solution

EventSphere brings school event information into one centralized web platform.

Instead of requiring users to search through multiple sources for event information, EventSphere provides a dedicated place where users can:

* 🏠 Access the school event platform
* 📅 Browse upcoming events
* 🗓️ Use an interactive calendar
* ⏳ View event countdowns
* 📢 Access event information
* 📝 Register for events
* 👤 Create an account or log in
* 📱 Use the platform on different screen sizes

The platform is designed with a clean, modern dark interface to make the application easy and comfortable to use.

---

# 🎯 Project Objectives

The main objectives of EventSphere are:

1. Create a centralized platform for school events.
2. Make event information easier to access.
3. Help students, teachers, and parents stay informed.
4. Provide an interactive event calendar.
5. Provide countdown functionality for upcoming events.
6. Provide online event registration.
7. Provide user registration and login functionality.
8. Create a responsive interface for mobile and desktop users.
9. Maintain a clean and simple user experience.
10. Create a foundation that can be expanded with additional event-management features.

---

# ✨ Features

## 🏠 Home Page

The EventSphere home page acts as the main entry point to the platform.

It provides navigation to the major sections of the application.

---

## 📅 Events

The Events section provides a dedicated area for school events.

Users can browse event information and access individual event-related content.

---

## 🗓️ Interactive Calendar

EventSphere includes an interactive calendar that allows users to view event dates in an organized calendar interface.

The calendar functionality is implemented using JavaScript.

### Main file

```
JS/calendar.js
```

### Calendar page

```
pages/calendar.html
```

### Calendar styling

```
CSS/calender.css
```

---

## ⏳ Event Countdown

Countdown functionality helps users see how much time remains until an upcoming event.

This makes upcoming events more visible and interactive.

Countdown and event-related functionality is handled through JavaScript.

---

## 📝 Event Registration

EventSphere includes a registration page that allows users to submit information for event participation.

### Registration page

```
pages/register.html
```

### Registration JavaScript

```
JS/register.js
```

### Registration styling

```
CSS/register.css
```

---

## 🔐 Login

The application includes a login interface for users.

### Login page

```
pages/login.html
```

### Login JavaScript

```
JS/login.js
```

### Login styling

```
CSS/login.css
```

---

## 📱 Responsive Design

EventSphere is designed to work across different screen sizes.

The interface is intended for:

* 📱 Mobile phones
* 📲 Tablets
* 💻 Laptops
* 🖥️ Desktop computers

Responsive CSS is used to adapt the layout to different devices.

---

## 🌙 Dark Theme

EventSphere includes a dedicated dark-theme stylesheet:

```
CSS/darktheme.css
```

This provides a consistent dark visual style across the application.

---

# 🛠️ Technologies Used

## HTML5

HTML5 is used to create the structure of the application.

It is used for:

* Web pages
* Navigation
* Forms
* Event sections
* Calendar page
* Login page
* Registration page
* Contact page

---

## CSS3 

CSS3 is used for the visual design and responsive layout.

The project uses separate CSS files for different sections of the application.

These include:

```
CSS/
├── calender.css
├── contact.css
├── darktheme.css
├── events.css
├── indexstyles.css
├── login.css
└── register.css
```

---

## JavaScript

JavaScript is used to provide interactive functionality.

The project contains:

```
JS/
├── calendar.js
├── events.js
├── index.js
├── login.js
└── register.js
```

JavaScript is used for functionality such as:

* Calendar interactions
* Event interactions
* Countdown functionality
* Login interactions
* Registration interactions
* Home page interactions

---

## 🖼️ Images

The project uses PNG images for the EventSphere branding.

```
Images/
├── favicon/
│   └── eventspherelogo.png
│
└── logo/
    └── eventspherelogo.png
```

---

## 🌐 Hosting

The EventSphere web application is hosted online using **Netlify**.

This allows the competition judges and users to access the application through a public URL without installing the project.

---

# 📂 Project Structure

```
EventSphere/
│
├── index.html
│
├── CSS/
│   ├── calender.css
│   ├── contact.css
│   ├── darktheme.css
│   ├── events.css
│   ├── indexstyles.css
│   ├── login.css
│   └── register.css
│
├── Images/
│   ├── favicon/
│   │   └── eventspherelogo.png
│   │
│   └── logo/
│       └── eventspherelogo.png
│
├── JS/
│   ├── calendar.js
│   ├── events.js
│   ├── index.js
│   ├── login.js
│   └── register.js
│
├── pages/
│   ├── about.html
│   ├── calendar.html
│   ├── contact.html
│   ├── events.html
│   ├── login.html
│   └── register.html
│
└── README.md
```

---

# 📄 Pages

| Page         | File                  | Purpose                           |
| ------------ | --------------------- | --------------------------------- |
| 🏠 Home      | `index.html`          | Main landing page                 |
| 📅 Events    | `pages/events.html`   | View school events                |
| 🗓️ Calendar | `pages/calendar.html` | Interactive event calendar        |
| ℹ️ About     | `pages/about.html`    | Information about EventSphere     |
| 📩 Contact   | `pages/contact.html`  | Contact section                   |
| 🔐 Login     | `pages/login.html`    | User login interface              |
| 📝 Register  | `pages/register.html` | Event/user registration interface |

---

# 🤖 AI Assistance

Artificial Intelligence was used as a **development assistance and learning tool** during the creation of EventSphere.

AI assistance was used for tasks such as:

* Understanding HTML, CSS, and JavaScript concepts
* Generating initial code ideas
* Improving website layouts
* Creating responsive CSS
* Developing interactive JavaScript functionality
* Debugging errors
* Finding solutions to development problems
* Improving the user interface
* Suggesting design improvements
* Reviewing code
* Improving project documentation

AI was used to support the development process rather than replace the developer's decision-making.

The developer was responsible for:

* Selecting the project concept
* Understanding the competition requirements
* Choosing the features
* Making design decisions
* Integrating the code
* Testing the application
* Identifying problems
* Making changes to the project
* Preparing the final competition submission

### AI-Assisted Development Process

```
Competition Requirements
          ↓
     Project Idea
          ↓
    Development
          ↓
   AI Assistance
          ↓
 Developer Review
          ↓
     Testing
          ↓
    Improvements
          ↓
  Final Application
```

---

# 🚀 How to Run the Project

EventSphere is a frontend web application built using HTML, CSS, and JavaScript.

No Node.js installation or package manager is required for the basic version of the project.

---

## Method 1 — Access the Online Version

The recommended way to use EventSphere for the competition is through the deployed website.

### 🌐 Live Demo

```
https://eventspherehub.netlify.app
```

Open the URL in a modern web browser.

No installation is required.

---

# 💻 Method 2 — Run Locally

## Step 1 — Download the Repository

Clone the GitHub repository:

```
git clone https://github.com/YOUR-USERNAME/EventSphere.git
```

Or download the repository as a ZIP file from GitHub.

---

## Step 2 — Extract the ZIP

If you downloaded a ZIP file:

1. Right-click the downloaded ZIP.
2. Select **Extract All**.
3. Open the extracted `EventSphere` folder.

---

## Step 3 — Open the Project

Open the project folder using a code editor.

Recommended:

**Visual Studio Code**

---

## Step 4 — Run the Website

### Option A — Open Directly

Open:

```
index.html
```

with a web browser.

---

### Option B — Use VS Code Live Server

For a better development experience:

1. Open EventSphere in Visual Studio Code.
2. Install the **Live Server** extension.
3. Open `index.html`.
4. Right-click inside the file.
5. Select **Open with Live Server**.
6. The website will open in your browser.

---

# 🧭 How to Use EventSphere

## 1. Open the Home Page

Start from the EventSphere home page.

```
index.html
```

Use the navigation menu to access different sections.

---

## 2. Explore Events

Navigate to:

```
Events
```

Browse the available school event information.

---

## 3. Check the Calendar

Open:

```
Calendar
```

Use the interactive calendar to view event dates.

---

## 4. Check Upcoming Events

Use the countdown functionality to see the remaining time until upcoming events.

---

## 5. Register

Navigate to the registration section and enter the required information.

---

## 6. Login

Users can access the login interface through:

```
pages/login.html
```

---

## 7. Learn About the Project

Visit the About page to learn more about EventSphere and its purpose.

---

## 8. Contact

Use the Contact page to access the project's contact information.

---

# 🌐 Deployment

The final EventSphere application is hosted online using Netlify.

The deployment process is:

```
EventSphere Project
       ↓
   Project Files
       ↓
     Netlify
       ↓
  Online Deployment
       ↓
   Public Website
```

This allows the competition judges to access the final application online.

---

# 🧪 Testing

The application should be tested on multiple screen sizes and browsers.

### Desktop

* Google Chrome
* Microsoft Edge
* Mozilla Firefox

### Mobile

The responsive layout should be tested on different mobile screen sizes.

### Important areas to test

* Navigation links
* Event pages
* Calendar
* Countdown
* Registration
* Login interface
* Contact page
* Responsive layout
* Images
* Buttons
* Forms

---

# 📊 Competition Requirement Coverage

EventSphere was developed based on the requirements provided by the competition organizers.

| Competition Requirement           | EventSphere Implementation      |
| --------------------------------- | ------------------------------- |
| Fully functional web application  | ✅ Web-based application         |
| Announcements / event information | ✅ Event information             |
| Event pages                       | ✅ Events page                   |
| Interactive calendar              | ✅ Interactive calendar          |
| Countdowns                        | ✅ Event countdown functionality |
| Online registration / ticketing   | ✅ Registration functionality    |
| Live event updates / highlights   | ✅ Optional future enhancement  |
| Clean user experience             | ✅ Responsive modern UI          |
| Multiple events                   | ✅ Event-based structure         |
| Hosted online                     | ✅ Netlify                       |
| README documentation              | ✅ This README                   |

> The optional live-update/highlight functionality can be added as a future enhancement if it is not part of the current version.

---

# 🔮 Future Improvements

Although the current version focuses on the core competition requirements, EventSphere can be expanded further.

Potential future features include:

* 🔴 Live event updates
* 📸 Event highlights and galleries
* 🔔 Notifications
* 📧 Email notifications
* 🎟️ Digital tickets
* 👨‍💼 Administrator dashboard
* 🔎 Event search and filtering
* 🏷️ Event categories
* 📊 Event analytics
* 👥 Advanced user roles
* ☁️ Cloud database integration
* 🏫 Support for multiple schools
* 📱 Progressive Web App (PWA)

---

# 📈 Scalability

The competition specifically highlights the challenge of creating a system that can handle multiple events smoothly.

EventSphere is structured so that additional events and functionality can be added without redesigning the entire application.

A future expanded architecture could contain:

```
EventSphere
│
├── Users
│   ├── Students
│   ├── Teachers
│   └── Parents
│
├── Events
│   ├── Sports
│   ├── Debates
│   ├── Exhibitions
│   ├── Competitions
│   └── Ceremonies
│
├── Calendar
│
├── Registrations
│
└── Announcements
```

This structure provides a foundation for developing EventSphere into a larger school event management system.

---

# 🌟 Why EventSphere?

School communities need an easy way to keep track of the many events happening throughout the academic year.

EventSphere brings those events together into a single digital platform.

Instead of searching through multiple sources, users can visit one platform to discover:

**What is happening? When is it happening? Where is it happening? How can I participate?**

That is the idea behind EventSphere.

---

# 🏆 Project Goal

The goal of EventSphere is to transform school-event communication from scattered information into a **centralized, interactive, and accessible digital experience**.

### EventSphere

> **Your School. Your Events. One Place.**

---

# 👨‍💻 Developer

**Chenul Weragoda**

EventSphere was developed as a **web application competition project**.

---

# 🙏 Acknowledgements

Thanks to:

* The competition organizers
* Teachers and mentors
* Web development documentation and learning resources
* Open-source resources
* Netlify
* AI development tools used during the development process

---

# 📜 License

This project was created for educational and competition purposes.

Please contact the developer before reusing or redistributing the project.

---

## 🚀 EventSphere

**Your School. Your Events. One Place.**

A centralized digital command center for school events.
