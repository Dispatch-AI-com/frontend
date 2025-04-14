"use client";

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">
            <span className="italic text-black">D</span>
            <span className="italic font-semibold text-green-500">ispatch</span>
            <span className="italic font-semibold text-black">AI</span>
          </h1>
        </div>

        {/* Content Card with vertical spacing */}
        <div className="bg-white shadow-md rounded-xl p-8 space-y-5">
          {children}
        </div>
      </div>
    </div>
  );
}
