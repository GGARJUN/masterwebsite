
import SideBar from './_components/SideBar';

function DashboardLayout({ children }) {
  return (
    <div className="relative min-h-screen  overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Top Blur */}
        <div
          aria-hidden="true"
          className="absolute -top-20 -left-20 transform-gpu overflow-hidden blur-3xl sm:-top-40 sm:-left-40"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative aspect-[1155/678] w-[36.125rem] rotate-[30deg] bg-gradient-to-tr from-indigo-500/30 via-blue-400/30 to-cyan-300/30 sm:w-[72.1875rem] animate-float-slow"
          />
        </div>

        {/* Bottom Blur */}
        <div
          aria-hidden="true"
          className="absolute -bottom-20 -right-20 transform-gpu overflow-hidden blur-3xl sm:-bottom-40 sm:-right-40"
        >
          <div
            style={{
              clipPath:
                'polygon(50% 0%, 75% 25%, 100% 50%, 75% 75%, 50% 100%, 25% 75%, 0% 50%, 25% 25%)',
            }}
            className="relative aspect-[1155/678] w-[40rem] bg-gradient-to-bl from-purple-500/30 via-pink-400/30 to-rose-300/30 sm:w-[80rem] animate-float"
          />
        </div>
      </div>

      {/* Layout Structure */}
      <div className="relative flex">
        {/* Sidebar - Fixed on desktop */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
          <div className="flex flex-col flex-grow border-r border-gray-200  backdrop-blur-lg pt-5 pb-4 ">
            <SideBar />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 md:ml-64">
          {/* Content Container */}
          <div className="px-4 sm:px-6 lg:px-8 py-6">
            <div className="  p-6 sm:p-8">
              {children}
            </div>
          </div>
        </div>
      </div>

      {/* Add these to your global CSS or Tailwind config */}
      {/* <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(10px) rotate(-1deg); }
        }
        .animate-float { animation: float 15s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 20s ease-in-out infinite; }
      `}</style> */}
    </div>
  );
}

export default DashboardLayout;