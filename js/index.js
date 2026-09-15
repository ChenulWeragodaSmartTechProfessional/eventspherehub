import { db } from "./firebase-config.js";
import { collection, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const menuBtn = document.getElementById("menuBtn");
const nav = document.querySelector(".nav");

if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
        nav.classList.toggle("active");

        menuBtn.textContent = nav.classList.contains("active") ? "✕" : "☰";
    });
}

const navLinks = document.querySelectorAll(".nav a");

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("active");
        menuBtn.textContent = "☰";
    });
});

const homeEvents = document.getElementById("homeFeaturedEvents");
if (homeEvents) {
    onSnapshot(collection(db, "events"), snapshot => {
        const events = snapshot.docs.map(eventDoc => ({ id: eventDoc.id, ...eventDoc.data() }))
            .sort((first, second) => String(first.date || "").localeCompare(String(second.date || "")))
        const eventCount = document.getElementById("homeEventCount");
        if (eventCount) eventCount.textContent = events.length;
        document.querySelectorAll("[data-category-count]").forEach(element => {
            const category = element.dataset.categoryCount;
            const count = events.filter(event => String(event.category || "").toLowerCase() === category).length;
            element.textContent = `${count} Events Listed`;
        });
        const featuredEvents = events.slice(0, 3);
        homeEvents.innerHTML = featuredEvents.map(event => `
            <article class="event-card">
                <div class="event-banner"><span class="event-tag">${event.category || "Event"}</span><div class="event-date-box"><strong>${event.date ? event.date.slice(8, 10) : "--"}</strong><span>${event.date ? new Date(`${event.date}T00:00:00`).toLocaleDateString("en-US", { month: "short" }).toUpperCase() : ""}</span></div></div>
                <div class="event-body"><h3>${event.title || "Untitled event"}</h3><p>${event.description || "No description provided."}</p><div class="event-meta"><span>◷ ${event.time || "Time to be announced"}</span><span>⌖ ${event.location || "Location to be announced"}</span></div><a class="event-card-btn" href="pages/events.html">View Event Details →</a></div>
            </article>`).join("");
    });
}

onSnapshot(collection(db, "users"), snapshot => {
    const userCount = document.getElementById("homeUserCount");
    if (userCount) userCount.textContent = snapshot.size;
});