import { db } from "./firebase-config.js";
import { collection, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const calendarGrid = document.getElementById("calendarGrid");
const monthYear = document.getElementById("monthYear");
const selectedDateText = document.getElementById("selectedDateText");
const panelDate = document.getElementById("panelDate");
const dayEvents = document.getElementById("dayEvents");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const todayBtn = document.getElementById("todayBtn");

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

let events = [];

const today = new Date();
let currentDate = new Date(today.getFullYear(), today.getMonth(), 1);
let selectedDate = formatDate(today);

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function formatDisplayDate(dateString) {
    const date = new Date(`${dateString}T00:00:00`);

    return date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
    });
}

function renderCalendar() {
    calendarGrid.innerHTML = "";

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    monthYear.textContent = currentDate.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric"
    });

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const previousMonthDays = new Date(year, month, 0).getDate();

    for (let i = firstDay - 1; i >= 0; i--) {
        const day = previousMonthDays - i;

        const cell = createDayCell(
            day,
            new Date(year, month - 1, day),
            true
        );

        calendarGrid.appendChild(cell);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);

        const cell = createDayCell(
            day,
            date,
            false
        );

        calendarGrid.appendChild(cell);
    }

    const totalCells = calendarGrid.children.length;
    const remaining = 42 - totalCells;

    for (let day = 1; day <= remaining; day++) {
        const cell = createDayCell(
            day,
            new Date(year, month + 1, day),
            true
        );

        calendarGrid.appendChild(cell);
    }

    updateSelectedDate();
}

function createDayCell(day, date, otherMonth) {
    const cell = document.createElement("div");
    cell.className = "calendar-day";

    const dateString = formatDate(date);

    if (otherMonth) {
        cell.classList.add("other-month");
    }

    if (dateString === formatDate(today)) {
        cell.classList.add("today");
    }

    if (dateString === selectedDate) {
        cell.classList.add("selected");
    }

    const number = document.createElement("div");
    number.className = "day-number";
    number.textContent = day;

    cell.appendChild(number);

    const dayEventsList = events.filter(event => event.date === dateString);

    if (dayEventsList.length > 0) {
        const dots = document.createElement("div");
        dots.className = "event-dots";

        dayEventsList.slice(0, 3).forEach(event => {
            const dot = document.createElement("div");
            dot.className = `event-dot ${event.category}`;
            dots.appendChild(dot);
        });

        cell.appendChild(dots);
    }

    cell.addEventListener("click", () => {
        selectedDate = dateString;

        if (otherMonth) {
            currentDate = new Date(
                date.getFullYear(),
                date.getMonth(),
                1
            );

            renderCalendar();
        } else {
            updateSelectedDate();
        }
    });

    return cell;
}

function updateSelectedDate() {
    selectedDateText.textContent = formatDisplayDate(selectedDate);
    panelDate.textContent = formatDisplayDate(selectedDate);

    const selectedEvents = events.filter(
        event => event.date === selectedDate
    );

    if (selectedEvents.length === 0) {
        dayEvents.innerHTML = `
            <div class="empty-state">
                <div>📌</div>
                <p>No events scheduled for this date</p>
            </div>
        `;

        return;
    }

    dayEvents.innerHTML = selectedEvents.map(event => `
        <div class="event-item">
            <span class="event-category ${event.category}">
                ${event.categoryName}
            </span>

            <h4>${event.title}</h4>

            <p>🕐 ${event.time || "Time to be announced"}</p>
            <p>📍 ${event.location || "Location to be announced"}</p>
        </div>
    `).join("");
}

prevBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

todayBtn.addEventListener("click", () => {
    currentDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        1
    );

    selectedDate = formatDate(today);

    renderCalendar();
});

if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => nav.classList.toggle("active"));
}

onSnapshot(collection(db, "events"), snapshot => {
    events = snapshot.docs.map(eventDoc => {
        const event = eventDoc.data();
        return { id: eventDoc.id, ...event, categoryName: event.category || "Event" };
    });
    renderCalendar();
}, error => {
    console.error("Unable to load calendar events:", error);
    renderCalendar();
});