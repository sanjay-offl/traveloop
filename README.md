# Traveloop

> A modern, full-featured travel planning platform that empowers users to organize trips, manage destinations, schedule activities, track budgets, and collaborate on itineraries through an intuitive, responsive interface.

**🌐 Live Demo:** [https://traveloop-odoo.netlify.app](https://traveloop-odoo.netlify.app)

**📦 Repository:** [github.com/sanjay-offl/traveloop](https://github.com/sanjay-offl/traveloop)

---

## Overview

Traveloop is a comprehensive travel planning SaaS designed for modern explorers. Whether you're planning a solo adventure, coordinating a group trip, or managing multiple destinations across continents, Traveloop provides all the tools you need in one elegant platform.

### Key Features

✨ **Multi-Destination Planning** – Organize complex itineraries across multiple cities and countries  
📅 **Interactive Calendar** – Visualize your travel timeline with integrated calendar views  
💰 **Budget Management** – Track expenses in real-time with multi-currency support  
✓ **Activity Checklists** – Organize tasks and activities for each destination  
📊 **Analytics & Insights** – Monitor spending patterns and travel statistics  
💬 **AI Travel Assistant** – Get personalized recommendations powered by Google Gemini API  
🌙 **Dark/Light Themes** – Seamless theme switching with persistent preferences  
🔐 **Secure Authentication** – Multi-method auth (Email/Password & Google OAuth)  
📱 **Fully Responsive** – Optimized for mobile, tablet, and desktop experiences  

---

## Tech Stack

### Frontend
- **Framework:** Next.js 15.5 (App Router, Server Components)
- **UI Library:** React 19.0 with React Hooks
- **Styling:** Tailwind CSS 4.3 with custom design system
- **Form Management:** React Hook Form 7.75 + Zod validation
- **State Management:** React Hooks + Context API
- **Charts & Visualization:** Recharts 3.8.1
- **Calendar:** react-calendar 4.0
- **Theme Management:** next-themes with CSS custom properties

### Backend & Services
- **Database & Auth:** Supabase (PostgreSQL + Auth)
- **API Gateway:** Next.js API Routes
- **AI Integration:** Google Generative AI (Gemini API)
- **File Storage:** Supabase Storage
- **Hosting:** Netlify (with Next.js Runtime)

### Developer Tools
- **Language:** TypeScript 5.x
- **Package Manager:** npm
- **Version Control:** Git
- **Code Quality:** ESLint, Prettier
- **Build Tool:** Webpack (via Next.js)

---

## Architecture

### Project Structure
```
traveloop/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx               # Root layout with theme provider
│   ├── page.tsx                 # Authentication entry point
│   ├── home/                    # Marketing/landing page
│   ├── dashboard/               # Main travel planning interface
│   ├── login/ & register/       # Auth pages
│   └── api/                     # Backend routes (chat, webhooks)
├── components/                   # React components
│   ├── ui/                      # Reusable UI components
│   ├── dashboard/               # Dashboard-specific components
│   ├── chatbot/                 # AI assistant
│   └── theme/                   # Theme management
├── hooks/                        # Custom React hooks
├── lib/                          # Utilities & types
├── utils/                        # Helper functions
├── supabase/                     # Database migrations & config
└── public/                       # Static assets
```

### Authentication Flow
1. Users authenticate via email/password or Google OAuth
2. Supabase manages JWT tokens and session state
3. Next.js middleware redirects unauthenticated users
4. Protected routes enforce authorization with RLS policies

### Data Flow
- **Frontend → API Routes** – React components fetch via Next.js API routes
- **API Routes → Supabase** – Supabase client handles database queries
- **Supabase → Frontend** – Real-time updates via Supabase subscriptions
- **External AI** – Chat requests flow through `/api/chat` to Google Gemini API

---

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/sanjay-offl/traveloop.git
   cd traveloop
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Set up environment variables**
   
   Create `.env.local` in the project root:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3001](http://localhost:3001) in your browser.

### Main Routes
| Route | Purpose |
|-------|---------|
| `/` | Authentication entry point |
| `/home` | Marketing & feature showcase |
| `/dashboard` | Main travel planning interface |
| `/login` | User login with email/password or Google |
| `/register` | New account creation |

---

## Deployment

### Netlify Deployment

The project is automatically deployed to **[traveloop-odoo.netlify.app](https://traveloop-odoo.netlify.app)** whenever you push to the `main` branch.

**Build Settings:**
- **Build Command:** `npm run build`
- **Publish Directory:** `.next`
- **Runtime:** Next.js Runtime

**Required Environment Variables (set in Netlify):**
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
GEMINI_API_KEY
```

---

## Configuration

### Database Migrations
Database schema migrations are stored in `/supabase/migrations/`. To apply migrations:

```bash
npx supabase migration list
npx supabase migration up
```

### Tailwind CSS
Custom design tokens and theme variables are defined in:
- `tailwind.config.js` – Brand colors and custom utilities
- `app/globals.css` – CSS custom properties for dark/light modes

### Environment Variables
| Variable | Purpose | Scope |
|----------|---------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Public (Client) |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase anon key | Public (Client) |
| `GEMINI_API_KEY` | Google AI API key | Private (Server only) |

---

## Features In Detail

### Travel Planning
- **Multi-Destination Itineraries** – Plan trips across multiple cities with activity scheduling
- **Smart Calendar** – Visualize your entire trip timeline
- **Activity Management** – Create, organize, and track activities per destination

### Budget Tracking
- **Real-Time Expense Tracking** – Log and categorize spending
- **Multi-Currency Support** – Convert currencies automatically
- **Budget Analytics** – Visual insights into spending patterns

### Community & Sharing
- **Trip Collaboration** – Invite others to plan trips together
- **Itinerary Sharing** – Export and share plans with travel partners
- **Community Insights** – Discover popular destinations and tips

### AI-Powered Assistance
- **Smart Recommendations** – Get personalized travel suggestions
- **Natural Language** – Chat with our AI travel assistant
- **Real-Time Information** – Access up-to-date travel insights

---

## Security & Privacy

- **End-to-End Encryption** – Sensitive data encrypted in transit
- **Row-Level Security (RLS)** – Database-level access control
- **OAuth 2.0** – Secure third-party authentication
- **Password Hashing** – Industry-standard password encryption via Supabase Auth
- **Privacy First** – GDPR-compliant data handling

---

## Contributing

We welcome contributions from the community. Please feel free to submit pull requests or open issues on our [GitHub repository](https://github.com/sanjay-offl/traveloop).

---

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

## Support & Contact

For questions, feedback, or support, please reach out through:
- **GitHub Issues:** [github.com/sanjay-offl/traveloop/issues](https://github.com/sanjay-offl/traveloop/issues)
- **Live Demo:** [https://traveloop-odoo.netlify.app](https://traveloop-odoo.netlify.app)

---

**Made with ❤️ for travel enthusiasts worldwide**
