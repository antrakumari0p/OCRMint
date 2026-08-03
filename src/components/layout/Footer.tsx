import { Link } from "react-router-dom";
import { Container } from "@/components/ui";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <Container className="py-12">

        <div className="grid gap-10 md:grid-cols-3">

          {/* Brand */}

          <div>
            <Link
              to="/"
              className="text-2xl font-bold tracking-tight text-primary"
            >
              OCRMint
            </Link>

            <p className="mt-3 text-sm text-text-secondary">
              Fast. Private. Free.
            </p>

            <p className="mt-4 max-w-sm text-sm leading-7 text-text-secondary">
              Extract editable text from images directly in your browser.
              Built with privacy in mind by Mint Labs.
            </p>
          </div>

          {/* Company */}

          <div>
            <h3 className="font-semibold text-text-primary">
              Company
            </h3>

            <ul className="mt-4 space-y-3 text-sm">

              <li>
                <Link to="/about" className="hover:text-primary">
                  About
                </Link>
              </li>

              <li>
                <Link to="/contact" className="hover:text-primary">
                  Contact
                </Link>
              </li>

              <li>
                <Link to="/faq" className="hover:text-primary">
                  FAQ
                </Link>
              </li>

              <li>
                <Link to="/how-it-works" className="hover:text-primary">
                  How It Works
                </Link>
              </li>

            </ul>
          </div>

          {/* Legal */}

          <div>
            <h3 className="font-semibold text-text-primary">
              Legal
            </h3>

            <ul className="mt-4 space-y-3 text-sm">

              <li>
                <Link to="/privacy" className="hover:text-primary">
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link to="/terms" className="hover:text-primary">
                  Terms of Service
                </Link>
              </li>

            </ul>
          </div>

        </div>

        <div className="mt-12 border-t border-border pt-6 flex flex-col gap-2 text-center text-sm text-text-secondary md:flex-row md:items-center md:justify-between">

          <p>
            © 2026 Mint Labs. All rights reserved.
          </p>

          <p>
            Built with privacy in mind.
          </p>

        </div>

      </Container>
    </footer>
  );
}