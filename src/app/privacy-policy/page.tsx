import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Informax collects, uses and protects your personal data.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="20 August 2026"
      contactQuestion="Questions about this policy?"
      sections={[
        {
          heading: "1. Introduction",
          body: (
            <p>
              Informax (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;)
              operates the website informax.co.uk and provides NFC-enabled
              tags, cards and associated digital guest directory services
              (the &ldquo;Service&rdquo;). This policy explains what
              personal data we collect, why we collect it, and the choices
              you have. We are committed to handling your data responsibly
              and in line with the UK General Data Protection Regulation
              (UK GDPR) and the Data Protection Act 2018.
            </p>
          ),
        },
        {
          heading: "2. Information We Collect",
          body: (
            <p>
              We collect information you give us directly, such as your
              name, email address and any details you include when you
              contact us, submit an enquiry form, or reach out at
              info@informax.co.uk. We also collect limited information
              automatically when you visit our website, such as general
              technical information needed to serve the site securely.
              Content a hotel publishes within its own Informax directory
              remains that property&rsquo;s responsibility to manage, and we
              do not access it unless asked to help set it up.
            </p>
          ),
        },
        {
          heading: "3. How We Use Your Information",
          body: (
            <p>
              We use the information we collect to respond to enquiries and
              provide customer support, to set up and maintain digital
              directories and their content on a property&rsquo;s behalf
              where requested, and to send information about our products
              and services where you have agreed to receive it. We do not
              sell your personal data to third parties.
            </p>
          ),
        },
        {
          heading: "4. Legal Basis for Processing",
          body: (
            <p>
              We process personal data on the basis of your consent, for
              example when you submit an enquiry or agree to receive
              marketing communications; our legitimate interests, such as
              keeping our website and services secure; and the steps
              necessary to perform a contract with you, where you have
              arranged Informax tags or related services from us.
            </p>
          ),
        },
        {
          heading: "5. Cookies",
          body: (
            <p>
              Our website may use cookies or similar technologies to help
              it function and, where enabled, to understand how it is
              used. Full details are set out in our{" "}
              <a href="/cookie-policy">Cookie Policy</a>.
            </p>
          ),
        },
        {
          heading: "6. Sharing Your Information",
          body: (
            <p>
              We may share your information with trusted service providers
              who help us run our website and business, including our
              hosting and infrastructure providers, each of whom is only
              permitted to use your data to provide services to us. We may
              also share information where required by law. We do not
              share your personal data with third parties for their own
              marketing purposes.
            </p>
          ),
        },
        {
          heading: "7. International Transfers",
          body: (
            <p>
              Some of our service providers may process data outside the
              United Kingdom. Where this happens, we take steps to ensure
              your information receives an equivalent level of protection,
              including through standard contractual clauses or equivalent
              safeguards recognised under UK data protection law.
            </p>
          ),
        },
        {
          heading: "8. Data Retention",
          body: (
            <p>
              We keep personal data only for as long as necessary to
              fulfil the purposes for which it was collected, including to
              satisfy any legal, accounting or reporting requirements.
              Enquiry and correspondence records are typically retained
              for up to 2 years, after which they are securely deleted.
            </p>
          ),
        },
        {
          heading: "9. Your Rights",
          body: (
            <p>
              Under UK data protection law, you have the right to request
              access to the personal data we hold about you, request that
              we correct any inaccurate or incomplete data, request that we
              delete your data in certain circumstances, request that we
              restrict or object to certain processing, and request that
              your data be provided to you or transferred to another
              organisation in a portable format. To exercise any of these
              rights, please contact us at info@informax.co.uk. If you are
              unhappy with how we have handled your personal data, you also
              have the right to complain to the Information
              Commissioner&rsquo;s Office (ICO) at{" "}
              <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">
                ico.org.uk
              </a>
              .
            </p>
          ),
        },
        {
          heading: "10. Data Security",
          body: (
            <p>
              We take appropriate technical and organisational measures to
              protect your personal data against unauthorised access,
              alteration, disclosure or destruction, including relying on
              the security measures provided by our hosting and
              infrastructure providers.
            </p>
          ),
        },
        {
          heading: "11. Children's Privacy",
          body: (
            <p>
              Our website and services are intended for business use and
              are not directed at children. We do not knowingly collect
              personal data from children.
            </p>
          ),
        },
        {
          heading: "12. Changes to This Policy",
          body: (
            <p>
              We may update this policy from time to time to reflect
              changes in our practices or for legal or regulatory reasons.
              Any changes will be posted on this page with an updated
              &ldquo;last updated&rdquo; date.
            </p>
          ),
        },
      ]}
    />
  );
}
