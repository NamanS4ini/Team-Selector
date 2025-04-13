"use client";

import Link from "next/link";
import { Github, Globe } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="md:min-h-[calc(100vh-65px)] min-h-[calc(100vh-49px)] flex items-center justify-center bg-zinc-900 text-zinc-100 px-6 py-12">
      <div className="max-w-2xl w-full bg-zinc-800 rounded-2xl shadow-2xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-white">About Team Selector</h1>

        <p className="text-zinc-300 leading-relaxed">
          Team Selector is a web application built to make organizing cricket matches effortless. It randomly selects players,
          assigns captains, and handles the toss, so you can spend less time planning and more time playing. Built with ❤️ using
          <span className="font-semibold text-blue-400"> Next.js</span> and <span className="font-semibold text-blue-400">TypeScript</span>.
        </p>

        <div className="border-t border-zinc-700 pt-4">
          <h2 className="text-xl font-semibold text-white">Created By</h2>
          <p className="text-zinc-300">Naman Saini</p>

          <div className="flex space-x-4 mt-4">
            <Link
              href="https://namansaini.vercel.app"
              target="_blank"
              className="flex items-center space-x-2 text-blue-400 hover:underline"
            >
              <Globe className="w-5 h-5" />
              <span>Portfolio</span>
            </Link>

            <Link
              href="https://github.com/namans4ini"
              target="_blank"
              className="flex items-center space-x-2 text-zinc-200 hover:underline"
            >
              <Github className="w-5 h-5" />
              <span>GitHub</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
