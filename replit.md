# WhatsApp Admin Dashboard

## Overview

This is a full-stack web application that serves as an admin dashboard for WhatsApp business messaging. The application provides user authentication, chat history viewing, and user management functionality. It's built using a React frontend and Express backend with PostgreSQL database integration via Drizzle ORM.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend

The frontend is built with React and uses the following key technologies:

- **React**: Main UI library
- **Tailwind CSS**: For styling with a utility-first approach
- **shadcn/ui**: A collection of reusable UI components built on Radix UI
- **React Query (TanStack Query)**: For data fetching, caching, and state management
- **Wouter**: Lightweight router for page navigation

The frontend follows a component-based architecture with reusable UI components, custom hooks for state management, and a responsive design that works on both desktop and mobile devices.

### Backend

The backend is an Express.js server that:

- Handles API requests from the frontend
- Manages user authentication using Passport.js
- Interfaces with the database using Drizzle ORM
- Provides REST API endpoints for the WhatsApp data

### Database

The application uses PostgreSQL (via Drizzle ORM) for data persistence with the following schema:

- `users`: Stores user account information, credentials, and profiles

### Authentication

The authentication system uses:

- Passport.js with local strategy
- Express session for maintaining user sessions
- bcrypt-like password hashing (using Node's crypto module)

## Key Components

### Frontend Components

1. **Pages**:
   - Auth Page: Login and registration functionality
   - Home Page: Dashboard overview with statistics
   - Chat Page: WhatsApp conversation interface
   - Profile Page: User profile management

2. **Layout Components**:
   - Sidebar: Main navigation
   - Chat components: Message display and composition

3. **UI Components**:
   - Reusable UI components from shadcn/ui library
   - Custom components for specific dashboard elements

### Backend Components

1. **Authentication Module**:
   - User registration and login
   - Session management
   - Password encryption

2. **API Routes**:
   - WhatsApp user endpoints
   - Chat history endpoints
   - User management endpoints

3. **Storage Module**:
   - Database interface using Drizzle ORM
   - Session storage management

## Data Flow

1. **Authentication Flow**:
   - User submits credentials via the auth page
   - Server validates credentials and creates a session
   - Client stores session cookie
   - Protected routes check for valid session

2. **Chat Data Flow**:
   - Client requests chat data from the API
   - Server fetches data (currently using mock data, but would fetch from Twilio API in production)
   - Client displays chat messages with React Query handling caching and updates

3. **User Management Flow**:
   - Admin can view user profiles
   - Users can update their own profile information
   - Changes are persisted to the database

## External Dependencies

### Frontend Dependencies

- **React and React DOM**: Core UI library
- **TanStack Query**: Data fetching and state management
- **Radix UI**: Accessible UI primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Wouter**: Routing library
- **Lucide React**: Icon library

### Backend Dependencies

- **Express**: Web server framework
- **Passport**: Authentication middleware
- **Drizzle ORM**: SQL ORM for database interaction
- **Zod**: Schema validation
- **Express Session**: Session management

## Deployment Strategy

The application is configured for deployment on Replit with:

1. **Development Mode**:
   - Uses Vite's development server for hot module replacement
   - Runs the backend with tsx for TypeScript execution

2. **Production Mode**:
   - Frontend is built with Vite
   - Backend is bundled with esbuild
   - Combined application runs on a single port

3. **Deployment Configuration**:
   - `.replit` file configures deployment settings
   - Environment variables handle database connection and other configuration
   - Build process optimizes the application for production

## Database Setup

The application is configured to use PostgreSQL with Drizzle ORM. The schema is defined in `shared/schema.ts` and includes:

- User accounts with authentication information
- Profile data for each user

Drizzle is set up with migrations support to manage schema changes over time.

## Future Improvements

1. **Real Twilio Integration**: Replace mock data with actual Twilio WhatsApp API integration
2. **Enhanced Analytics**: Add more dashboard metrics and visualization
3. **Real-time Updates**: Implement WebSockets for live chat updates
4. **Multi-tenant Support**: Allow multiple organizations to use the dashboard