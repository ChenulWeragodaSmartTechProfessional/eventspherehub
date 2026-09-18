import { db } from "./firebase-config.js";
import { collection, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const searchInput = document.getElementById("eventSearch");
const categoryButtons = document.querySelectorAll(".category-btn");
const featuredEvents = document.getElementById("featuredEvents");
const eventList = document.getElementById("eventList");
const noResults = document.getElementById("noResults");

const menuButton = document.getElementById("menuButton") || document.getElementById("menuBtn");
const nav = document.getElementById("nav");

const modal = document.getElementById("eventModal");
const modalOverlay = document.getElementById("modalOverlay");
const modalClose = document.getElementById("modalClose");

const modalCategory = document.getElementById("modalCategory");
const modalTitle = document.getElementById("modalTitle");
const modalDate = document.getElementById("modalDate");
const modalTime = document.getElementById("modalTime");
const modalLocation = document.getElementById("modalLocation");
const modalDescription = document.getElementById("modalDescription");

const calendarButton = document.getElementById("calendarButton");

let selectedCategory = "all";
let events = [];

function formatDate(dateValue) {
    if (!dateValue) return "Date to be announced";
    return new Date(`${dateValue}T00:00:00`).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
    });
}

function categoryClass(category) {
    const value = String(category || "other").toLowerCase();
    const aliases = {
        arts: "cultural",
        art: "cultural",
        club: "clubs",
        workshops: "workshop"
    };
    return aliases[value] || value.replace(/\s+/g, "-");
}

function renderEvents() {
    const searchTerm = searchInput.value.trim().toLowerCase();

    const visibleEvents = events.filter(event => {
        const category = categoryClass(event.category);
        const title = String(event.title || "").toLowerCase();

        return (selectedCategory === "all" || category === selectedCategory) &&
            (!searchTerm || title.includes(searchTerm) || category.includes(searchTerm));
    });

    featuredEvents.innerHTML = visibleEvents.slice(0, 3).map(event => `
        <article class="featured-card event-card" data-category="${categoryClass(event.category)}">

            <div class="event-image">
                ${event.imageUrl ? `
                    <img 
                        src="${event.imageUrl}" 
                        alt="${event.title || "Event image"}"
                        class="event-image-photo"
                        loading="lazy"
                        onerror="this.style.display='none'"
                    >
                ` : ""}

                <span class="event-category">${event.category || "Event"}</span>

                <div class="date-badge">
                    <strong>${event.date ? event.date.slice(8, 10) : "--"}</strong>
                    <span>
                        ${event.date
                            ? new Date(`${event.date}T00:00:00`)
                                .toLocaleDateString("en-US", { month: "short" })
                                .toUpperCase()
                            : ""}
                    </span>
                </div>
            </div>

            <div class="event-content">
                <h3>${event.title || "Untitled event"}</h3>

                <p>${event.description || "No description provided."}</p>

                <div class="event-info">
                    <span>◷ ${event.time || "Time to be announced"}</span>
                    <span>⌖ ${event.location || "Location to be announced"}</span>
                </div>

                <button class="details-button" data-event-id="${event.id}">
                    View Details <span>→</span>
                </button>
            </div>

        </article>
    `).join("");

    eventList.innerHTML = visibleEvents.slice(3).map(event => `
        <article class="list-event event-card" data-category="${categoryClass(event.category)}">

            <div class="list-date">
                <strong>${event.date ? event.date.slice(8, 10) : "--"}</strong>
                <span>
                    ${event.date
                        ? new Date(`${event.date}T00:00:00`)
                            .toLocaleDateString("en-US", { month: "short" })
                            .toUpperCase()
                        : ""}
                </span>
            </div>

            <div class="list-event-content">

                ${event.imageUrl ? `
                    <img 
                        src="${event.imageUrl}" 
                        alt="${event.title || "Event image"}"
                        class="list-event-image"
                        loading="lazy"
                        onerror="this.style.display='none'"
                    >
                ` : ""}

                <span class="small-category ${categoryClass(event.category)}">
                    ${event.category || "Event"}
                </span>

                <h3>${event.title || "Untitled event"}</h3>

                <p>${event.description || "No description provided."}</p>

                <div class="list-meta">
                    <span>◷ ${event.time || "Time to be announced"}</span>
                    <span>⌖ ${event.location || "Location to be announced"}</span>
                </div>

            </div>

            <button class="list-arrow" data-event-id="${event.id}" aria-label="View event details">
                →
            </button>

        </article>
    `).join("");

    noResults.classList.toggle("show", visibleEvents.length === 0);

    document.querySelectorAll("[data-event-id]").forEach(button => {
        button.addEventListener("click", () => {
            openModal(events.find(event => event.id === button.dataset.eventId));
        });
    });
}

    featuredEvents.innerHTML = visibleEvents.slice(0, 3).map(event => `
        <article class="featured-card event-card" data-category="${categoryClass(event.category)}">
            <div class="event-image">
                <span class="event-category">${event.category || "Event"}</span>
                <div class="date-badge"><strong>${event.date ? event.date.slice(8, 10) : "--"}</strong><span>${event.date ? new Date(`${event.date}T00:00:00`).toLocaleDateString("en-US", { month: "short" }).toUpperCase() : ""}</span></div>
            </div>
            <div class="event-content">
                <h3>${event.title || "Untitled event"}</h3>
                <p>${event.description || "No description provided."}</p>
                <div class="event-info"><span>◷ ${event.time || "Time to be announced"}</span><span>⌖ ${event.location || "Location to be announced"}</span></div>
                <button class="details-button" data-event-id="${event.id}">View Details <span>→</span></button>
            </div>
        </article>`).join("");

    eventList.innerHTML = visibleEvents.slice(3).map(event => `
        <article class="list-event event-card" data-category="${categoryClass(event.category)}">
            <div class="list-date"><strong>${event.date ? event.date.slice(8, 10) : "--"}</strong><span>${event.date ? new Date(`${event.date}T00:00:00`).toLocaleDateString("en-US", { month: "short" }).toUpperCase() : ""}</span></div>
            <div class="list-event-content"><span class="small-category ${categoryClass(event.category)}">${event.category || "Event"}</span><h3>${event.title || "Untitled event"}</h3><p>${event.description || "No description provided."}</p><div class="list-meta"><span>◷ ${event.time || "Time to be announced"}</span><span>⌖ ${event.location || "Location to be announced"}</span></div></div>
            <button class="list-arrow" data-event-id="${event.id}" aria-label="View event details">→</button>
        </article>`).join("");

    noResults.classList.toggle("show", visibleEvents.length === 0);
    document.querySelectorAll("[data-event-id]").forEach(button => {
        button.addEventListener("click", () => openModal(events.find(event => event.id === button.dataset.eventId)));
    });
}

function openModal(event) {
    if (!event) return;
    modalCategory.textContent = event.category || "Event";
    modalTitle.textContent = event.title || "Untitled event";
    modalDate.textContent = formatDate(event.date);
    modalTime.textContent = event.time || "Time to be announced";
    modalLocation.textContent = event.location || "Location to be announced";
    modalDescription.textContent = event.description || "No description provided.";
    modal.classList.add("show");
    document.body.classList.add("modal-open");
}

categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
        categoryButtons.forEach(item => {
            item.classList.remove("active");
        });

        button.classList.add("active");
        selectedCategory = button.dataset.category;

        renderEvents();
    });
});

searchInput.addEventListener("input", renderEvents);

function closeModal() {
    modal.classList.remove("show");
    document.body.classList.remove("modal-open");
}

modalClose.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", closeModal);

document.addEventListener("keydown", event => {
    if (event.key === "Escape" && modal.classList.contains("show")) {
        closeModal();
    }
});

if (menuButton) {
    menuButton.addEventListener("click", () => {
        nav.classList.toggle("active");
        nav.classList.toggle("mobile-open");
        menuButton.textContent = nav.classList.contains("active") ? "✕" : "☰";
    });
}

document.querySelectorAll(".nav a").forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("active");
        nav.classList.remove("mobile-open");
        if (menuButton) menuButton.textContent = "☰";
    });
});


onSnapshot(collection(db, "events"), snapshot => {
    events = snapshot.docs.map(eventDoc => ({ id: eventDoc.id, ...eventDoc.data() }))
        .sort((first, second) => String(first.date || "").localeCompare(String(second.date || "")));
    renderEvents();
}, error => {
    console.error("Unable to load events:", error);
    renderEvents();
});
