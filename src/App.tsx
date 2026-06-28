import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Header } from '@/Components/Header';
import { BackToTop } from '@/Components/BackToTop';
import { CustomCursor } from '@/Components/CustomCursor';
import Home from '@/pages/Home';
import Projects from '@/pages/Projects';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      
      {/* Premium Custom Trailing Cursor */}
      <CustomCursor />
      
      {/* Structural background vertical alignment gridlines */}
      <div className="fixed inset-0 flex justify-between px-4 md:px-[12vw] pointer-events-none z-0 opacity-[0.06]">
        <div className="w-[1px] h-full bg-[#2C312B]" />
        <div className="w-[1px] h-full bg-[#2C312B] hidden md:block" />
        <div className="w-[1px] h-full bg-[#2C312B] hidden md:block" />
        <div className="w-[1px] h-full bg-[#2C312B]" />
      </div>

      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
      <BackToTop />
    </>
  );
}

