# Algoo - Path Quest Viz 🚀

**Algoo** is a professional algorithm visualization platform designed to help students and developers master pathfinding algorithms through interactive, real-time visual experiences.

![Hero Image](file:///public/hero_illustration.png)

## 🌟 Features

- **Interactive Grid**: Place walls, move start and end nodes, and watch algorithms navigate obstacles.
- **Real-time Visualization**: Control the speed of the search from slow-motion to instant.
- **Multiple Algorithms**:
  - **Dijkstra's Algorithm**: Guarantees the shortest path in weighted/unweighted grids.
  - **A* Search**: Uses heuristics for optimal and efficient pathfinding.
  - **Breadth-First Search (BFS)**: Explores nodes level by level.
  - **Greedy Best-First**: Fast heuristic search focusing on the goal.
- **Code Sidebar**: See the logic behind the algorithms while they run.
- **Learning Hub**: Dedicated sections for learning the theory and tutorials.
- **User Dashboard**: Track your learning progress and saved visualizations.

## 🛠️ Tech Stack

- **Frontend**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Hooks & Context API
- **Backend / Auth**: [Firebase](https://firebase.google.com/)
- **Animations**: [Tailwind Animations](https://github.com/jamiebuilds/tailwindcss-animate)

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or [Bun](https://bun.sh/)

### Installation

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd path-quest-viz
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Set up Environment Variables**
   Create a `.env` file based on `.env.example` and add your Firebase configurations.

4. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`.

## 📂 Project Structure

- `src/algorithms`: Core logic for pathfinding algorithms (Dijkstra, A*, BFS, Greedy).
- `src/components`: Reusable UI components (Grid, Controls, Legend).
- `src/pages`: Main application views (Home, Visualizer, Dashboard, Learn).
- `src/utils`: Helper functions for grid manipulation and path calculations.
- `src/contexts`: Authentication and global state management.

## 👨‍💻 Author

Built with ❤️ by **Hamad**.

## ⚖️ License

This project is open-source. See the project settings for license details.
