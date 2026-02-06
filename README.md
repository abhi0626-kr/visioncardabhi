# Vision Board

A beautiful, modern digital vision board application built with React, TypeScript, and Supabase. Create and organize your dreams, goals, philosophies, and inspirations in one elegant sanctuary.

![Vision Board](https://i.pinimg.com/736x/db/0e/e2/db0ee2de02e731141a8394b059f54c04.jpg)

## ✨ Features

- **Theory Cards** - Save inspiring quotes and philosophical insights
- **Wish Cards** - Track your goals and dreams with progress indicators
- **Image Gallery** - Curate a visual collection of inspiration
- **Video Library** - Embed motivational videos from YouTube
- **Category Filters** - Organize content by Career, Health, Travel, Creativity, Relationships, and Personal
- **Focus Mode** - Distraction-free viewing experience
- **Real-time Sync** - All data synced with Supabase backend
- **Responsive Design** - Beautiful on all devices

## 🎨 Design

The application features a warm, sophisticated color palette inspired by natural earth tones:
- Dark Chocolate (#56332B)
- Warm Terracotta (#A0765E)
- Dusty Mauve (#B2A3A1)
- Warm Tan (#CDA991)
- Light Cream (#EADACE)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Supabase account (for backend)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/abhi0626-kr/vision-board.git
cd vision-board
```

2. Install dependencies:
```bash
npm install
# or
bun install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server:
```bash
npm run dev
# or
bun dev
```

5. Open [http://localhost:8080](http://localhost:8080) in your browser.

## 🗄️ Database Setup

Run the SQL migration in your Supabase project:

```sql
-- See supabase/migrations/20260203000000_create_vision_board.sql
```

This will create the necessary tables for theories, wishes, images, and videos.

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI
- **Backend**: Supabase (PostgreSQL)
- **Build Tool**: Vite
- **Routing**: React Router
- **State Management**: React Query
- **Authentication**: Supabase Auth

## 📁 Project Structure

```
visioncardabhi/
├── src/
│   ├── components/
│   │   ├── ui/              # Reusable UI components
│   │   └── vision/          # Vision board specific components
│   ├── pages/               # Page components
│   ├── lib/                 # Utilities and configurations
│   ├── hooks/               # Custom React hooks
│   ├── types/               # TypeScript type definitions
│   └── data/                # Initial data and constants
├── supabase/
│   └── migrations/          # Database migrations
└── public/                  # Static assets
```

## 🎯 Usage

1. **Add Content**: Click the "Add to Vision Board" button to create new items
2. **Filter by Category**: Use the category buttons to focus on specific areas
3. **Edit Items**: Hover over cards and click the edit icon
4. **Focus Mode**: Toggle focus mode for a distraction-free view
5. **Track Progress**: Check off wishes as you complete them

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspiration from modern productivity and wellness applications
- Icons from [Lucide](https://lucide.dev/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Font families: Cormorant Garamond & Inter

## 📧 Contact

Project Link: [https://github.com/abhi0626-kr/vision-board](https://github.com/abhi0626-kr/vision-board)

---

Built with ❤️ for dreamers and doers
