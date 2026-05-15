# Moniq - Expense Tracker Web App

Moniq is a modern full-stack Expense Tracker application built with Spring Boot and React.  
The project focuses on clean backend architecture, scalable REST APIs, responsive UI design, and real-world expense management features.

---

# Tech Stack

## Backend
- Java
- Spring Boot
- Spring Security
- JWT Authentication
- Spring Data JPA
- Hibernate
- MySQL

## Frontend
- React
- React Router
- Axios
- Tailwind CSS
- Vite

---

# Current Features

## Authentication
- User Registration
- User Login
- JWT-based Authentication
- Protected Routes
- Persistent Login

---

# Expense Management

## Expense Features
- Create Expense
- Update Expense
- Delete Expense
- Get User Expenses
- Paginated Expense List
- Recent Transactions
- Dashboard Summary

---

# Dashboard

## Dashboard Summary Cards
- Total Expenses
- Total Income
- Current Balance

## Recent Transactions
- Latest 5 expenses
- Sorted by latest created transaction
- Quick Edit/Delete actions
- Responsive transaction cards

---

# Search & Filters

## Search
- Search expenses by keyword/note
- Debounced search input for smoother UX

## Filters
- Filter by Payment Mode
  - CASH
  - CARD
  - UPI

## Sorting
- Latest First
- Oldest First
- Amount High → Low
- Amount Low → High

---

# Pagination
- Previous / Next page navigation
- Backend pagination support using Spring Pageable

---

# UI / UX Improvements

## Responsive Design
- Mobile Responsive Layout
- Desktop Optimized UI
- Responsive Expense Cards
- Adaptive Dashboard Layout

## Expense Card UI
- Category Badges
- Better Mobile Alignment
- Large Amount Display
- Reusable Components
- Clean Modern Design

---

# Backend Architecture

## Layered Architecture
- Controller Layer
- Service Layer
- Repository Layer
- DTO-based API Responses

## Security
- JWT Token Authentication
- User-specific expense access
- Protected API routes

---

# APIs Implemented

## Auth APIs
- Register
- Login
- Current User

## Expense APIs
- Create Expense
- Update Expense
- Delete Expense
- Get Expenses with:
  - Pagination
  - Search
  - Filters
  - Sorting

## Dashboard APIs
- Dashboard Summary API

---

# Project Structure

## Frontend Structure
```bash
src/
 ├── components/
 ├── pages/
 ├── layouts/
 ├── services/
 ├── hooks/
 ├── routes/
 ├── utils/
 └── context/
```

## Backend Structure
```bash
src/main/java/
 ├── controller/
 ├── service/
 ├── repository/
 ├── model/
 ├── dto/
 ├── security/
 └── config/
```

---

# Current Status

## Completed
- Authentication System
- Expense CRUD
- Dashboard Summary
- Recent Transactions
- Pagination
- Search & Filters
- Sorting
- Responsive UI
- Reusable Modal for Add/Edit
- Mobile Optimization

---

# Future Improvements

## Planned Features

### Income Module
- Add Income
- Income Categories
- Income Dashboard

### Analytics
- Expense Charts
- Monthly Reports
- Category Analytics
- Spending Trends

### Advanced Filters
- Date Range Filter
- Category Filter
- Amount Range Filter

### UX Improvements
- Toast Notifications
- Skeleton Loaders
- Empty State UI
- Confirmation Dialogs
- Dark Mode

### Productivity Features
- Export Expenses
- Download PDF Reports
- CSV Export
- Budget Planning
- Savings Goals

### Advanced Features
- Recurring Expenses
- Multi-user Support
- Cloud Deployment
- PWA Support
- Notifications

---

# Learning Goals Behind This Project

This project is being built to improve:
- Full Stack Development Skills
- Spring Boot Backend Architecture
- REST API Design
- Authentication & Security
- React State Management
- Responsive UI Design
- Clean Code Practices
- Real-world Project Development

---

# Author

Developed by Abdul Majid

---

# Project Vision

Moniq is planned as a modern personal finance management platform focused on:
- simplicity
- clean design
- scalable architecture
- real-world usability
- production-ready backend/frontend practices

The goal is to continuously evolve the project into a professional-grade finance management application.
