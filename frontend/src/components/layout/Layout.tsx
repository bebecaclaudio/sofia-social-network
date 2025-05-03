import React, { ReactNode, useState } from "react";
import { Menu, X } from "lucide-react";

interface LayoutProps {
  header?: ReactNode;
  aside?: ReactNode;
  asideRight?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}

export default function Layout({
  header,
  aside,
  asideRight,
  footer,
  children,
}: LayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f7fff9] text-green-900 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow p-4 flex items-center justify-between">
        {header}
        <button
          className="lg:hidden text-green-800"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="lg:hidden bg-[#e0f5ea] p-4 space-y-4 border-b border-[#cccccc]">
          <div>{aside}</div>
          <hr className="border-[#cccccc]" />
          <div>{asideRight}</div>
        </div>
      )}

      {/* Main Layout */}
      <div className="flex flex-1">
        {/* Aside esquerdo - Desktop */}
        <aside className="w-64 bg-[#e0f5ea] p-4 border-r border-[#cccccc] hidden lg:block">
          {aside}
        </aside>

        {/* Main */}
        <main className="flex-1 p-6">{children}</main>

        {/* Aside direito - Desktop */}
        <aside className="w-64 bg-[#e0f5ea] p-4 border-l border-[#cccccc] hidden lg:block">
          {asideRight}
        </aside>
      </div>

      {/* Footer */}
      <footer className="bg-white shadow-inner p-4 mt-auto">{footer}</footer>
    </div>
  );
}
