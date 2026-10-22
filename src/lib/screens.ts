/**
 * Real Informax Cloud screens, captured from the application (branch
 * feature/access-points of informax-cloud-v2) with its real views and the
 * product's own fictional demo businesses: The Copper Table (restaurant) and
 * Marlowe Grand Hotel. Nothing is redrawn. How they were made, and how to
 * re-capture them, is in HANDOVER.md ("Informax Cloud screenshots").
 *
 * Crops deliberately leave out the Code address and the printable Code, so
 * no screenshot carries a scannable Code or a web address.
 */
export type Screen = { src: string; alt: string; width: number; height: number };

const phone = (name: string, alt: string): Screen => ({ src: `/cloud/${name}.webp`, alt, width: 780, height: 1688 });
const desk = (name: string, alt: string): Screen => ({ src: `/cloud/${name}.webp`, alt, width: 1800, height: 1125 });

export const SCREENS = {
  // Guest phones: the real guest viewer showing the venue's own PDF.
  guestMenuBefore: phone("g-menu-before", "A guest's phone showing The Copper Table's dinner menu, with line-caught sea bass among the mains"),
  guestMenuAfter: phone("g-menu-after", "A guest's phone showing the updated dinner menu, with roast Cornish hake marked Tonight"),
  guestDirectoryBefore: phone("g-directory-before", "A guest's phone showing the Marlowe Grand guest directory, with dinner from 18:00"),
  guestDirectoryAfter: phone("g-directory-after", "A guest's phone showing the updated guest directory, with new dinner hours from 17:30"),
  guestSpa: phone("g-spa-default", "A guest's phone showing the spa treatments menu"),
  guestSpaOffer: phone("g-spa-offer", "A guest's phone showing this afternoon's spa offer, a signature massage until 18:00"),

  // Staff phones: Informax Cloud on a phone.
  cloudMenuBefore: phone("r-menu-before-phone", "Informax Cloud on a phone: the Restaurant Menu is showing the Dinner menu PDF"),
  cloudMenuReplace: phone("r-menu-replace-phone", "Informax Cloud on a phone: Replace the default menu, with the updated PDF chosen"),
  cloudMenuPublished: phone("r-menu-after-phone", "Informax Cloud on a phone confirming: Published. It is live now."),
  cloudMenuTemporary: phone("r-temporary-phone", "Informax Cloud on a phone: Publish temporary menu, for 2 hours"),
  cloudDirectoryReplace: phone("h-directory-replace-phone", "Informax Cloud on a phone: replacing the guest directory PDF for the Coffee Table Scan Point"),
  cloudDirectoryPublished: phone("h-directory-after-phone", "Informax Cloud on a phone: the Coffee Table now shows the updated guest directory"),
  cloudSpaCompose: phone("h-spa-compose-phone", "Informax Cloud on a phone: publishing temporary spa content that ends at 18:00"),
  cloudSpaTemporary: phone("h-spa-temporary-phone", "Informax Cloud on a phone: Spa this afternoon is showing, ends 18:00 today, then back to Spa treatments"),
  cloudSpacesPhone: phone("h-spaces-phone", "Informax Cloud on a phone: the Spaces of Marlowe Grand Hotel and the Scan Points in each"),
  cloudHotelOverviewPhone: phone("h-overview-phone-v2", "Informax Cloud overview for Marlowe Grand Hotel on a phone"),

  // Desktop.
  deskMenuBefore: desk("r-menu-before-desk", "Informax Cloud on a computer: what a guest sees when they scan the Restaurant Menu Code"),
  deskMenuReplace: desk("r-menu-replace-desk", "Informax Cloud on a computer: replacing the default menu with a new PDF"),
  deskMenuPublished: desk("r-menu-after-desk", "Informax Cloud on a computer: the new menu is live, with every earlier version kept in the history"),
  deskDirectoryPublished: desk("h-directory-after-desk", "Informax Cloud on a computer: the Coffee Table Scan Point showing the updated guest directory"),
  deskSpaCompose: desk("h-spa-compose-desk", "Informax Cloud on a computer: publishing temporary content with an end time of 18:00"),
  deskSpaTemporary: desk("h-spa-temporary-desk", "Informax Cloud on a computer: temporary spa content showing until 18:00, then back to the spa treatments menu"),
  deskHotelOverview: desk("h-overview-v2", "Informax Cloud overview for Marlowe Grand Hotel: Spaces, active Codes and temporary content running now"),
  deskSpaces: desk("h-spaces", "Informax Cloud: the Spaces of Marlowe Grand Hotel (Bedrooms, Spa, The Garden Room, Public Areas) and the Scan Points in each"),
  deskBedrooms: desk("h-bedrooms", "Informax Cloud: the Scan Points in Bedrooms, each showing whether its content is live or temporary"),
  deskBulk: desk("h-bulk", "Informax Cloud: update many at once, publishing one PDF to every Bathroom Scan Point"),
} satisfies Record<string, Screen>;

export type ScreenKey = keyof typeof SCREENS;
