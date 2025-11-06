# NextDeal Server

A comprehensive TypeScript-based backend server for the NextDeal automotive platform, providing robust APIs for vehicle management, dealer operations, customer interactions, and AI-powered chat services.

## 🚗 Features

- **Vehicle Management**: Complete CRUD operations for vehicles with image uploads
- **Dealer Management**: Dealer registration, authentication, and profile management
- **Customer Management**: Customer profiles, leads, and interaction tracking
- **AI Chat Services**: OpenAI-powered chat functionality for dealers and customers
- **WhatsApp Integration**: WhatsApp scraping and messaging capabilities
- **Community Features**: Community posts and interactions
- **Campaign Management**: Marketing campaign creation and management
- **Subscription System**: User subscription and billing management
- **Real-time Communication**: Socket.IO for live chat and notifications
- **File Upload**: Image and document upload with Google Cloud Storage
- **Internationalization**: Multi-language support (i18n)
- **Authentication**: JWT-based authentication with role-based access control
- **Google Ads Integration**: Google Ads API integration for campaign management

## 🛠️ Tech Stack

- **Runtime**: Node.js 18+
- **Language**: TypeScript 5.x
- **Framework**: Express.js 5.x
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT, bcrypt
- **Real-time**: Socket.IO
- **File Upload**: Multer + Google Cloud Storage
- **AI Integration**: OpenAI API
- **WhatsApp**: Custom scraping functionality
- **Email**: Nodemailer
- **Validation**: Yup schema validation
- **Internationalization**: i18next
- **Containerization**: Docker
- **Development**: tsx, nodemon

## 📋 Prerequisites

- Node.js 18+ 
- MongoDB instance
- Google Cloud Platform account (for storage)
- OpenAI API key
- WhatsApp Business API credentials (optional)

## 🚀 Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd nextDeal-server
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=8080
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/nextdeal

# JWT
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d

# Google Cloud Storage
GOOGLE_CLOUD_PROJECT_ID=your_project_id
GOOGLE_CLOUD_BUCKET_NAME=your_bucket_name
GOOGLE_APPLICATION_CREDENTIALS=path/to/service-account-key.json

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# CORS Origins
CORS_ORIGINS=http://localhost:3000,http://localhost:3001

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

### 4. Build and Start the server

**Development mode:**
```bash
npm run dev
```

**Build and run production:**
```bash
npm run build
npm start
```

**Development with build:**
```bash
npm run dev:build
```

The server will start on `http://localhost:8080`

## 🐳 Docker Deployment

### Build the image
```bash
docker build -t nextdeal-server .
```

### Run the container
```bash
docker run -p 8080:8080 --env-file .env nextdeal-server
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/forgot-password` - Password reset request

### Vehicles
- `GET /api/vehicale` - Get all vehicles
- `POST /api/vehicale` - Create new vehicle
- `GET /api/vehicale/:id` - Get vehicle by ID
- `PUT /api/vehicale/:id` - Update vehicle
- `DELETE /api/vehicale/:id` - Delete vehicle
- `GET /api/share` - Public vehicle listings

### Dealers
- `GET /api/dealer` - Get all dealers
- `POST /api/dealer` - Create new dealer
- `GET /api/dealer/:id` - Get dealer by ID
- `PUT /api/dealer/:id` - Update dealer
- `DELETE /api/dealer/:id` - Delete dealer

### Leads
- `GET /api/leads` - Get all leads
- `POST /api/leads` - Create new lead
- `GET /api/leads/:id` - Get lead by ID
- `PUT /api/leads/:id` - Update lead

### Garages
- `GET /api/garage` - Get all garages
- `POST /api/garage` - Create new garage
- `GET /api/garage/:id` - Get garage by ID
- `PUT /api/garage/:id` - Update garage

### Spare Parts
- `GET /api/spare-parts` - Get all spare parts
- `POST /api/spare-parts` - Create new spare part
- `GET /api/spare-parts/:id` - Get spare part by ID
- `PUT /api/spare-parts/:id` - Update spare part

### Community
- `GET /api/community-post` - Get all community posts
- `POST /api/community-post` - Create new post
- `GET /api/community-post/:id` - Get post by ID
- `PUT /api/community-post/:id` - Update post

### Chats & Messages
- `GET /api/chats` - Get all chats
- `POST /api/chats` - Create new chat
- `GET /api/messages` - Get messages for a chat
- `POST /api/messages` - Send new message

### Campaigns
- `GET /api/campaign` - Get all campaigns
- `POST /api/campaign` - Create new campaign
- `GET /api/campaign/:id` - Get campaign by ID
- `PUT /api/campaign/:id` - Update campaign

### Subscriptions
- `GET /api/subscription` - Get all subscriptions
- `POST /api/subscription` - Create new subscription
- `GET /api/subscription/:id` - Get subscription by ID
- `PUT /api/subscription/:id` - Update subscription

### Users (Admin)
- `GET /api/users` - Get all users
- `POST /api/users` - Create new user
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## 🔌 Socket.IO Events

### Chat Events
- `join_chat` - Join a chat room
- `leave_chat` - Leave a chat room
- `send_message` - Send a message
- `typing` - User typing indicator

### AI Events
- `ai_message` - Send message to AI
- `ai_response` - Receive AI response

### WhatsApp Events
- `whatsapp_message` - WhatsApp message events
- `whatsapp_status` - WhatsApp status updates

## 🗄️ Database Models

- **User**: Base user model with authentication
- **Dealer**: Dealer-specific information and settings
- **Customer**: Customer profiles and preferences
- **Car**: Vehicle information and specifications
- **CarGarage**: Garage and service information
- **Lead**: Sales leads and customer inquiries
- **Campaign**: Marketing campaigns and promotions
- **Community**: Community posts and interactions
- **Chat**: Chat sessions and conversations
- **Message**: Individual chat messages
- **Subscription**: User subscription plans
- **SparePart**: Automotive spare parts catalog

## 🔐 Authentication & Authorization

The API uses JWT tokens for authentication. Protected routes require a valid token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

Role-based access control is implemented for admin routes.

## 📁 Project Structure

```
src/
├── config/          # Configuration files (database, i18n)
├── controller/      # Route controllers
├── middleware/      # Custom middleware (auth, error handling, upload)
├── models/          # Database models
├── routes/          # API route definitions
│   └── admin/       # Admin-specific routes
├── services/        # Business logic services
├── sockets/         # Socket.IO event handlers
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
├── validations/     # Input validation schemas
└── server.ts        # Main server file
```

## 🧪 Testing

Currently, no test suite is configured. To add testing:

```bash
npm install --save-dev jest supertest @types/jest @types/supertest
```

## 📝 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `PORT` | Server port number | Yes | 8080 |
| `NODE_ENV` | Environment mode | No | development |
| `MONGODB_URI` | MongoDB connection string | Yes | - |
| `JWT_SECRET` | JWT signing secret | Yes | - |
| `JWT_EXPIRES_IN` | JWT token expiration | No | 7d |
| `GOOGLE_CLOUD_PROJECT_ID` | Google Cloud project ID | Yes | - |
| `GOOGLE_CLOUD_BUCKET_NAME` | Google Cloud Storage bucket | Yes | - |
| `GOOGLE_APPLICATION_CREDENTIALS` | Service account key path | Yes | - |
| `OPENAI_API_KEY` | OpenAI API key | Yes | - |
| `CORS_ORIGINS` | Allowed CORS origins | Yes | - |
| `SMTP_HOST` | SMTP server host | No | smtp.gmail.com |
| `SMTP_PORT` | SMTP server port | No | 587 |
| `SMTP_USER` | SMTP username | No | - |
| `SMTP_PASS` | SMTP password | No | - |

## 🚨 Error Handling

The application includes comprehensive error handling with:
- HTTP status codes
- Custom error messages
- Validation error responses
- Database error handling
- Middleware-based error handling

## 📊 Monitoring & Logging

- **Morgan**: HTTP request logging
- **Console logging**: Server status and errors
- **Error tracking**: Comprehensive error handling
- **File logging**: Log files in `logs/` directory

## 🔄 Development Workflow

1. **Feature Development**: Create feature branch from main
2. **Code Review**: Submit pull request for review
3. **Testing**: Ensure all endpoints work correctly
4. **Build**: Run `npm run build` to compile TypeScript
5. **Deployment**: Merge to main and deploy

## 🛠️ Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run dev:build` - Build and run in development mode
- `npm test` - Run tests (not configured yet)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests if applicable
5. Commit your changes (`git commit -m 'Add some amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the API documentation

## 🔗 Related Projects

- Frontend application (if available)
- Mobile application (if available)
- Admin dashboard (if available)

---

**NextDeal Server** - Powering the future of automotive commerce 🚗✨

*Built with ❤️ using TypeScript, Express.js, and MongoDB*
