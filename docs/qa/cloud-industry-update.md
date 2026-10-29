# Cloud and industry website update — 29 October 2026

## Scope and commercial decisions

Five navigation entries: Home, Informax Cloud, Hotels, Restaurants, Pricing. Existing fonts, colour tokens, photographs, video licensing guard and device components are retained. Cloud has the official Cloud header logo. The industry pages explain specific benefits; demo content showcases Informax samples and separately quoted design services.

Final owner prices per property: annual £1,788 upfront (£149/month equivalent); monthly £199 for six months then £249. Monthly first year £2,688; annual saves £900 against that first year, or £1,200 against twelve months at £249. These are total prices with no VAT added. Informax is not currently VAT registered.

Final owner retention decision: three PDFs total per Scan Point, current plus two previous versions, either restorable. Website text reflects this intended policy; implementation is delegated to the Cloud app PR. No production content was deleted. Cloud retention cleanup must be reference-aware.

## Verification

- `npm run lint`: passed, no warnings or errors.
- `npm run build`: passed, TypeScript checked and all 28 routes built.
- `BASE=http://127.0.0.1:3217 node docs/qa/seo-checks.mjs`: all checks passed for the sitemap pages and share images.
- `git diff --check`: passed.
- Signup helper exercised with missing configuration, unsafe schemes, embedded credentials, a valid HTTPS destination and selected-plan preservation. Invalid plans normalise to monthly.
- In-app browser: Home, Cloud, Hotels, Restaurants, Pricing and both signup variants checked at phone and desktop widths; no horizontal overflow or broken loaded images, one h1 per page. Mobile menu opens and navigates to Pricing.
- Final browser repeat after the latest prices, logo and walkthrough changes: Pricing, Cloud and Hotels at 390px and 1440px passed those layout checks. The monthly CTA carries £199 for six months then £249 into the enquiry message. Annual CTA carries £1,788 upfront.
- Cloud header logo verified as Informax Cloud. Hotel walkthrough step three loads the new capture and no artificial phone island covers the app content.

The updated `test-site.mjs` browser suite was not run. Browser checks were performed through the in-app browser, not the shell Playwright suite. No new claim of a completed axe/Lighthouse run is made.

## Capture provenance and limitations

`public/cloud/h-spa-compose-20261029.jpg` is a fresh, unedited 390×844 in-app-browser capture of the current Development app, branch feature/content-calendar, at the Bathroom Scan Point. The Informax-owned harmless sample Spa this afternoon PDF was selected locally in the dialog; nothing was published or saved to the account. Other captures are the existing fictional demo assets described in HANDOVER.md. Source captions identify the demonstration as a development preview.

Proof images are saved in this chat outputs directory: Informax-website-home-desktop.jpg, Informax-website-home-phone.jpg, Informax-Cloud-website-preview.jpg, Informax-website-pricing.jpg.

## Connection and release status

No production website release, DNS change, live payment or email send was performed. Missing CLOUD_SIGNUP_URL intentionally offers a setup request through the existing enquiry form and clearly states no payment/account has been created. Configure the verified Cloud HTTPS subscription entry only after the app route, plan mapping and live billing are ready; retain development status until then. The app PR is https://github.com/tylerokkers-lang/-informax-cloud-v2/pull/37; Claude received the final pricing and three-version corrections and began implementing them. The app is separately maintained and has not been verified by these website checks.
