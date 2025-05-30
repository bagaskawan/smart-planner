export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-screen bg-gray-100">
      <div className="w-full h-full bg-white flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-10 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <div className="logo text-2xl font-bold">HADE.</div>
            {/* <LanguageSelector /> */}
          </div>
          <div className="overflow-y-auto w-full h-full flex flex-col relative">
            {children}
          </div>
        </div>
        <div className="w-full md:w-1/2 relative overflow-hidden h-full">
          {/* <HeroSection /> */}
          <div className="relative z-10">
            <img
              src="login-illust.png"
              alt="Person holding calendar"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
