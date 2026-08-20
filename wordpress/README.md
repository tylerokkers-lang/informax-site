# Publishing this to informax.co.uk (WordPress)

I can't log into your WordPress admin or enter a password myself — that's a hard rule I don't
bypass even with permission. But this folder has everything needed for a 10-minute manual publish.

## What I found about your site

- Theme: **Hello Elementor** (a minimal "blank canvas" theme)
- **Elementor** plugin is active site-wide
- Your homepage (`page-id-107`) is built with native Gutenberg blocks, not Elementor widgets
- The theme's own header is just your logo; the footer is just a copyright line — both very
  minimal, so this is a low-friction site to drop a fully custom-designed page into

## The file

`informax-custom-html-block.html` — the entire new homepage (header, hero, all sections, footer)
with CSS and JS inlined, ready to paste into a single WordPress **Custom HTML** block.

## Steps

1. **Back up first.** Open the existing Home page in the block editor. Use `Cmd/Ctrl+A` to
   select all current blocks, copy them, and paste into a new empty Draft page titled
   "Home — backup". This way you can restore instantly if anything looks wrong. (WordPress also
   keeps automatic revisions under Document → Revisions as a second safety net.)

2. **Clear the live Home page.** Back on the real Home page, select all blocks and delete them.

3. **Add one Custom HTML block.** In the block inserter, search for "Custom HTML" and add it.
   Open `informax-custom-html-block.html` in a text editor, select all, copy, and paste the whole
   thing into that block.

4. **Remove the theme's header/footer for this page** so you don't get double navigation. In the
   editor sidebar, open the **Page** tab → **Template** dropdown, and choose **Elementor Canvas**
   (Elementor is active on your site, so this option should be available on any page regardless of
   how it was built). This strips the theme's default header/footer and lets the page render
   edge-to-edge exactly as designed.

   If you don't see that option, it's not a dealbreaker — Hello Elementor's default header/footer
   are just your logo and a copyright line, so worst case you'll see a thin extra strip above and
   below. Let me know your theme's template options if you want it perfectly clean and I'll adjust.

5. **Preview before publishing.** Use the editor's Preview button and check both desktop and
   mobile views.

6. **Update/Publish.**

7. **Check live.** Load informax.co.uk in a private/incognito window (to bypass cache), test the
   nav links, the FAQ accordion, and the "Get in Touch" button (should open a pre-addressed email
   to info@informax.co.uk, same address as your current site).

## Notes

- Fonts load from Google Fonts (Fraunces + Inter) via the `<link>` tags at the top of the file —
  this is inside the body rather than `<head>`, which works fine in every modern browser but isn't
  strictly spec-correct. If you want it moved into `<head>` properly, that needs a small
  header-injection plugin (e.g. WPCode) or Elementor Pro's custom code field — happy to help once
  you've got one installed.
- Placeholder items to swap before you call it final: the "IX" logo mark (replace with your real
  logo file), and the LinkedIn/Instagram footer links (currently `#`).
- If your host or a security plugin strips `<script>`/`<style>` tags from the Custom HTML block on
  save, it's usually because the logged-in account lacks the `unfiltered_html` capability — normal
  WordPress Administrators have it by default on a single-site install, so this should not come up
  unless a security plugin is explicitly restricting it.
