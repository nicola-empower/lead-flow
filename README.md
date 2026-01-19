# LeadFlow - Marketing Pipeline Simulator

LeadFlow Dashboard <img width="2853" height="1519" alt="image" src="https://github.com/user-attachments/assets/cb80c85c-e807-446b-ae60-9f55aa99742c" />


> **"What if we could debug marketing funnels like we debug code?"**

LeadFlow is an interactive visualization engine designed to simulate and optimize complex marketing journeys. By treating traffic sources, conversion steps, and revenue outcomes as connected nodes in a graph, marketers can visualize "leaks" in their funnel, project revenue based on conversion rates, and run "Time Machine" simulations to forecast the impact of increased ad spend.

## 🔗 Live Demo
*https://lead-flow-ivory.vercel.app/*
<img width="2817" height="1518" alt="image" src="https://github.com/user-attachments/assets/cb6ffcca-c265-492e-8a8f-74ef4a854420" />

---

## 📚 Case Study: The Problem

Modern digital marketing is data-rich but insight-poor. Marketers drown in spreadsheets and fragmented dashboards (GA4, Meta Ads, CRM), making it difficult to answer simple questions like:
*   *"If I double my Facebook budget, how does that impact my bottom line?"*
*   *"Where exactly are we losing the most leads?"*
*   *"Is it cheaper to improve my landing page optimization by 5% or decrease my cost-per-click by 10%?"*

Spreadsheets are static. Marketing is dynamic.

## 💡 The Solution: LeadFlow

LeadFlow bridges the gap between raw data and decision-making by creating a **visual twin** of the marketing pipeline.

### Key Features

*   **⚡ Interactive Flow Builder**: Drag-and-drop interface to model any funnel architecture (Webinar Funnels, SaaS Trials, E-commerce).
*   **🔮 "Time Machine" Simulation**: A real-time physics engine that simulates lead flow. Adjust the "Ad Spend" global slider to watch 10,000+ "ghost leads" travel through the system, visually demonstrating throughput and bottlenecks.
*   **💸 Real-time Financial Projection**: Calculating cost, revenue, and ROI instantly as you modify conversion rates on specific nodes.
*   **🚨 Leak Detection**: Visual alerts pulse red on nodes where conversion rates drop below acceptable thresholds, instantly highlighting areas for optimization.
*   **💾 Local Persistence**: Browser-based local storage allows users to save and revisit their complex diagrams without a backend database.

---

## 🛠️ Technical Implementation

LeadFlow was built to demonstrate advanced frontend state management and interactive data visualization.

### Tech Stack
*   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
*   **Visualization**: [React Flow (xyflow)](https://reactflow.dev/) - Modified with custom nodes and animated SVG edges.
*   **State Management**: [Zustand](https://github.com/pmndrs/zustand) - Handling the global "Simulation Store" (Ad spend multipliers, churn rates, lift factors).
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) - Leveraging a "Dark Mode Professional" aesthetic with extensive use of glassmorphism and backdrop-filters.
*   **Icons**: [Lucide React](https://lucide.dev/)

### Highlight: The "Ghost Lead" Physics Engine
To make the data feel "alive", I implemented a custom edge type (`AnimatedPipeEdge`) that renders particles moving along SVG paths. The speed and density of these particles are mathematically driven by the `throughput` value of the source node.
*   **High Throughput**: Fast, dense particle flow.
*   **Bottleneck**: Slow, sparse flow.
This allows a user to *feel* the velocity of their pipeline, not just read it in a table.

### Highlight: Recursive Data Propagation
The simulation logic uses a DAG (Directed Acyclic Graph) traversal algorithm. When a global parameter (like "Ad Spend") changes, the engine:
1.  Recalculates the output of all **Source Nodes**.
2.  Propagates these values down to connected **Process Nodes**, applying specific conversion rates.
3.  Sums the total into **Outcome Nodes** to derive final Revenue.
This entire recalculation happens in <16ms, ensuring 60fps performance even during complex "Time Machine" slider adjustments.

---

## 🚧 Path to Production: Next Steps

LeadFlow is currently a high-fidelity prototype. Transforming this into a commercial SAAS product would involve the following architectural evolution:

### 1. Database & Authentication
*   **PostgreSQL (Supabase/Neon)**: Replace local JSON persistence with a relational database to store User Accounts, Team Workspaces, and Saved Flows.
*   **Auth (Clerk/NextAuth)**: Implement secure login and organization-based access control.

### 2. Live Data Integrations (APIs)
To move from "Simulation" to "Real-time Monitoring", we would integrate:
*   **Meta Ads Manager API / Google Ads API**: To pull real-time *Cost* and *Impression* data into Source Nodes.
*   **Google Analytics 4 (GA4) Data API**: To fetch real *Visitor* counts for specific page paths.
*   **Stripe API**: To validate *Revenue* data in Outcome Nodes.

### 3. Server-Side Simulation
*   Move the simulation logic from the Client (Zustand) to Server Actions or Edge Functions to handle massive datasets and run scheduled reports.

---

## 🎯 Market Analysis: Software Replacement

LeadFlow consolidates the functionality of three distinct tool categories, offering a unified "Command Center" for growth:

| Current Tool Stack | Limitations | How LeadFlow Replaces It |
| :--- | :--- | :--- |
| **Funnelytics / Geru** | Expensive ($600+/yr), complex UI, often disconnected from financial outcomes. | **Flow Builder**: Offers the same visual mapping but with superior "Time Machine" financial simulations and cleaner UX. |
| **Spreadsheets (Excel)** | Static rows/columns, error-prone, zero visualization of velocity or bottlenecks. | **Simulation Engine**: Turns static data into dynamic visual flows. "If this, then that" scenarios are instant. |
| **Looker / Tableau** | High technical barrier, backward-looking (reports what *happened*, not what *could* happen). | **Interactive Dashboard**: Forward-looking. Allows marketers to "play" with variables to forecast future results. |

---

## 🌟 Product Vision: What's Missing for the "Final Wow"

While the current build is technically impressive, these additions would make it an "unbeatable" tool in the market:

### 1. 🔦 The "Path of Least Resistance" Highlighter
*   **The Idea**: Instead of just showing where leads go, the app uses a glowing "Golden Path" to show the most profitable route.
*   **The Wow**: If *Facebook Ads → Webinar Landing Page → Live Webinar Room* has a higher ROI than other paths, that entire route glows gold. It tells the marketer exactly where to put their next dollar without them having to look at the numbers.

### 2. 🤖 AI "Profit Playbooks"
*   **The Idea**: When a user clicks a "Critical Drop-off" node (like your current Replay Sequence), an AI panel suggests a specific fix.
*   **The Wow**: *"Your replay sequence is leaking. Based on 1,000+ similar funnels, adding an 'Urgency Countdown' to this page usually increases conversion by 4.2%. Click 'Apply Simulation' to see the revenue impact."*

### 3. ⚔️ Real-Time Comparison (Actual vs. Simulated)
*   **The Idea**: Split the "ghost leads" into two colors.
*   **The Wow**: Show your **Actual Current Data** (dimmer dots) moving alongside your **Simulated "What-If" Data** (brighter, faster dots). It makes the gap between "where you are" and "where you could be" feel incredibly tangible.

### 4. 📄 "Export as Business Case"
*   **The Idea**: A one-click button to turn the current simulation into a professional PDF.
*   **The Wow**: Marketers often struggle to get budget approval from bosses. A button that generates a report saying, *"If we increase spend by 1.5x and fix this specific email leak, we gain £1.2M in revenue,"* makes the tool an essential part of their job.

---

## 🚀 Getting Started

To run LeadFlow locally:

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/leadflow.git
    cd leadflow
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000)

---

*LeadFlow © 2026 - Designed & Engineered by Nicola Berry*
