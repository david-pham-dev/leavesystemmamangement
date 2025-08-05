# Leave Management System - Azure Full-Stack Deployment

A comprehensive leave management system built to demonstrate Azure cloud deployment expertise, featuring React frontend, ASP.NET Core backend, and modern cloud architecture patterns.
## Live Application

- **Frontend**: `https://witty-island-0baf24000.1.azurestaticapps.net/`
- **API Documentation**: `https://leavesystem-bnhafuh0bkeygbbq.australiaeast-01.azurewebsites.net/swagger/index.html`


## Challenges
 - No familiarity with Azure App Service and Azure Static Web
 - No previous experience using GitHub Actions CI/CD Pipeline 
 - CHATGPT gave wrong solutions
 - Wasting hours on misconfiguration on Azure (Environment Variables, Configuration, Redirecting)


## Solution
- Patience, not giving up, not abusing AI, and read Microsoft Official documents.

## Azure Architecture & Deployment

This project showcases proficient use of multiple Azure services in a production-ready configuration:

### **Frontend: Azure Static Web Apps**
- **Service**: Azure Static Web Apps
- **Framework**: React with modern JavaScript/TypeScript

### **Backend: Azure App Service**
- **Service**: Azure App Service (Web App)
- **Framework**: ASP.NET Core Web API (.NET 8)
- **Features**:
  - Application Insights integration for error tracking and performance monitoring
  - CI/CD pipeline via Publish Wizard in VS 2022
  - Secure connection string management via App Settings

### **Data Layer: Entity Framework Core + Supabase**
- **ORM**: Entity Framework Core
- **Database**: Supabase PostgreSQL (cloud-hosted)
- **Features**:
  - Code-first database migrations
  - Connection string management via Azure App Settings
  - Secure database connectivity


## Technology Stack

**Frontend:**
- React 18+
- Modern ESLint/TypeScript
- Responsive design
- Azure Static Web Apps deployment

**Backend:**
- ASP.NET Core 8 Web API
- Entity Framework Core
- API-first approach
- RESTful API architecture
- Azure App Service hosting
- Application Insights integration for error tracking

**Database:**
- Supabase PostgreSQL
- Entity Framework Core migrations
- Cloud-native database solution

**DevOps & Deployment:**
- GitHub Actions CI/CD pipeline
- Automated builds and deployments
- Azure-integrated development workflow

## Azure Deployment Process

### Frontend Deployment (Azure Static Web Apps)
1. Utilise GitHub Actions for automatic deployment
2. Configured build settings for React application
3. Set up custom routing rules
4. Implemented environment-specific configurations

### Backend Deployment (Azure App Service)
1. Configured App Service with .NET 8 runtime
2. Set up Publish Wizard workflow for CI/CD
3. Integrated Application Insights for error tracking and performance monitoring
4. Configured application settings and secure connection strings

### Database Integration
1. Configured Supabase PostgreSQL connection
2. Implemented Entity Framework Core migrations
3. Secured connection strings in Azure App Settings
4. Set up database monitoring and backup strategies


## Features

**Core Functionality:**
- Employee leave request submission and tracking
- Manager approval workflow
- Leave balance management
- Calendar integration for leave visualization
- Auto deducting weekends and holidays in Western Australia

**Technical Implementation:**
- RESTful API design with proper HTTP status codes
- Entity Framework Core for data access patterns
- Responsive React frontend with modern UI components
- Real-time error tracking via Application Insights
- Automated testing and deployment pipeline
