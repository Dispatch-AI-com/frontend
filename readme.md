# Frontend Service - DispatchAI Platform

**Next.js 15 Web Application** providing the user interface for managing AI-powered service dispatch, bookings, and customer interactions.

## 🎯 Overview

The Frontend is a modern React application built with Next.js 15, Material-UI, and TypeScript, delivering a comprehensive dashboard for managing services, viewing call logs, scheduling appointments, and configuring AI settings.

## 🏗️ Architecture

### Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI Library**: Material-UI (MUI) v6
- **Styling**: Emotion (CSS-in-JS), Styled Components
- **State Management**: Redux Toolkit + RTK Query
- **Form Handling**: React Hook Form + Zod validation
- **Date Management**: date-fns, dayjs, react-big-calendar
- **HTTP Client**: Axios
- **Charts**: MUI X Charts
- **Language**: TypeScript 5.8

### Project Structure

```
apps/frontend/
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── (public)/              # Public pages
│   │   │   ├── landing/          # Landing page
│   │   │   ├── features/         # Features page
│   │   │   ├── products/         # Products page
│   │   │   ├── blogs/            # Blog listing & detail
│   │   │   ├── pricing/          # Pricing page
│   │   │   ├── about/            # About us
│   │   │   ├── login/            # Login page
│   │   │   ├── signup/           # Signup page
│   │   │   ├── terms/            # Terms of service
│   │   │   └── privacy/          # Privacy policy
│   │   ├── admin/                 # Dashboard pages (protected)
│   │   │   ├── overview/         # Dashboard overview
│   │   │   ├── booking/          # Service bookings
│   │   │   ├── calendar/         # Calendar view
│   │   │   ├── inbox/            # Call logs & transcripts
│   │   │   ├── ai-setup/         # AI phone setup
│   │   │   ├── service-management/ # Services CRUD
│   │   │   ├── settings/         # User settings
│   │   │   └── billing/          # Billing & subscriptions
│   │   ├── onboarding/            # User onboarding
│   │   ├── auth/                  # Auth callbacks
│   │   ├── layout.tsx             # Root layout
│   │   └── page.tsx               # Home page
│   ├── components/                 # Reusable components
│   │   ├── layout/               # Layout components
│   │   │   ├── admin-layout/     # Dashboard layout
│   │   │   ├── main-layout/      # Public layout
│   │   │   ├── dashboard-layout/ # Sidebar layout
│   │   │   └── ...
│   │   ├── providers/            # Context providers
│   │   └── ui/                   # UI components
│   ├── features/                   # Feature modules (RTK slices)
│   │   ├── auth/                 # Authentication
│   │   ├── subscription/         # Subscriptions
│   │   ├── service/              # Services
│   │   ├── calendar/             # Calendar
│   │   ├── callog/               # Call logs
│   │   ├── transcript/           # Transcripts
│   │   ├── settings/             # Settings
│   │   └── ...
│   ├── redux/                      # Redux store
│   │   └── store.ts              # Store configuration
│   ├── types/                      # TypeScript types
│   ├── lib/                        # Utility libraries
│   └── utils/                      # Helper functions
├── public/                          # Static assets
│   ├── assets/                    # Images, icons
│   ├── dashboard/                 # Dashboard assets
│   └── ...
├── package.json                    # Dependencies
├── next.config.ts                  # Next.js config
├── tsconfig.json                   # TypeScript config
├── Dockerfile.dev                 # Development Docker
└── Dockerfile.uat                 # UAT Docker
```

## 📄 Key Pages & Features

### Public Pages

#### Landing (`/`)
Marketing homepage with hero, features, pricing, testimonials

#### Features (`/features`)
Detailed feature showcase with comparison table

#### Products (`/products`)
Product information with FAQ section

#### Blogs (`/blogs`)
Blog listing and detail pages

#### Pricing (`/pricing`)
Subscription plans and features

#### Login/Signup (`/login`, `/signup`)
Authentication pages with Google OAuth

### Dashboard Pages (Protected)

#### Overview (`/admin/overview`)
Main dashboard with activity, campaign progress, recent bookings

**Components**:
- ActivitySection - Recent activity feed
- CampaignProgressSection - Call statistics
- RecentService - Recent service bookings

#### Booking Management (`/admin/booking`)
Service booking management with calendar view

**Features**:
- Filter bookings by status
- Search bookings
- View booking details
- Manage booking lifecycle

#### Calendar (`/admin/calendar`)
Calendar view of appointments and bookings

**Features**:
- Monthly, weekly, daily views
- Task cards with status colors
- Task detail modal
- Drag & drop (future)

#### Inbox (`/admin/inbox`)
Call logs, transcripts, and conversation history

**Features**:
- Filter by date, caller, status
- Search transcripts
- View full conversation
- Transcript chunks modal
- Delete call logs

#### AI Setup (`/admin/ai-setup`)
Phone number configuration for AI assistant

**Features**:
- Device type selection (Apple/Android)
- QR code setup (instant)
- Manual setup instructions
- Test call functionality
- Troubleshooting guide

#### Service Management (`/admin/service-management`)
CRUD interface for services

**Features**:
- Create/edit/delete services
- Custom form fields
- Service pricing
- Description & duration
- Grid/card layout

#### Settings (`/admin/settings`)
User and company configuration

**Sections**:
- User Profile - Name, email
- Company Info - Business details
- Greeting Message - Custom AI greeting
- Calendar Integrations - Google/Outlook
- Verification - Phone verification
- Billing Address

#### Billing (`/admin/billing`)
Subscription and payment management

**Features**:
- View current plan
- Upgrade/downgrade plans
- Payment history
- Invoices
- Refund history

### Onboarding

#### Onboarding Flow (`/onboarding`)
Interactive chat-based onboarding

**Steps**:
1. Welcome & introduction
2. Business information collection
3. Service setup
4. Phone number verification
5. AI configuration
6. Completion

## 🎨 UI Components

### Layout Components

**AdminPageLayout**: Dashboard page wrapper with title and padding

**DashboardLayout**: Sidebar navigation layout

**MainLayout**: Public pages layout with navbar & footer

**OnboardingLayout**: Onboarding chat interface

### UI Components

**AddressAutocomplete**: Google Places address autocomplete

**StatusChip**: Status badges (Confirmed, Cancelled, Done)

**ProFeatureModal**: Upgrade prompts for premium features

**CalendarView**: Calendar display with multiple views

**TaskCard**: Booking/appointment card

**DeleteCallLogModal**: Confirmation modal

**TranscriptionChunksModal**: Transcript chunks display

## 🔌 API Integration

### RTK Query Slices

**authApi**: Authentication endpoints
```typescript
endpoints: {
  login, signup, googleLogin, logout, me
}
```

**serviceBookingApi**: Service booking endpoints
```typescript
endpoints: {
  getBookings, createBooking, updateBooking, deleteBooking
}
```

**calllogApi**: Call log endpoints
```typescript
endpoints: {
  getCallLogs, getCallLog, getMetrics
}
```

**transcriptApi**: Transcript endpoints
```typescript
endpoints: {
  getTranscript, createTranscript, updateTranscript
}
```

**calendarApi**: Calendar integration
```typescript
endpoints: {
  getAuthUrl, callback, saveToken, getToken
}
```

**subscriptionApi**: Subscription management
```typescript
endpoints: {
  getSubscription, updateSubscription, getInvoices, getRefunds
}
```

**settingsApi**: Settings management
```typescript
endpoints: {
  getUser, updateUser, getCompany, updateCompany, verifyPhone
}
```

## 🚀 Development

### Getting Started

1. **Install dependencies**:
   ```bash
   cd apps/frontend
   npm install  # or pnpm install
   ```

2. **Set up environment**:
   ```bash
   # Create .env.local
   NEXT_PUBLIC_API_URL=http://localhost:4000/api
   NEXT_PUBLIC_AI_URL=http://localhost:8000/api
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_client_id
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_maps_key
   ```

3. **Run development server**:
   ```bash
   npm run dev
   ```

4. **Access application**:
   - Local: http://localhost:3000

### Available Commands

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Lint with ESLint
npm run type-check   # Type check with TypeScript
```

### Code Quality

```bash
# Lint
npm run lint

# Fix linting issues
npm run lint -- --fix

# Type check
npm run type-check
```

### Docker Development

```bash
# Build
docker build -f Dockerfile.dev -t dispatchai-frontend:dev .

# Run
docker run -p 3000:3000 dispatchai-frontend:dev

# Or use docker-compose
docker compose up frontend
```

## 🎯 Routing

### Public Routes
- `/` - Landing
- `/features` - Features
- `/products` - Products
- `/blogs` - Blog listing
- `/blogs/[id]` - Blog detail
- `/pricing` - Pricing
- `/about` - About us
- `/login` - Login
- `/signup` - Signup
- `/terms` - Terms
- `/privacy` - Privacy

### Protected Routes (require auth)
- `/admin/overview` - Dashboard
- `/admin/booking` - Bookings
- `/admin/calendar` - Calendar
- `/admin/inbox` - Inbox
- `/admin/ai-setup` - AI Setup
- `/admin/service-management` - Services
- `/admin/settings` - Settings
- `/admin/billing` - Billing
- `/onboarding` - Onboarding

### Auth Routes
- `/auth/callback` - OAuth callback

## 🔐 Authentication

### Auth Flow

1. **Login**: Email/password or Google OAuth
2. **Session**: JWT stored in HTTP-only cookie
3. **Guards**: Protected routes require valid session
4. **Refresh**: Auto-refresh on API calls

### Implementation

**RTK Slice**: `features/auth/authSlice.ts`  
**API**: `features/auth/authApi.ts`  
**Hook**: `useCSRFToken()`

## 📊 State Management

### Redux Store

**Store**: `src/redux/store.ts`

**Slices**:
- `authSlice` - User authentication state
- `publicApi` - Public API endpoints
- `authApi` - Auth endpoints
- `serviceApi` - Service endpoints
- `subscriptionApi` - Subscription endpoints
- `calllogApi` - Call log endpoints
- `transcriptApi` - Transcript endpoints
- `calendarApi` - Calendar endpoints
- `settingsApi` - Settings endpoints

**Persistence**: Redux Persist for offline support

## 🎨 Theming & Styling

### Material-UI Theme

**Provider**: `components/providers/ThemeProvider.tsx`

**Theme Configuration**:
- Primary/secondary colors
- Typography scales
- Spacing
- Breakpoints
- Components overrides

### Styling Approach

**Emotion**: Primary styling (CSS-in-JS)  
**Styled Components**: Legacy components  
**SX Prop**: Inline styling  
**Global Styles**: `src/app/globals.css`

## 🔗 External Integrations

### Google OAuth

**Button**: `components/GoogleOAuthButton.tsx`  
**Config**: Environment variables  
**Redirect**: `/auth/callback`

### Google Maps / Places API

**Component**: `components/ui/AddressAutocomplete.tsx`  
**Usage**: Address autocomplete in forms  
**API Key**: `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`

### Calendar Integration

**Google Calendar**: OAuth flow  
**Outlook**: Microsoft Graph API  
**UI**: `app/admin/settings/CalendarIntegrations.tsx`

## 📦 Key Dependencies

### Core
- **next**: 15.1.7 - Framework
- **react**: 19.0.0 - UI library
- **@mui/material**: 6.1.9 - Component library
- **@reduxjs/toolkit**: 2.8.2 - State management
- **axios**: 1.9.0 - HTTP client

### Forms & Validation
- **react-hook-form**: 7.56.4 - Form handling
- **zod**: 3.25.17 - Schema validation
- **@hookform/resolvers**: 5.0.1 - Zod resolver

### UI Components
- **@mui/icons-material**: 6.1.9 - Icons
- **@mui/x-charts**: 8.9.2 - Charts
- **@mui/x-date-pickers**: 8.9.0 - Date pickers
- **react-big-calendar**: 1.19.4 - Calendar

### Utilities
- **date-fns**: 4.1.0 - Date manipulation
- **dayjs**: 1.11.13 - Date library
- **lodash**: 4.17.21 - Utilities

## 🧪 Testing

```bash
# Run tests (when available)
npm run test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage
```

## 🐛 Common Issues

### Issue: API calls failing

**Fix**: Check `NEXT_PUBLIC_API_URL` and backend service is running

### Issue: Google OAuth not working

**Fix**: Verify `NEXT_PUBLIC_GOOGLE_CLIENT_ID` and redirect URI

### Issue: Maps not loading

**Fix**: Check `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` and billing

### Issue: TypeScript errors

**Fix**: Run `npm run type-check`, ensure dependencies match

### Issue: Build fails

**Fix**: Clear `.next` folder, run `npm run build` again

## 📚 Additional Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Material-UI Docs**: https://mui.com
- **Redux Toolkit**: https://redux-toolkit.js.org
- **React Hook Form**: https://react-hook-form.com
- **Zod**: https://zod.dev

## 🤝 Contributing

When adding new features:
1. Create feature module in `src/features/`
2. Add RTK Query endpoints
3. Create UI components in `src/components/`
4. Add pages in `src/app/`
5. Update navigation/sidebar
6. Add TypeScript types
7. Test thoroughly
8. Update this README