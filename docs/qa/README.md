# Website QA scripts

Re-run these against a local production build before any release. They need
`playwright-core` and `axe-core` installed somewhere Node can resolve them
(for example `npm i --no-save playwright-core axe-core` in a scratch folder,
then run the scripts from there), and a Chromium (`CHROMIUM=/path/to/chrome`).

```bash
npm run build && npx next start -p 3200
BASE=http://localhost:3200 AXE_JS=<path>/axe.min.js node docs/qa/test-site.mjs        # functional, links, axe, copy rules
BASE=http://localhost:3200 node docs/qa/responsive-sweep.mjs <out-dir>                  # 1440/834/390/320, overflow, console errors
BASE=http://localhost:3200 node docs/qa/video-checks.mjs                                # films: lazy loading, one at a time, reduced motion, phone files (SKIP until built)
```

Enquiry end to end without sending email: start the production build with a
dummy key and the Resend interceptor, then submit the real form.

```bash
MOCK_OUT=/tmp/resend.json RESEND_API_KEY=re_test_dummy \
  ENQUIRY_FROM_EMAIL="Informax Enquiries <enquiries@informax.co.uk>" \
  NODE_OPTIONS="--import $PWD/docs/qa/mock-resend.mjs" npx next start -p 3201
BASE=http://localhost:3201 node docs/qa/enquiry-e2e.mjs && cat /tmp/resend.json
```

This proves form → API → email request. It does not prove delivery: after
go-live, send one real enquiry and confirm "Delivered" in resend.com/emails.
