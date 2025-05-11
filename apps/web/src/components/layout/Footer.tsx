import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-[#353839] py-12">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <div className="flex items-center mr-3">
                <img
                  src="/images/logo.png"
                  alt="Enzer Logo"
                  className="h-6 w-auto"
                  style={{ maxWidth: "100%", objectFit: "contain" }}
                />
              </div>
              Enzer
            </h3>
            <p className="text-gray-400 mb-4">Modern AI-powered communication for everyone.</p>
            <div className="flex space-x-4">
              {["twitter", "facebook", "instagram", "github"].map((social) => (
                <a key={social} href="#" className="text-gray-400 hover:text-[#FAFAFA] transition-colors">
                  <div className="w-10 h-10 rounded-full bg-[#151515] flex items-center justify-center border border-[#353839]">
                    <span className="sr-only">{social}</span>
                    <div className="w-5 h-5"></div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">Features</h4>
            <ul className="space-y-2">
              {[
                "Real-time Messaging",
                "Speech-to-Text",
                "Smart Replies",
                "End-to-End Encryption",
                "Cross-Platform",
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-[#FAFAFA] transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2">
              {["About", "Blog", "Contact", "Privacy Policy", "Terms of Service"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-[#FAFAFA] transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[#353839] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Enzer. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <Link href="/chat" className="text-[#FAFAFA] hover:text-[#FAFAFA]/80 transition-colors">
              Go to Enzer →
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
} 