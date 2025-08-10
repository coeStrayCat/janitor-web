# Janitor Web - Clean Architecture Authentication System

A Next.js application implementing Clean Architecture principles with React best practices for authentication system.

## 🏗️ Architecture Overview

This project follows **Clean Architecture** principles by Uncle Bob, organized with React best practices:

### 🎯 Clean Architecture Layers

1. **Domain Layer** (`/src/types/`)
   - Business entities and interfaces
   - No dependencies on external frameworks

2. **Application Layer** (`/src/lib/auth/use-cases.ts`)
   - Business use cases and rules
   - Orchestrates data flow between layers

3. **Infrastructure Layer** (`/src/lib/auth/repository.ts`)
   - External API communication
   - Data persistence (cookies, localStorage)

4. **Presentation Layer** (`/src/components/`, `/src/store/`, `/src/hooks/`)
   - React components and UI logic
   - Redux state management
   - Custom hooks

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
├── components/             # React Components
│   └── auth/              # Authentication components
├── hooks/                 # Custom React hooks
├── lib/                   # Business logic (Clean Architecture)
│   └── auth/              # Authentication domain
│       ├── use-cases.ts   # Application layer
│       ├── repository.ts  # Infrastructure layer
│       └── service.ts     # Dependency injection
├── providers/             # React providers
├── store/                 # Redux store and slices
├── styles/                # Global styles
├── types/                 # TypeScript type definitions
└── __tests__/             # Unit tests
```

## ✨ Key Features

- ✅ **Clean Architecture** - Separation of concerns
- ✅ **React Best Practices** - Proper component structure
- ✅ **TypeScript** - Type safety throughout
- ✅ **Redux Toolkit** - State management
- ✅ **Custom Hooks** - Reusable authentication logic
- ✅ **Unit Testing** - Jest & React Testing Library
- ✅ **JWT Authentication** - Token-based auth
- ✅ **Cookie Storage** - Secure token storage
- ✅ **Docker Support** - Development environment
- ✅ **API Proxy** - CORS handling

## 🔧 Clean Architecture Benefits

### 1. **Dependency Inversion**
- Domain layer doesn't depend on infrastructure
- Repository pattern for data access
- Dependency injection in service layer

### 2. **Testability**
- Each layer can be tested independently
- Mock implementations for external dependencies
- Unit tests for business logic

### 3. **Maintainability**
- Clear separation of concerns
- Easy to modify or replace layers
- Single responsibility principle

### 4. **Scalability**
- Add new features without affecting existing code
- Consistent patterns across the application
- Easy to extend authentication system

## 🚀 Getting Started

### Prerequisites
- Node.js 24+
- Docker & Docker Compose
- Spring Boot API running on port 8080

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd janitor-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start with Docker**
   ```bash
   docker-compose up --build
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - API endpoints: http://localhost:8080/api/v1

## 🧪 Testing

### Run Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Structure
- **Unit Tests**: `/src/__tests__/`
- **Component Tests**: `/src/__tests__/components/`
- **Business Logic Tests**: `/src/__tests__/lib/`

## 🎯 Authentication Flow

### Sign Up/Sign In Process
1. **User Input** → Components (`/src/components/auth/`)
2. **Action Dispatch** → Redux (`/src/store/auth-slice.ts`)
3. **Use Case Execution** → Business Logic (`/src/lib/auth/use-cases.ts`)
4. **API Communication** → Repository (`/src/lib/auth/repository.ts`)
5. **Token Storage** → Infrastructure Layer
6. **State Update** → Redux Store
7. **UI Update** → React Components

### Clean Architecture Flow
```
Presentation → Application → Domain ← Infrastructure
     ↓              ↓         ↓         ↓
Components → Use Cases → Entities ← Repository
```

## 🔒 Security Features

- **JWT Token Authentication**
- **HTTP-only Cookies** (production-ready)
- **CORS Protection** via API proxy
- **Protected Routes** with authentication guards
- **Secure Token Storage** with expiration

## 🛠️ Development Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint

# Run tests
npm test
```

## 🏆 Best Practices Implemented

### React Best Practices
- Functional components with hooks
- Custom hooks for reusable logic
- Proper TypeScript typing
- Component composition over inheritance

### Clean Architecture Principles
- Dependency inversion
- Single responsibility
- Open/closed principle
- Interface segregation

### Testing Best Practices
- Unit tests for business logic
- Component testing with React Testing Library
- Mock external dependencies
- Test coverage reporting

## 📚 Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Testing**: Jest, React Testing Library
- **Build Tool**: Turbopack
- **Containerization**: Docker
- **API Communication**: Axios

## 🔄 Extending the System

### Adding New Features
1. **Define Types** in `/src/types/`
2. **Create Use Cases** in `/src/lib/`
3. **Implement Repository** for data access
4. **Add Redux Slice** for state management
5. **Create Components** for UI
6. **Write Tests** for all layers

### Adding New Authentication Methods
1. Extend repository interface
2. Implement new use cases
3. Update Redux store
4. Create new components
5. Add corresponding tests

This architecture ensures that the application remains maintainable, testable, and scalable while following both Clean Architecture principles and React best practices.
