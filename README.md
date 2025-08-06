# LanceConnect - Freelancer Marketplace

**LanceConnect** is a modern freelancer marketplace that connects talented freelancers with clients seeking professional services. The name combines "Freelancer" and "Connect" to represent the platform's mission of connecting skilled professionals with clients worldwide.

## 🎯 Project Overview

LanceConnect is a full-stack web application built with React.js that provides a comprehensive platform for freelancers and clients to collaborate on projects. The application features role-based dashboards, secure payment processing, real-time messaging, and a complete project management system.

## ✨ Features & Functionality

### 🌐 **Public Features**
- **Landing Page** - Modern, responsive homepage showcasing platform benefits
- **User Authentication** - Secure login/register with role-based access
- **Role Selection** - Choose between Client and Freelancer roles during registration

### 👤 **Client Dashboard**

#### **Overview Section**
- **Summary Cards** - Total orders, completed orders, active orders, total spent
- **Recent Orders** - Quick view of latest orders with status
- **Recent Messages** - Latest conversations with freelancers

#### **Browse Gigs Section**
- **Search & Filter** - Search gigs by title, description, or freelancer name
- **Category Filter** - Filter by service categories (Design, Development, Writing, etc.)
- **Gig Cards** - Detailed gig information with pricing and freelancer details
- **Gig Details Modal** - Comprehensive gig information and purchase options
- **Purchase Flow** - Secure Stripe payment integration with order summary

#### **My Orders Section**
- **Order Tracking** - Real-time order status updates
- **Order Management** - View order details, track progress, cancel orders
- **Chat Integration** - Direct messaging with freelancers
- **Deliverables** - Download and review delivered work
- **Rating System** - Rate and review completed work

#### **Messages Section**
- **Chat List** - All conversations with freelancers
- **Real-time Messaging** - Send and receive messages
- **File Sharing** - Share files and attachments
- **Message History** - Complete conversation history

#### **Payments Section**
- **Payment History** - Complete transaction history
- **Payment Methods** - Manage payment methods
- **Spending Overview** - Track total spending and payment status

#### **Settings Section**
- **Profile Settings** - Update personal information and preferences
- **Security Settings** - Two-factor authentication and login activity
- **Notification Settings** - Customize notification preferences
- **Account Settings** - Manage account and privacy settings

### 🎨 **Freelancer Dashboard**

#### **Overview Section**
- **Summary Cards** - Total gigs, active orders, completed orders, total earnings, average rating
- **Recent Activity** - Latest activities and updates
- **Recent Messages** - Latest client conversations
- **Recent Orders** - Quick view of latest orders
- **Earnings Graph** - Visual earnings analytics

#### **My Gigs Section**
- **Gig Management** - Create, edit, and manage gig listings
- **Gig Status** - Active, paused, or draft gigs
- **Gig Analytics** - Views, clicks, orders, and performance metrics
- **Gig Details** - Comprehensive gig information and pricing

#### **Orders Section**
- **Order Management** - View and manage incoming orders
- **Order Status** - Track order progress and update status
- **File Delivery** - Upload and deliver work files
- **Order Communication** - Chat with clients
- **Order Analytics** - Performance and completion metrics

#### **Messages Section**
- **Chat List** - All conversations with clients
- **Real-time Messaging** - Send and receive messages
- **File Sharing** - Share files and attachments
- **Message History** - Complete conversation history

#### **Reviews Section**
- **Review Management** - View and respond to client reviews
- **Review Analytics** - Rating statistics and performance metrics
- **Review Filters** - Filter reviews by rating, date, and gig
- **Review Responses** - Respond to client reviews professionally

#### **Earnings Section**
- **Earnings Overview** - Total earnings, pending payments, completed payments
- **Earnings Graph** - Visual earnings analytics over time
- **Payment History** - Complete payment transaction history
- **Withdrawal Management** - Request and track withdrawals
- **Payment Methods** - Manage payment and withdrawal methods

#### **Settings Section**
- **Profile Settings** - Update professional profile and portfolio
- **Contact Settings** - Manage contact information and availability
- **Account Settings** - Manage account and privacy settings
- **Payment Settings** - Configure payment and withdrawal methods
- **Security Settings** - Two-factor authentication and login activity
- **Notification Settings** - Customize notification preferences
- **Connected Accounts** - Link social media and portfolio accounts

## 🛠️ Technology Stack

### **Frontend**
- **React.js** - Modern JavaScript library for building user interfaces
- **React Router** - Client-side routing for single-page application
- **React Icons** - Comprehensive icon library
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Recharts** - Composable charting library for analytics

### **Backend Integration**
- **RESTful APIs** - Secure API endpoints for all functionality
- **JWT Authentication** - Token-based authentication system
- **Stripe Integration** - Secure payment processing
- **Real-time Features** - WebSocket integration for messaging

## 🚀 Getting Started

### **Prerequisites**
- Node.js (v14 or higher)
- npm or yarn package manager
- Git

### **Installation**

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd LanceConnect/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the frontend directory:
   ```env
   REACT_APP_API_URL=https://lanceconnect-backend.onrender.com
   ```

4. **Start development server**
   ```bash
   npm start
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

### **Available Scripts**

- `npm start` - Start development server (http://localhost:3000)
- `npm run build` - Build production-ready files
- `npm test` - Run test suite
- `npm run eject` - Eject from Create React App (not recommended)

## 📁 Project Structure

```
frontend/
├── public/
│   ├── index.html
│   ├── _redirects          # Netlify redirects for SPA routing
│   └── netlify.toml        # Netlify configuration
├── src/
│   ├── components/
│   │   ├── Auth/           # Authentication components
│   │   ├── client/         # Client dashboard components
│   │   │   └── dashboard/
│   │   │       ├── browseGigs/
│   │   │       ├── myOrders/
│   │   │       ├── messages/
│   │   │       ├── payments/
│   │   │       └── settings/
│   │   └── freelancer/     # Freelancer dashboard components
│   │       └── dashboard/
│   │           ├── MyGigs/
│   │           ├── Orders/
│   │           ├── Messages/
│   │           ├── Reviews/
│   │           ├── Earnings/
│   │           └── Settings/
│   ├── pages/              # Main page components
│   ├── services/           # API services and utilities
│   ├── utils/              # Helper functions and utilities
│   ├── App.js              # Main application component
│   └── index.js            # Application entry point
├── package.json
└── README.md
```

## 🔐 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Role-based Access Control** - Separate dashboards for clients and freelancers
- **CORS Protection** - Domain-restricted API access
- **Secure Payment Processing** - Stripe integration with PCI compliance
- **Environment Variables** - Sensitive data protection

## 🎨 UI/UX Features

- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Modern Interface** - Clean, professional design
- **Intuitive Navigation** - Easy-to-use dashboard layouts
- **Real-time Updates** - Live status updates and notifications
- **Accessibility** - WCAG compliant design

## 🔄 State Management

- **React Hooks** - useState, useEffect, useMemo for local state
- **Context API** - Global state management for user authentication
- **Local Storage** - Persistent user sessions and preferences

## 📊 Analytics & Monitoring

- **Performance Tracking** - Page load times and user interactions
- **Error Monitoring** - Comprehensive error logging and reporting
- **User Analytics** - User behavior and engagement metrics

## 🚀 Deployment

### **Netlify Deployment**
1. Connect your GitHub repository to Netlify
2. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
3. Set environment variables in Netlify dashboard
4. Deploy automatically on Git push

### **Environment Variables**
```env
REACT_APP_API_URL=https://lanceconnect-backend.onrender.com
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team
- Check the documentation

## 🎯 Roadmap

### **Upcoming Features**
- **Video Calls** - Integrated video calling for client-freelancer communication
- **Time Tracking** - Built-in time tracking for hourly projects
- **Advanced Analytics** - Detailed performance and earnings analytics
- **Mobile App** - Native mobile applications for iOS and Android
- **AI Matching** - AI-powered client-freelancer matching
- **Escrow System** - Enhanced payment protection and escrow services

---

**LanceConnect** - Connecting talent with opportunity! 🚀
