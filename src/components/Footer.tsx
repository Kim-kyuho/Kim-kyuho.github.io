// src/components/Footer.tsx
export default function Footer() {
    return (
      <footer className="text-center text-sm text-muted-foreground border-t border-gray-200 dark:border-gray-700 py-6">
        <p>&copy; {new Date().getFullYear()} Kyuho Kim. All rights reserved.</p>
        <div className="mt-2 space-x-4">
          <a href="https://github.com/Kim-kyuho" target="_blank" rel="noopener noreferrer" className="hover:underline">
            GitHub
          </a>
          <a href="mailto:kgh9002@icloud.com" className="hover:underline">
            Email
          </a>
          <a href="/contact" className="hover:underline">
            Contact
          </a>
        </div>
      </footer>
    );
  }