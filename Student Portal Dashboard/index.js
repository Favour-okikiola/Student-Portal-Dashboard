// LOGIN 
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // my login credentials 
    if (email === "favour@gmail.com" && password === "12345") {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("studentProfile", JSON.stringify({
            name: "Favour",
            email: email,
            department: "Computer Science",
            level: "500"
        }));
    alert(`Welcome back, ${email}! You have successfully logged in.`);

        window.location.href = "dashboard.html"; // to redirect me to the dashboard
    } else {
        document.getElementById("loginError").innerText =
        "Invalid email or password. Try again!";  // if you don't enter my fixed credential it will return invalid
    }
    });
}



//  DASHBOARD 

if (window.location.pathname.includes("dashboard.html")) {
    if (localStorage.getItem("isLoggedIn") !== "true") {
        window.location.href = "login.html"; // to force back to login
    }
}


// LOGOUT 
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.clear();
    alert("you have logged out!")
    window.location.href = "index.html";
  });

}


//  SIDEBAR NAVIGATION 
const links = document.querySelectorAll(".sidebar nav a");
const sections = document.querySelectorAll(".section");

links.forEach((link) => {
  link.addEventListener("click", (a) => {
    a.preventDefault();
    const sectionId = link.getAttribute("data-section");

    sections.forEach((sec) => sec.classList.remove("active"));
    if (sectionId) {
      document.getElementById(sectionId).classList.add("active");
    }
  });
});


// PROFILE SECTION 
function renderProfile() {
  const profile = JSON.parse(localStorage.getItem("studentProfile"));
  if (profile) {
    document.getElementById("profileDetails").innerHTML = `
      <p><strong>Name:</strong> ${profile.name}</p>
      <p><strong>Email:</strong> ${profile.email}</p>
      <p><strong>Department:</strong> ${profile.department}</p>
      <p><strong>Level:</strong> ${profile.level}</p>
    `;
  }
}
if (document.getElementById("profileDetails")) {
  renderProfile();
}

//  FOR MY EDIT PROFILE SECTION
const editBtn = document.getElementById("editProfileBtn");
const editForm = document.getElementById("editProfileForm");
const saveBtn = document.getElementById("saveProfileBtn");

if (editBtn) {
  editBtn.addEventListener("click", () => {
    editForm.classList.toggle("hidden");
    const profile = JSON.parse(localStorage.getItem("studentProfile"));
    document.getElementById("editName").value = profile.name;
    document.getElementById("editEmail").value = profile.email;
    document.getElementById("editDepartment").value = profile.department;
    document.getElementById("editLevel").value = profile.level;
  });
}

if (saveBtn) {
  saveBtn.addEventListener("click", () => {
    const updatedProfile = {
      name: document.getElementById("editName").value,
      email: document.getElementById("editEmail").value,
      department: document.getElementById("editDepartment").value,
      level: document.getElementById("editLevel").value,
    };
    localStorage.setItem("studentProfile", JSON.stringify(updatedProfile));
    renderProfile();
    alert("Your Credentials has been updated!")
    editForm.classList.add("hidden");
  });
}

//  MY COURSES SECTION
const coursesData = [
  { title: "Web Development", lecturer: "Prof. Godswill", schedule: "Mon - 10am" },
  { title: "AI & ML", lecturer: "Prof. Favour", schedule: "Wed - 2pm" },
  { title: "Everything IT Support", lecturer: "Prof. Noel", schedule: "Fri - 11am" },
];

const coursesList = document.getElementById("coursesList");
if (coursesList) {
  coursesData.forEach((course) => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <h3>${course.title}</h3>
      <p><strong>Lecturer:</strong> ${course.lecturer}</p>
      <p><strong>Schedule:</strong> ${course.schedule}</p>
    `;
    coursesList.appendChild(div);
  });
}

// MY ANNOUNCEMENTS SECTION
const announcementsData = [
  { text: "Siwes programme ends on the 26th of September", pinned: true },
  { text: "Project submission deadline has been extended to October 3rd", pinned: false },
  { text: "You are paying #5,000 for Prof. Noel class", pinned: false },
];

// const announcementsList = document.getElementById("announcementsList");
// if (announcementsList) {
//   announcementsData
//     .sort((a, b) => b.pinned - a.pinned)
//     .forEach((a) => {
//       const p = document.createElement("p");
//       p.textContent = a.text;
//       if (a.pinned) p.classList.add("pinned");
//       announcementsList.appendChild(p);
//     });
// }

const announcementsList = document.getElementById("announcementsList");
if (announcementsList) {
  announcementsData.forEach((announcement) => {
    const p = document.createElement("p");
    p.textContent = announcement.text;

    // Adding class based on true / false
    if (announcement.pinned) {
      p.classList.add("pinned-true");  
    } else {
      p.classList.add("pinned-false"); 
    }

    announcementsList.appendChild(p);
  });
}



// MY EVENTS SECTION
const eventsData = [
  { event: "TGIF 🎉", date: "2025-09-26" },
  { event: "End of Siwes Programme", date: "2025-09-26" },
  { event: "Project Deadline", date: "2025-09-26" },
];

const eventsList = document.getElementById("eventsList");
if (eventsList) {
  eventsData.forEach((element) => {
    const p = document.createElement("p");
    p.innerHTML = `<strong>${element.event}</strong> - ${element.date}`;
    eventsList.appendChild(p);
  });
}
