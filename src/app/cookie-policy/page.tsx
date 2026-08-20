import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "How Informax uses cookies and similar technologies on informax.co.uk.",
  alternates: { canonical: "/cookie-policy" },
};

export default function CookiePolicyPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      updated="20 August 2026"
      contactQuestion="Questions about our use of cookies?"
      sections={[
        {
          heading: "1. What Are Cookies",
          body: (
            <p>
              Cookies are small text files that are placed on your device
              when you visit a website. They are widely used to make
              websites work more efficiently, as well as to provide
              information to the owners of the site.
            </p>
          ),
        },
        {
          heading: "2. How We Use Cookies",
          body: (
            <p>
              Informax.co.uk does not currently set any non-essential
              cookies. If we introduce analytics or preference cookies in
              future to help us understand how visitors use our website
              and improve it, this policy will be updated in advance to
              explain what is used and why.
            </p>
          ),
        },
        {
          heading: "3. Types of Cookies We Use",
          body: (
            <p>
              Any strictly necessary cookies that are required for the
              website to function, such as those supporting basic security
              and site infrastructure, cannot be switched off. We do not
              currently use analytics or performance cookies; should this
              change, this section will list the specific services used.
            </p>
          ),
        },
        {
          heading: "4. Third-Party Cookies",
          body: (
            <p>
              We do not currently share cookie data with third parties.
              If we introduce third-party services that set their own
              cookies, for analytics or similar purposes, they will be
              named here along with a link to their own privacy and
              cookie policies.
            </p>
          ),
        },
        {
          heading: "5. Managing Cookies",
          body: (
            <p>
              Most web browsers allow you to control cookies through their
              settings, including blocking or deleting cookies already
              stored on your device. Please note that if you disable
              cookies, some parts of our website may not function as
              intended. You can find out more about managing cookies at{" "}
              <a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer">
                aboutcookies.org
              </a>{" "}
              or{" "}
              <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer">
                allaboutcookies.org
              </a>
              .
            </p>
          ),
        },
        {
          heading: "6. Changes to This Policy",
          body: (
            <p>
              We may update this Cookie Policy from time to time to
              reflect changes in the cookies we use or for legal or
              regulatory reasons. Any changes will be posted on this page
              with an updated &ldquo;last updated&rdquo; date.
            </p>
          ),
        },
      ]}
    />
  );
}
