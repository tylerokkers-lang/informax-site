import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The terms and conditions governing use of the Informax website and service.",
  alternates: { canonical: "/terms-and-conditions" },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      updated="20 August 2026"
      contactQuestion="Questions about these Terms?"
      sections={[
        {
          heading: "1. Introduction",
          body: (
            <p>
              These terms and conditions (&ldquo;Terms&rdquo;) govern your
              use of the website informax.co.uk (the &ldquo;Website&rdquo;)
              and the NFC-enabled tags, cards and associated digital guest
              directory services provided by Informax (&ldquo;we&rdquo;,
              &ldquo;us&rdquo;, &ldquo;our&rdquo;, the &ldquo;Service&rdquo;).
              By using our Website or Service, you agree to be bound by
              these Terms. If you do not agree, please do not use our
              Website or Service.
            </p>
          ),
        },
        {
          heading: "2. About Our Service",
          body: (
            <p>
              Informax provides physical NFC tags, cards and associated
              digital directories that, when tapped or scanned with a
              compatible smartphone, direct the guest to a digital
              experience built around a property, such as dining, spa,
              facilities and local information. We may also assist
              properties in setting up and updating this content.
              Availability of specific features may vary and is confirmed
              at the point of enquiry.
            </p>
          ),
        },
        {
          heading: "3. Enquiries and Orders",
          body: (
            <p>
              Any enquiry, quote or order arranged through our Website or
              by email is not binding until confirmed in writing by us. We
              reserve the right to decline any enquiry or order at our
              discretion, for example where required information is
              incomplete or where we are unable to fulfil the request.
            </p>
          ),
        },
        {
          heading: "4. Intellectual Property",
          body: (
            <p>
              All content on this Website, including text, graphics, logos
              and design, is owned by or licensed to Informax and is
              protected by copyright and other intellectual property laws.
              You may not copy, reproduce or distribute any part of this
              Website without our prior written consent. Content that a
              property publishes within its own Informax directory remains
              that property&rsquo;s intellectual property, and it is
              responsible for ensuring it has the rights to use and
              publish it.
            </p>
          ),
        },
        {
          heading: "5. Acceptable Use",
          body: (
            <p>
              You agree not to use our Website or Service to publish or
              link to any content that is unlawful, defamatory, infringing,
              fraudulent or otherwise harmful, and not to attempt to gain
              unauthorised access to our systems or interfere with the
              operation of our Website or Service.
            </p>
          ),
        },
        {
          heading: "6. Third-Party Links",
          body: (
            <p>
              Our Website and the content accessible through Informax
              directories may contain links to third-party websites or
              content that we do not control. We are not responsible for
              the content, accuracy or practices of any third-party sites,
              and inclusion of a link does not imply endorsement.
            </p>
          ),
        },
        {
          heading: "7. Availability of the Website and Service",
          body: (
            <p>
              We aim to keep our Website and Service available at all
              times, but we do not guarantee uninterrupted or error-free
              operation. We may suspend, withdraw or restrict availability
              of all or part of our Website or Service for business or
              operational reasons, including maintenance and updates.
            </p>
          ),
        },
        {
          heading: "8. Limitation of Liability",
          body: (
            <p>
              To the fullest extent permitted by law, Informax shall not be
              liable for any indirect, incidental or consequential loss
              arising from your use of our Website or Service. Nothing in
              these Terms excludes or limits our liability for death or
              personal injury caused by our negligence, for fraud, or for
              any other liability that cannot be excluded or limited under
              applicable law.
            </p>
          ),
        },
        {
          heading: "9. Indemnity",
          body: (
            <p>
              You agree to indemnify Informax against any claims, losses or
              damages arising from your breach of these Terms or your
              misuse of our Website or Service, including in connection
              with content published within an Informax directory.
            </p>
          ),
        },
        {
          heading: "10. Changes to These Terms",
          body: (
            <p>
              We may update these Terms from time to time. The updated
              version will be posted on this page with a revised
              &ldquo;last updated&rdquo; date, and continued use of our
              Website or Service after changes take effect constitutes
              acceptance of the revised Terms.
            </p>
          ),
        },
        {
          heading: "11. Governing Law",
          body: (
            <p>
              These Terms are governed by the laws of England and Wales,
              and any disputes arising from them shall be subject to the
              exclusive jurisdiction of the courts of England and Wales.
            </p>
          ),
        },
      ]}
    />
  );
}
