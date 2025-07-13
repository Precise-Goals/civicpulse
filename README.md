# CivicPulse 📰🤖

> AI-Powered Real-Time News, Chat, and Analytics Platform

CivicPulse is a comprehensive web application that delivers AI-enhanced news summaries, contextual chatbot interactions, and real-time user analytics. Built with Google's Gemini 1.5 Flash API and Firebase Realtime Database, it provides an interactive experience for users who want to stay updated with the latest technology and startup news while tracking their activity metrics.

## ✨ Features

- **🤖 AI-Enhanced News Summaries**: Get intelligent summaries of the latest tech and startup news
- **💬 Contextual Chatbot**: Interactive AI chat powered by Google Gemini 1.5 Flash
- **📊 Real-Time Analytics**: Track user activity and engagement metrics
- **🌤️ Weather Integration**: Enriched conversations with live weather data
- **📈 Stock Market Data**: Real-time stock price updates and market information
- **🔥 Firebase Integration**: Seamless authentication and real-time data synchronization

## 🛠️ Tech Stack

- **Frontend**: React v19 with Vite
- **Package Manager**: Bun
- **AI/ML**: Google Gemini 1.5 Flash API
- **Database**: Firebase Realtime Database
- **Authentication**: Firebase Auth
- **News API**: GNews API
- **Weather API**: OpenWeatherMap
- **Stock API**: TwelveData

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Bun (latest version)
- Firebase account
- API keys for all required services

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/sarthakpatil/civicpulse.git
   cd civicpulse
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory and add the following variables:

   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   VITE_GNEWS_API_KEY=your_gnews_api_key_here
   VITE_FIREBASE_API_KEY=your_firebase_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=yourapp.firebaseapp.com
   VITE_FIREBASE_DB_URL=https://yourapp-default-rtdb.firebaseio.com
   VITE_FIREBASE_PROJECT_ID=your-firebase-project-id
   VITE_FIREBASE_STORAGE_BUCKET=yourapp.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   VITE_FIREBASE_APP_ID=your-firebase-app-id
   VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id
   VITE_OPENWEATHER_API_KEY=your_openweather_api_key_here
   VITE_TWELVEDATA_API_KEY=your_twelvedata_api_key_here
   ```

4. **Start the development server**
   ```bash
   bun run dev
   ```

## 🔑 API Keys Setup

### Required API Keys

| Service                     | Purpose                                 | Get API Key                                               |
| --------------------------- | --------------------------------------- | --------------------------------------------------------- |
| **Google Gemini 1.5 Flash** | AI blog generation and chat responses   | [Google Cloud Console](https://console.cloud.google.com/) |
| **GNews**                   | Real-time technology and startup news   | [GNews API](https://gnews.io/)                            |
| **Firebase**                | Authentication, database, and analytics | [Firebase Console](https://console.firebase.google.com/)  |
| **OpenWeatherMap**          | Live weather data for chat context      | [OpenWeatherMap](https://openweathermap.org/api)          |
| **TwelveData**              | Real-time stock market data             | [TwelveData](https://twelvedata.com/)                     |

### Environment Variables Reference

| Variable                            | Description                           | Required |
| ----------------------------------- | ------------------------------------- | -------- |
| `VITE_GEMINI_API_KEY`               | Powers AI features and chat responses | ✅       |
| `VITE_GNEWS_API_KEY`                | Fetches technology and startup news   | ✅       |
| `VITE_FIREBASE_API_KEY`             | Firebase project authentication       | ✅       |
| `VITE_FIREBASE_AUTH_DOMAIN`         | Firebase authentication domain        | ✅       |
| `VITE_FIREBASE_DB_URL`              | Firebase Realtime Database URL        | ✅       |
| `VITE_FIREBASE_PROJECT_ID`          | Unique Firebase project identifier    | ✅       |
| `VITE_FIREBASE_STORAGE_BUCKET`      | Firebase storage bucket               | ⚠️       |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase Cloud Messaging ID           | ⚠️       |
| `VITE_FIREBASE_APP_ID`              | Firebase app initialization ID        | ✅       |
| `VITE_FIREBASE_MEASUREMENT_ID`      | Firebase Analytics measurement ID     | ⚠️       |
| `VITE_OPENWEATHER_API_KEY`          | Weather data integration              | ✅       |
| `VITE_TWELVEDATA_API_KEY`           | Stock market data integration         | ✅       |

> **Note**: ✅ = Required, ⚠️ = Optional but recommended

## 🏗️ Project Structure

```
civicpulse/
├── src/
│   ├── components/        # React components
│   ├── services/          # API services and utilities
│   ├── hooks/             # Custom React hooks
│   ├── utils/             # Helper functions
│   └── styles/            # CSS and styling files
├── public/                # Static assets
├── .env                   # Environment variables
├── vite.config.js         # Vite configuration
└── package.json           # Dependencies and scripts
```

## 📝 Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run preview` - Preview production build
- `bun run lint` - Run ESLint
- `bun test` - Run tests

## 🚢 Deployment

### Firebase Hosting

1. **Build the project**

   ```bash
   bun run build
   ```

2. **Deploy to Firebase**
   ```bash
   firebase deploy
   ```

### Vercel

1. **Connect your repository to Vercel**
2. **Set environment variables in Vercel dashboard**
3. **Deploy automatically on push**

## 🔒 Security

- **Environment Variables**: Never commit your `.env` file or API keys to public repositories
- **API Key Management**: Use environment variables with the `VITE_` prefix for client-side access
- **Firebase Security**: Configure Firebase security rules for database access
- **Rate Limiting**: Implement rate limiting for API calls to prevent abuse

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google Gemini AI for powering intelligent conversations
- Firebase for seamless backend services
- GNews API for real-time news data
- OpenWeatherMap for weather integration
- TwelveData for stock market data

## 📞 Support

If you encounter any issues or have questions, please:

1. Check the [Issues](https://github.com/sarthakpatil/civicpulse/issues) page
2. Create a new issue if your problem isn't already reported
3. Provide detailed information about your environment and the issue
4. Contact the maintainer: sarthakpaitl.ug@gmail.com

---

## 👨‍💻 Author

**Sarthak Tulsidas Patil**

- Email: sarthakpaitl.ug@gmail.com
- Founder of Falcons Tech Community, NMIET
- GitHub: [@sarthakpatil](https://github.com/Precise-Goals)

---

### build for Google Developer Club Application

![gif](https://i.redd.it/ckp5gcuzv7581.gif)

