// src/app/contact/page.tsx
export default function ContactPage() {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 space-y-6">
        <h1 className="text-3xl font-bold">📬 Contact</h1>
        <p className="text-lg text-muted-foreground">
          You can contact me via the links below.
        </p>
  
        <ul className="space-y-4">
          <li>
            <a
              href="mailto:gimgyuho@example.com"
              className="text-blue-600 hover:underline"
            >
              ✉️ Email: gimgyuho@example.com
            </a>
          </li>
          <li>
            <a
              href="https://github.com/Kim-kyuho"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              💻 GitHub: @Kim-kyuho
            </a>
          </li>
          <li> 
            <a
              href="https://www.linkedin.com/in/your-profile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              🔗 LinkedIn: your-profile
            </a>
          </li>
        </ul>
      </div>
    );
  }