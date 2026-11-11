# Resource-Sharing-Portal
A collaborative Classroom Resource Sharing Portal built with HTML, CSS, and JS featuring subject filtering, star ratings, bookmarks, and a moderation queue.
# 📚 Classroom Resource Sharing Portal

> A centralized, student-driven web platform designed to organize, share, and review coursework study materials, lecture notes, and reference links.

🌐 **Live Demo:** [View Live Portal](https://jeageristx07.github.io/Resource-Sharing-Portal/)

---

## 📖 Project Overview

The **Classroom Resource Sharing Portal** solves the problem of scattered study materials across messaging apps and drives by providing a structured, searchable hub for university coursework. Built as a collaborative 3-member frontend engineering project, the portal features a clean, modular codebase split across separate files to enable smooth team collaboration.

### 🎯 Supported Coursework Categories
* **💻 Orientation to Computing:** Fundamental computing concepts, system architectures, and lecture slides.
* **🐍 Python Programming:** Code snippets, lab manuals, logic building exercises, and reference sheets.
* **🌐 Internet Programming:** HTML5, CSS3, and JavaScript guides, cheatsheets, and project templates.
* **📐 General Coursework & Reference:** Additional semester notes, past question papers, and study guides.

---

## ✨ Key Features

* **🔍 Dynamic Search & Subject Filtering:** Instantly filter study resources by subject category or search by keyword, title, or tag.
* **📤 Resource Upload with Metadata Preview:** Submit new notes or links through a structured form featuring a real-time preview of the resource card before submission.
* **🛡️ Moderation Queue Workflow:** Newly uploaded materials enter a dedicated moderation queue where they can be reviewed, approved, or removed before going live on the main board.
* **⭐ Interactive Star Ratings:** Students can rate resources on a 5-star scale to highlight the most helpful study materials.
* **🔖 Quick Bookmarks:** Save important notes and revision sheets to a dedicated Bookmarks view for quick access during exams.

---

## 🛠️ Tech Stack & Project Versions

To demonstrate both foundational web layout skills and dynamic DOM manipulation, this project was developed in two versions:

| Version | Technologies Used | Core Focus |
| :--- | :--- | :--- |
| **1. Interactive Portal (Full)** | `HTML5`, `CSS3`, `JavaScript` | Dynamic search, live DOM filtering, star ratings, bookmark state, and moderation queue logic. |
| **2. Static Portal (Lightweight)** | `HTML5`, `CSS3` | Pure semantic markup, responsive Flexbox/Grid layouts, and clean UI cards without script dependencies. |

---

## 🚀 Usage Guide

### 1. How to Use the Portal (Student & Moderator Workflow)

1. **Browsing & Searching Resources:**
   * Open the portal homepage to view all approved study materials.
   * Click on any **Subject Tab** (*Python*, *Internet Programming*, *Orientation to Computing*) or type keywords into the **Search Bar** to narrow down results.
2. **Uploading a New Resource:**
   * Navigate to the **Upload / Share Resource** section.
   * Enter the resource title, select the subject, choose the material type (PDF, Notes, Video Link, Code), and add a short description.
   * Check the **Metadata Preview** panel to verify how your card looks, then click **Submit**.
3. **Moderating Submissions:**
   * Open the **Moderation Queue** tab to view pending student submissions.
   * Click **Approve** to publish the resource to the main dashboard, or **Reject** to discard invalid entries.
4. **Rating & Bookmarking:**
   * Click the **Star Icons (★)** on any resource card to rate its quality.
   * Click the **Bookmark Icon (🔖)** to save the item to your personal saved list for quick revision.

## 📁 File Structure

```text
├── index.html        # Semantic HTML5 layout, upload forms, and portal sections
├── style.css         # Custom CSS3 styling, responsive grid cards, and dark/light UI themes
├── script.js         # Client-side logic for search, ratings, bookmarks, and moderation
└── README.md         # Project documentation, usage instructions, and team details
```

---

## 👥 Team Members & Contributions

This project was collaboratively designed and built by a 3-member team:

| Team Member | Role & Primary Responsibilities | GitHub Profile |
| :--- | :--- | :--- |
| **Ayush Maurya** | **Project Structure & Core Development:** Modular architecture setup, UI/UX layout integration, and interactive portal functionality. | [@jeageristx07](https://github.com/jeageristx07) |
| **Qamre Alam Siddhiqui** | **Frontend Styling & Responsive Design:** CSS3 grid/flexbox layouts, resource card design, metadata preview styling, and responsiveness. | [@Alam-Siddique0786](https://github.com/Alam-Siddique0786) |
| **Aditya Yadav** | **DOM Logic & Feature Testing:** JavaScript event handling for search filtering, star ratings, bookmarking, and moderation workflows. | [@adityaDebugs25](https://github.com/adityaDebugs25) |

---

## 📄 License

This project was created for academic and educational purposes and is available under the [MIT License](LICENSE).
