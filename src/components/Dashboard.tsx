import React from 'react';
import { Card, CardTitle, CardContent } from '@/components/ui/card';

function DashboardLayout() {
  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <aside className="w-1/4 bg-gray-200 p-4">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <nav className="space-y-6">
          {/* Profile Page Button */}
          <button className="w-3/4 p-3 text-center text-xl text-white rounded mx-auto mt-6 block hover:bg-opacity-90"
            style={{ backgroundColor: '#FFB450' }}>
            Profile Page
          </button>

          {/* Leaderboard Button */}
          <button className="w-3/4 p-3 text-center text-xl text-white rounded mx-auto mt-6 block hover:bg-opacity-90"
            style={{ backgroundColor: '#FFB450' }}>
            Leaderboard
          </button>

          {/* Words Learned Button */}
          <button className="w-3/4 p-3 text-center text-xl text-white rounded mx-auto mt-6 block hover:bg-opacity-90"
            style={{ backgroundColor: '#FFB450' }}>
            Words Learned
          </button>

          {/* Most Recent Story Button */}
          <button className="w-3/4 p-3 text-center text-xl text-white rounded mx-auto mt-6 block hover:bg-opacity-90"
            style={{ backgroundColor: '#FFB450' }}>
            Most Recent Story
          </button>

          {/* Chat Messages Button */}
          <button className="w-3/4 p-3 text-center text-xl text-white rounded mx-auto mt-6 block hover:bg-opacity-90"
            style={{ backgroundColor: '#FFB450' }}>
            Chat Messages
          </button>
        </nav>
      </aside>

      {/* Main content (cards area) */}
      <main className="flex-grow p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card 1 */}
          <Card className="aspect-square h-96 w-full bg-gray-300 flex items-center justify-center">
            <CardContent>
              <CardTitle>Leader Board</CardTitle>
            </CardContent>
          </Card>

          {/* Card 2 */}
          <Card className="aspect-square h-96 w-full bg-gray-300 flex items-center justify-center">
            <CardContent>
              <CardTitle>Words Learned</CardTitle>
            </CardContent>
          </Card>

          {/* Card 3 */}
          <Card className="aspect-square h-96 w-full bg-gray-300 flex items-center justify-center">
            <CardContent>
              <CardTitle>Most Recent Story</CardTitle>
            </CardContent>
          </Card>

          {/* Card 4 */}
          <Card className="aspect-square h-96 w-full bg-gray-300 flex items-center justify-center">
            <CardContent>
              <CardTitle>Chat Messages</CardTitle>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

// function Leaderboard() {

//   return();
// }

// function recentWords() {

//   return();
// }



export default DashboardLayout;
