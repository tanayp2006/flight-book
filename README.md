# Flight Booking Management System (FBMS)

This project is a high-performance, role-based flight booking application designed to handle complex logistics for airports, airlines, and travelers.

---

## 🚀 Tech Stack
* **Framework:** Next.js (App Router)
* **Database:** Neon (Serverless Postgres)
* **ORM:** Prisma
* **Authentication:** Better Auth (Google OAuth)
* **Styling:** Tailwind CSS + Shadcn/UI

---

## 👥 Team Distribution

### 1. Flight & Fleet Lead (Role: Flight Company)
**Objective:** Build the inventory management system for airlines.
* **Data Modeling:** Implement `Airline`, `Airplane`, and `Flight` models.
* **Company Dashboard:** Build CRUD interfaces for adding flights, managing schedules, and setting base pricing.
* **Status Management:** Logic for updating flight states (On-time, Delayed, Cancelled).

### 2. Infrastructure Lead (Role: Airport Manager)
**Objective:** Manage physical constraints and global routes.
* **Registry:** Maintain the `Airport` database (IATA codes, cities, timezones).
* **Route Logic:** Define connections and ensure flights only operate between valid airports.
* **Manager Dashboard:** A bird's-eye view for airport staff to monitor all traffic at their specific hub.

### 3. Booking & Transaction Lead
**Objective:** Handle the mission-critical booking flow and concurrency.
* **Seat Logic:** Build an interactive UI for seat selection based on airplane configuration.
* **Transaction Integrity:** Use Prisma transactions to prevent double-booking of the same seat.
* **Payment Flow:** Integrate a payment gateway (or mock) to transition bookings from `PENDING` to `CONFIRMED`.

### 4. Search & UX Lead (Role: Traveler)
**Objective:** The public-facing discovery portal.
* **Search Engine:** Advanced filtering by date, price, duration, and stops.
* **RBAC Middleware:** Logic to redirect users to the correct dashboard based on their role after login.
* **Traveler Profile:** A "My Trips" section to view history and manage active tickets.

### 5. Communications & Systems Lead
**Objective:** Close the loop with documentation and system-wide visibility.
* **E-Ticket Engine:** PDF generation for tickets (React-PDF/Puppeteer) including QR codes.
* **Messaging:** Email notifications for booking confirmation and flight updates (Resend/SendGrid).
* **Admin Analytics:** A global dashboard to track total revenue, busiest airports, and user growth.

---

## 🛠 Role-Based Access Control (RBAC)

The system distinguishes permissions via the following roles:
* **USER:** Search, book, and view personal tickets.
* **FLIGHT_COMPANY:** Manage their own fleet and flight schedules.
* **AIRPORT_MANAGER:** Monitor and manage airport-specific traffic/routes.
* **ADMIN:** System-wide oversight and analytics.

---

## 📈 Development Roadmap

### Phase 1: Infrastructure (Completed)
- [x] Next.js project initialization.
- [x] Prisma schema & Neon DB connection.
- [x] Better Auth with Google OAuth.

### Phase 2: Core Features (In-Progress)
- **Database:** Finalize shared Prisma models and run migrations.
- **Seeding:** Create a `seed.ts` to populate the DB with initial airports and aircraft.
- **Dashboards:** Build out the protected routes for each user role.

### Phase 3: Launch
- Integration testing for the booking flow.
- UI/UX polish and mobile responsiveness.
- Deployment on Vercel.