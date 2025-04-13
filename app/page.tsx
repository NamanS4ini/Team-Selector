"use client";

import Link from "next/link";
import { Users, Info } from "lucide-react";

export default function HomePage() {
  return (
    <main className="md:min-h-[calc(100vh-65px)] min-h-[calc(100vh-49px)] bg-zinc-900 text-zinc-100 flex items-center justify-center px-6 py-12">
      <div className="text-center space-y-6 max-w-2xl">
        <h1 className="text-4xl sm:text-5xl font-bold text-white">
          Cricket Team Selector
        </h1>

        <p className="text-zinc-400 text-lg">
          Randomly assign players, captains, and toss results with one click.
          Perfect for quick, fair, and fun cricket matches.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
          <Link
            href="/selector"
            className="inline-flex items-center px-5 py-3 text-lg font-semibold bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition"
          >
            <Users className="w-5 h-5 mr-2" />
            Start Selecting
          </Link>

          <Link
            href="/about"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-zinc-300 hover:text-blue-400 transition"
          >
            <Info className="w-4 h-4 mr-1" />
            About this project
          </Link>
        </div>
      </div>
    </main>
  );
}
