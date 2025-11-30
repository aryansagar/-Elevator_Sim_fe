
# Elevator System Simulation – Frontend

A web interface that visualizes real-time elevator movement across floors and allows interactive control over system parameters. The UI syncs continuously with the backend using WebSockets.

---

## 📋 Prerequisites
- **Node.js 16+**
- Backend API running on **4000**
- **npm** or **yarn**

---

## 🎨 Features
- Live elevator positions and direction indicators (↑, ↓, idle).
- Real-time display of door states and passenger count per elevator.
- External floor controls (Up/Down request buttons per floor).
- Main simulation controls:
  - Start / Stop / Reset
  - Elevator count (n: **1–20**)
  - Floors (k: **2–50**)
  - Speed (**1×, 2×, 5×**)
  - Request frequency slider
- Live performance panel showing:
  - Avg Wait Time, Max Wait Time
  - Avg Travel Time, Completed & Active Requests
  - Elevator utilization %

---

## ⚙️ Installation & Start

### 1. Clone Repository
```bash
git clone https://github.com/aryansagar/-Elevator_Sim_fe.git
cd -Elevator_Sim_fe
