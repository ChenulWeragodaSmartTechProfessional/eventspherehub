import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { collection, doc, getDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const ADMIN_EMAIL = "ideas.by.chen@gmail.com";
const userName = document.getElementById("userName");
const rolePill = document.getElementById("rolePill");
const dashboardIntro = document.getElementById("dashboardIntro");
const rolePanelTitle = document.getElementById("rolePanelTitle");
const rolePanelText = document.getElementById("rolePanelText");
const roleActions = document.getElementById("roleActions");
const accountName = document.getElementById("accountName");
const accountEmail = document.getElementById("accountEmail");
const eventFeed = document.getElementById("eventFeed");
const signOutButton = document.getElementById("signOutButton");
const menuButton = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

function escapeHtml(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function formatDate(dateValue) {
    if (!dateValue) return { day: "--", month: "TBA" };
    const date = new Date(`${dateValue}T00:00:00`);
    return {
        day: dateValue.slice(8, 10),
        month: date.toLocaleDateString("en-US", { month: "short" }).toUpperCase()
    };
}

function roleCopy(role, user) {
    const copy = {
        student: {
            intro: "Keep up with activities, competitions, and opportunities across your school.",
            title: "Student hub",
            text: "Discover events and keep your school calendar within reach.",
            actions: [{ label: "Explore events", href: "events.html" }, { label: "Open calendar", href: "calendar.html" }]
        },
        teacher: {
            intro: "Coordinate school activities and stay close to the events you support.",
            title: "Teacher tools",
            text: "Browse the schedule, then request admin privileges if you need to publish or manage events.",
            actions: [{ label: "Explore events", href: "events.html" }, { label: "Request admin privileges", href: `mailto:${ADMIN_EMAIL}?subject=EventSphere%20admin%20privilege%20request&body=${encodeURIComponent(`Hello,\n\nI am ${user.displayName || user.email} and I would like to request teacher admin privileges for EventSphere.\n\nThank you.`)}` }]
        },
        parent: {
            intro: "See what is happening at school and plan around the moments that matter to your family.",
            title: "Parent view",
            text: "Follow upcoming activities and use the calendar to stay informed.",
            actions: [{ label: "Explore events", href: "events.html" }, { label: "Open calendar", href: "calendar.html" }]
        }
    };
    return copy[role] || copy.student;
}

function renderRole(role, user) {
    const content = roleCopy(role, user);
    userName.textContent = user.displayName || user.email.split("@")[0];
    rolePill.textContent = role;
    dashboardIntro.textContent = content.intro;
    rolePanelTitle.textContent = content.title;
    rolePanelText.textContent = content.text;
    accountName.textContent = user.displayName || "EventSphere member";
    accountEmail.textContent = user.email;
    roleActions.innerHTML = content.actions.map(action => `<a class="role-action" href="${action.href}">${escapeHtml(action.label)}</a>`).join("");
}

function renderEvents(snapshot) {
    const events = snapshot.docs.map(eventDoc => ({ id: eventDoc.id, ...eventDoc.data() }))
        .filter(event => event.date)
        .sort((first, second) => String(first.date).localeCompare(String(second.date)))
        .slice(0, 5);

    if (!events.length) {
        eventFeed.innerHTML = '<p class="empty-state">No dated events are available yet.</p>';
        return;
    }

    eventFeed.innerHTML = events.map(event => {
        const date = formatDate(event.date);
        return `<article class="event-row"><div class="event-row-date"><strong>${escapeHtml(date.day)}</strong>${escapeHtml(date.month)}</div><div><h3>${escapeHtml(event.title || "Untitled event")}</h3><p>${escapeHtml(event.location || "Location to be announced")}</p></div><a class="event-row-link" href="events.html">View</a></article>`;
    }).join("");
}

signOutButton.addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "login.html";
});

if (menuButton) {
    menuButton.addEventListener("click", () => {
        nav.classList.toggle("active");
        menuButton.textContent = nav.classList.contains("active") ? "Close" : "Menu";
    });
}

onAuthStateChanged(auth, async user => {
    if (!user) {
        window.location.href = "login.html";
        return;
    }

    try {
        const profileSnapshot = await getDoc(doc(db, "users", user.uid));
        const role = profileSnapshot.exists() ? String(profileSnapshot.data().role || "student").toLowerCase() : "student";
        renderRole(["student", "teacher", "parent"].includes(role) ? role : "student", user);
    } catch (error) {
        console.error("Unable to load user profile:", error);
        renderRole("student", user);
    }
});

onSnapshot(collection(db, "events"), renderEvents, error => {
    console.error("Unable to load dashboard events:", error);
    eventFeed.innerHTML = '<p class="empty-state">Events are temporarily unavailable.</p>';
});
