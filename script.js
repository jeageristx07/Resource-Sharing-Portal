/* ==========================================================
   PROJECT TITLE: Classroom Resource Sharing Portal
   FILE: java.js
   CONTRIBUTOR: Group Member 3 (Registration No: RK4P26VWB56)
   RESPONSIBILITY: JavaScript Interactivity, State Management & Event Handling
   ========================================================== */

// ----------------------------------------------------------
// 1. Official Course Codes & Subject Mapping
// ----------------------------------------------------------
const COURSE_CATALOG = {
  CSE111: "Orientation to computing",
  MEC136: "Engineering Drawing and Autocad",
  INT108: "Python",
  CSE326: "Internet Programming",
  INT335: "Design Thinking",
  MTH165: "Engineering Mathematics"
};

// ----------------------------------------------------------
// 2. Initial Sample Dataset (Covering all 6 requested subjects)
// ----------------------------------------------------------
const DEFAULT_RESOURCES = [
  {
    id: 1,
    courseCode: "CSE111",
    subjectName: "Orientation to computing",
    title: "Computer Architecture & Number Systems Complete Notes",
    category: "Notes",
    format: "PDF • 2.6 MB",
    author: "Ayush (RK4P26VWB54)",
    date: "2026-10-15",
    description: "Comprehensive notes on Von Neumann architecture, binary/hex conversions, and basic logic gates.",
    rating: 5,
    downloads: 48,
    bookmarked: true,
    status: "approved"
  },
  {
    id: 2,
    courseCode: "MEC136",
    subjectName: "Engineering Drawing and Autocad",
    title: "Orthographic & Isometric Projections Sheet Practice Guide",
    category: "Templates",
    format: "DWG / PDF • 4.2 MB",
    author: "Group RK4P26VWB55",
    date: "2026-10-18",
    description: "Standard layout drawing sheets with step-by-step CAD command references and 3D angle views.",
    rating: 4,
    downloads: 36,
    bookmarked: false,
    status: "approved"
  },
  {
    id: 3,
    courseCode: "INT108",
    subjectName: "Python",
    title: "Python Lab Solutions: Data Structures & OOP Concepts",
    category: "Assignments",
    format: "ZIP / IPYNB • 1.8 MB",
    author: "Coder (RK4P26VWB56)",
    date: "2026-10-21",
    description: "Solved laboratory assignments including dictionaries, file handling, exception handling, and classes.",
    rating: 5,
    downloads: 72,
    bookmarked: true,
    status: "approved"
  },
  {
    id: 4,
    courseCode: "CSE326",
    subjectName: "Internet Programming",
    title: "Modern HTML5, CSS3 Flexbox & DOM Scripting Cheatsheet",
    category: "Links",
    format: "Interactive Web Link",
    author: "Web Team",
    date: "2026-10-24",
    description: "Handy quick reference links for semantic markup, CSS responsive media queries, and JS DOM events.",
    rating: 5,
    downloads: 89,
    bookmarked: false,
    status: "approved"
  },
  {
    id: 5,
    courseCode: "INT335",
    subjectName: "Design Thinking",
    title: "Empathy Map, Ideation & Prototype Canvas Templates",
    category: "Templates",
    format: "PPTX • 3.5 MB",
    author: "Design Club",
    date: "2026-10-26",
    description: "Standard 5-step Design Thinking toolkit for problem definition, persona interviews, and low-fidelity prototypes.",
    rating: 4,
    downloads: 29,
    bookmarked: false,
    status: "approved"
  },
  {
    id: 6,
    courseCode: "MTH165",
    subjectName: "Engineering Mathematics",
    title: "Differential Calculus & Linear Algebra 5-Year Solved PYQs",
    category: "PYQs",
    format: "PDF • 5.1 MB",
    author: "Prof. Sharma",
    date: "2026-10-28",
    description: "Past end-term question papers with complete step-by-step solutions for Eigenvalues, Rank, and Taylor Series.",
    rating: 5,
    downloads: 114,
    bookmarked: true,
    status: "approved"
  },
  {
    id: 7,
    courseCode: "CSE326",
    subjectName: "Internet Programming",
    title: "JavaScript ES6 Fetch API & Async/Await Guide",
    category: "Notes",
    format: "PDF • 1.4 MB",
    author: "Student Council",
    date: "2026-10-29",
    description: "Handwritten notes explaining Promises, Fetch API, and Event Bubbling in web browsers.",
    rating: 4,
    downloads: 15,
    bookmarked: false,
    status: "pending" // Pending moderation example
  }
];

// ----------------------------------------------------------
// 3. Application State
// ----------------------------------------------------------
let resources = loadSavedResources();
let activeTab = "approved"; // Options: 'approved', 'bookmarks', 'moderation'

// Helper: Load from localStorage or use default dataset
function loadSavedResources() {
  try {
    const saved = localStorage.getItem("portal_resources");
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (err) {
    console.warn("LocalStorage access issue; using defaults.", err);
  }
  return DEFAULT_RESOURCES;
}

// Helper: Save state to localStorage
function persistResources() {
  try {
    localStorage.setItem("portal_resources", JSON.stringify(resources));
  } catch (err) {
    console.warn("Could not save to localStorage", err);
  }
}

// ----------------------------------------------------------
// 4. Portal Renderer & DOM Population
// ----------------------------------------------------------
function renderPortal() {
  const searchQuery = document.getElementById("searchInput").value.trim().toLowerCase();
  const selectedCourse = document.getElementById("courseFilter").value;
  const selectedCategory = document.getElementById("categoryFilter").value;
  const gridContainer = document.getElementById("resourceGrid");

  // Calculate & Update Dashboard Statistics
  const approvedItems = resources.filter(r => r.status === "approved");
  const bookmarkedItems = resources.filter(r => r.bookmarked && r.status === "approved");
  const pendingItems = resources.filter(r => r.status === "pending");
  const totalDownloadsCount = resources.reduce((total, r) => total + (r.downloads || 0), 0);

  document.getElementById("statTotal").textContent = approvedItems.length;
  document.getElementById("statBookmarks").textContent = bookmarkedItems.length;
  document.getElementById("statPending").textContent = pendingItems.length;
  document.getElementById("statDownloads").textContent = totalDownloadsCount;

  document.getElementById("countApproved").textContent = approvedItems.length;
  document.getElementById("countBookmarks").textContent = bookmarkedItems.length;
  document.getElementById("countModeration").textContent = pendingItems.length;

  // Filter based on active tab
  let displayList = resources.filter(item => {
    if (activeTab === "approved") {
      return item.status === "approved";
    } else if (activeTab === "bookmarks") {
      return item.bookmarked && item.status === "approved";
    } else if (activeTab === "moderation") {
      return item.status === "pending";
    }
    return true;
  });

  // Filter by Selected Course Code
  if (selectedCourse !== "ALL") {
    displayList = displayList.filter(item => item.courseCode === selectedCourse);
  }

  // Filter by Selected Category
  if (selectedCategory !== "ALL") {
    displayList = displayList.filter(item => item.category === selectedCategory);
  }

  // Filter by Search Query (searches title, subject name, course code, and description)
  if (searchQuery) {
    displayList = displayList.filter(item => {
      const matchString = `${item.title} ${item.courseCode} ${item.subjectName} ${item.description} ${item.author}`.toLowerCase();
      return matchString.includes(searchQuery);
    });
  }

  // Handle Empty State
  if (displayList.length === 0) {
    gridContainer.innerHTML = `
      <div class="empty-state">
        <h4>No Resources Found</h4>
        <p>No resources match your current tab, search term, or filter criteria.</p>
      </div>
    `;
    return;
  }

  // Generate Resource Card HTML
  gridContainer.innerHTML = displayList.map(item => {
    const categoryClass = getCategoryBadgeClass(item.category);

    return `
      <article class="resource-card">
        <div>
          <div class="card-top">
            <span class="code-tag">${item.courseCode}</span>
            <span class="category-tag ${categoryClass}">${item.category}</span>
          </div>

          <h3 class="card-title">${escapeHtml(item.title)}</h3>
          <div class="card-subject">📚 ${escapeHtml(item.subjectName)}</div>
          <p class="card-description">${escapeHtml(item.description)}</p>

          <div class="card-metadata">
            <div class="metadata-row">
              <span><strong>Format:</strong> ${escapeHtml(item.format)}</span>
              <span><strong>Shared By:</strong> ${escapeHtml(item.author)}</span>
            </div>
            <div class="metadata-row">
              <span><strong>Date:</strong> ${item.date || "Recent"}</span>
              <span><strong>Status:</strong> ${item.status === "pending" ? '<span class="status-pill status-pending">Pending</span>' : 'Verified'}</span>
            </div>
          </div>
        </div>

        <div>
          <!-- Star Rating Component -->
          <div class="rating-section">
            <span>Rating: <strong>${item.rating} / 5</strong></span>
            <div class="star-interactive" title="Click a star to rate">
              ${[1, 2, 3, 4, 5].map(starNum => `
                <span class="star ${starNum <= item.rating ? 'active' : ''}" onclick="rateResource(${item.id}, ${starNum})">★</span>
              `).join("")}
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="card-actions">
            ${item.status === "pending" ? `
              <button class="btn btn-approve" onclick="approveResource(${item.id})">✔ Approve</button>
              <button class="btn btn-reject" onclick="rejectResource(${item.id})">✖ Reject</button>
            ` : `
              <button class="btn btn-bookmark ${item.bookmarked ? 'bookmarked' : ''}" onclick="toggleBookmark(${item.id})">
                ${item.bookmarked ? '⭐ Saved' : '☆ Bookmark'}
              </button>
              <button class="btn btn-download" onclick="downloadResource(${item.id})">
                ⬇ Download (${item.downloads})
              </button>
            `}
          </div>
        </div>
      </article>
    `;
  }).join("");
}

// ----------------------------------------------------------
// 5. Interactive Actions & Event Handlers
// ----------------------------------------------------------

// Switch Active Navigation Tab
function switchTab(tabName) {
  activeTab = tabName;
  document.getElementById("tabApproved").classList.toggle("active", tabName === "approved");
  document.getElementById("tabBookmarks").classList.toggle("active", tabName === "bookmarks");
  document.getElementById("tabModeration").classList.toggle("active", tabName === "moderation");
  renderPortal();
}

// Toggle Resource Bookmark
function toggleBookmark(id) {
  const item = resources.find(r => r.id === id);
  if (item) {
    item.bookmarked = !item.bookmarked;
    persistResources();
    renderPortal();
    showToast(item.bookmarked ? `Saved "${item.title}" to bookmarks!` : `Removed from bookmarks.`);
  }
}

// Simulate Resource Download & Track Download Counter
function downloadResource(id) {
  const item = resources.find(r => r.id === id);
  if (item) {
    item.downloads = (item.downloads || 0) + 1;
    persistResources();
    renderPortal();
    showToast(`Downloading "${item.title}"... Total downloads: ${item.downloads}`);
  }
}

// Rate a Resource (1 to 5 Stars)
function rateResource(id, ratingValue) {
  const item = resources.find(r => r.id === id);
  if (item) {
    item.rating = ratingValue;
    persistResources();
    renderPortal();
    showToast(`Rated "${item.title}" with ${ratingValue} stars!`);
  }
}

// Moderation: Approve pending resource
function approveResource(id) {
  const item = resources.find(r => r.id === id);
  if (item) {
    item.status = "approved";
    persistResources();
    renderPortal();
    showToast(`Resource "${item.title}" has been approved!`);
  }
}

// Moderation: Reject pending resource
function rejectResource(id) {
  const item = resources.find(r => r.id === id);
  if (item && confirm(`Are you sure you want to reject and delete "${item.title}"?`)) {
    resources = resources.filter(r => r.id !== id);
    persistResources();
    renderPortal();
    showToast(`Resource rejected and removed.`);
  }
}

// ----------------------------------------------------------
// 6. Form Submission (Upload / Link Resource)
// ----------------------------------------------------------
document.getElementById("uploadForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const courseCode = document.getElementById("resCourse").value;
  const title = document.getElementById("resTitle").value.trim();
  const category = document.getElementById("resCategory").value;
  const format = document.getElementById("resFormat").value.trim();
  const author = document.getElementById("resAuthor").value.trim();
  const description = document.getElementById("resDescription").value.trim();

  const newResource = {
    id: Date.now(),
    courseCode: courseCode,
    subjectName: COURSE_CATALOG[courseCode] || "General Engineering",
    title: title,
    category: category,
    format: format,
    author: author,
    date: new Date().toISOString().split("T")[0],
    description: description,
    rating: 5,
    downloads: 0,
    bookmarked: false,
    status: "pending" // New submissions go directly to moderation
  };

  resources.unshift(newResource);
  persistResources();
  this.reset();

  showToast("Resource submitted successfully! It is now in the Moderation Queue.");
  switchTab("moderation");
});

// ----------------------------------------------------------
// 7. Search & Filter Event Listeners
// ----------------------------------------------------------
document.getElementById("searchInput").addEventListener("input", renderPortal);
document.getElementById("courseFilter").addEventListener("change", renderPortal);
document.getElementById("categoryFilter").addEventListener("change", renderPortal);

document.getElementById("btnResetFilters").addEventListener("click", function() {
  document.getElementById("searchInput").value = "";
  document.getElementById("courseFilter").value = "ALL";
  document.getElementById("categoryFilter").value = "ALL";
  renderPortal();
  showToast("Filters reset.");
});

// ----------------------------------------------------------
// 8. Utility Functions (Toast Notification & Helpers)
// ----------------------------------------------------------
let toastTimer = null;
function showToast(message) {
  const toast = document.getElementById("toastNotification");
  toast.textContent = message;
  toast.classList.remove("hidden");

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.add("hidden");
  }, 3200);
}

function getCategoryBadgeClass(category) {
  switch (category) {
    case "Notes": return "cat-notes";
    case "Templates": return "cat-templates";
    case "PYQs": return "cat-pyqs";
    case "Links": return "cat-links";
    case "Assignments": return "cat-assignments";
    default: return "cat-notes";
  }
}

// Escape HTML to prevent basic injection
function escapeHtml(text) {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ----------------------------------------------------------
// 9. Initial Load Trigger
// ----------------------------------------------------------
renderPortal();

