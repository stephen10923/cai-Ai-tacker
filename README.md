# Cal AI — AI-Powered Nutrition & Calorie Tracker

Cal AI is a premium, high-performance mobile application designed to simplify nutrition tracking. By leveraging Google's Gemini AI and Supabase, users can snap a photo of their food, receive instant calorie and macro estimations, log water intake with tactile feedback, track progress with dynamic charts, and adjust target goals on the fly.

---

## 📱 Features & Highlights

### 1. AI-Powered Food Scanner
* **Instant Analysis**: Users snap a photo of their meal or pick one from the gallery. The app sends the optimized photo to Google Gemini for a complete breakdown of food name, calories, serving size, protein, carbs, fats, fiber, sugar, sodium, confidence score, and ingredients.
* **Meal Selector**: Automatically suggests the meal section (Breakfast, Lunch, Dinner, Snacks) based on local time, with an interactive horizontal tab row to review/modify before logging.
* **High-Speed Optimizations**: Incorporates client-side image compression resizing captured photos to a maximum width of `800px` and compressing quality to `0.7` before base64 submission. This shrinks payloads by **98% (from 5MB+ down to ~120KB)**, delivering 5x faster processing.

### 2. Interactive Dashboard (Home)
* **Goal Status**: Beautiful circular rings showing daily Eaten vs. Goal calories, and a dynamic macro progress bar.
* **Interactive Water Tracker**: Displays daily glasses and liters consumed. Features haptic feedback (`expo-haptics`) and enables glass tapping to log water intake instantly.
* **Persistent Daily Goals**: Quick edit buttons let users customize calorie and macro targets on the fly inside a frosted bottom sheet form.

### 3. Food Diary
* **Segmented Logs**: Breakfast, Lunch, Dinner, and Snacks sections display logged foods, calorie counts, and macro summaries.
* **Swipe-to-Delete**: Real-time log deletion synced between local state and the Supabase database.

### 4. Dynamic Progress & Analytics
* **Weekly Charts**: Shows dynamic daily calorie totals against the target goal line, with today's bar highlighted in a premium state.
* **Macro Split Breakdown**: Calculates actual averages for Protein, Carbs, and Fat splits consumed during the current week.
* **Current Month Calendar**: Features a dynamic monthly calendar showing daily compliance:
  * 🟢 **Goal met** (logged food, calories $\le$ target)
  - 🔴 **Over goal** (logged food, calories $>$ target)
  - ⚪ **No log** (no entries recorded)
* **Days Logged & Goal Rate**: Computes logging statistics dynamically over the past 30 days.

### 5. Settings & Theme Support
* **Dynamic Themes**: Supports both premium Light and Dark themes, seamlessly modifying all text, card backdrops, and SVG chart items.
* **Frosted Bottom Sheets**: Houses Privacy Policy and Terms of Service agreements in beautiful slide-up frosted cards.

---

## 🛠️ Architecture & Tech Stack

The application is built on top of the following technologies:

| Layer | Technology | Details |
| :--- | :--- | :--- |
| **Core Framework** | React Native & Expo SDK 56 | Cross-platform, fast startup, native rendering |
| **Navigation** | Expo Router (v56) | File-based routing, native gestures |
| **State Management** | Zustand | Light-weight, reactive, in-memory state |
| **Persistence** | Supabase & AsyncStorage | Supabase DB for food logs; AsyncStorage for goals, water, and sessions |
| **Image Compression** | `expo-image-manipulator` | Client-side cropping, resizing, and encoding |
| **AI Integration** | Google Gemini API | Multimodal analysis and safety checks |
| **Haptics** | `expo-haptics` | Tactile confirmation on user interactions |
| **Charts & SVGs** | `react-native-svg` | Smooth SVG layouts and progress bars |
| **Animations** | `react-native-reanimated` | Springy, hardware-accelerated transitions |

---

## 📁 Repository Structure

```text
├── app/                      # Expo Router File-Based Navigation
│   ├── (tabs)/               # Main Application Tab-bar Screens
│   │   ├── _layout.tsx       # Bottom Tab Navigator & Custom Emojis/Colors
│   │   ├── index.tsx         # Dashboard & Water Tracker
│   │   ├── diary.tsx         # Food Diary Segmented by Meals
│   │   ├── analytics.tsx     # Dynamic Progress Charts & Calendar Grid
│   │   └── profile.tsx       # Target Goals & Settings toggles
│   ├── auth.tsx              # Auth Welcome Gateway (Google & Email logins)
│   ├── auth-callback.tsx     # Oauth Redirection Callback
│   ├── scan-result.tsx       # AI Analysis review and Meal Selector
│   ├── onboarding/           # User onboarding screens
│   └── _layout.tsx           # Global Root Navigation & Supabase auth listener
├── components/               # Reusable UI Parts
│   ├── CalorieCard.tsx       # Dynamic Circle Chart & Target Stats
│   ├── MacroRing.tsx         # Circular Ring Progress Indicator
│   ├── MealSection.tsx       # Segmented Diary Category Rows
│   ├── ScanButton.tsx        # Floating Scan button with timed auto-Meal preselect
│   └── StreakBadge.tsx       # streak count badge
├── constants/                # Theme Variables & Configurations
│   ├── config.ts             # API Keys & Supabase URLs
│   └── theme.ts              # Light/Dark design colors and sizing
├── hooks/                    # Reusable Custom React Hooks
│   └── useThemeColors.ts     # Reads store state to toggle dynamic palettes
├── services/                 # Remote API Integrations
│   ├── gemini.ts             # Multimodal Food Analyzer Prompting & Fallbacks
│   └── supabase.ts           # DB insertions, deletions, and range queries
├── store/                    # Zustand Store Container
│   └── useAppStore.ts        # App-wide globals (Today's logs, Water, Theme state)
└── package.json              # Project Dependencies
```

---

## 🗄️ Supabase Database Schema

The backend uses a PostgreSQL Supabase database with two primary tables:

### 1. `profiles` Table
Stores user information. Linked to Supabase Auth `users`.
* `id` (UUID, primary key)
* `email` (text)
* `full_name` (text)
* `avatar_url` (text, optional)
* `created_at` (timestamp)

### 2. `food_logs` Table
Stores historical meal details for stats calculations.
* `id` (bigint, primary key)
* `user_id` (UUID, foreign key references `profiles.id` or auth `users`)
* `food_name` (text)
* `calories` (integer)
* `protein` (integer)
* `carbs` (integer)
* `fat` (integer)
* `fiber` (integer, optional)
* `sugar` (integer, optional)
* `sodium` (integer, optional)
* `meal_type` (text: 'breakfast' | 'lunch' | 'dinner' | 'snacks')
* `confidence` (numeric, optional)
* `ingredients` (text array, optional)
* `image_url` (text, optional)
* `serving_size` (text, optional)
* `logged_at` (timestamp with time zone)

---

## 🚀 Setup & Installation

### 1. Prerequisites
Ensure you have Node.js (v18+) and the Expo Go app installed on your testing device, or set up mobile simulators.

### 2. Clone and Install Dependencies
```bash
# Clone the repository
git clone <repository-url>
cd cal_ai

# Install npm packages
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory:
```env
EXPO_PUBLIC_SUPABASE_URL=https://your-supabase-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
EXPO_PUBLIC_GEMINI_API_KEY=your-google-gemini-api-key
```

### 4. Running the App
Start the Expo development server:
```bash
# Run on Metro Server
npm run start
```
* Press `a` to run on Android emulator.
* Press `i` to run on iOS simulator.
* Scan the QR code with your phone camera (iOS) or Expo Go app (Android) to run on a physical device.

---

## 📈 Scalability Architecture Plan

For detailed instructions on scaling the platform to handle millions of concurrent requests, please refer to our architectural guide:
* **Plan Document**: [scalable_architecture_plan.md](file:///d:/cal_ai/scalable_architecture_plan.md)
* **Key Focuses**: Client-Side Image Resizing, Redis Cache Layers, Database Indexing on `user_id` + `logged_at`, Connection Pooling (Supabase PgBouncer), and Queue processing for background API operations.
