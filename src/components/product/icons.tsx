import type { ReactNode, SVGProps } from "react";

/**
 * The Informax Cloud icon set, recreated for marketing. Paths match the
 * production app's own icons (24px, 1.6 stroke, round caps). Informax Touch
 * is a point with waves around it, Informax Scan is a viewfinder frame;
 * neither suggests the technology behind it.
 */
type P = Omit<SVGProps<SVGSVGElement>, "children"> & { size?: number };

function Icon({ size = 18, children, ...rest }: P & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

export const TouchIcon = (p: P) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="1.9" fill="currentColor" stroke="none" />
    <path d="M8.3 8.3a5.2 5.2 0 0 0 0 7.4M15.7 8.3a5.2 5.2 0 0 1 0 7.4" />
    <path d="M5.3 5.3a9.4 9.4 0 0 0 0 13.4M18.7 5.3a9.4 9.4 0 0 1 0 13.4" opacity=".55" />
  </Icon>
);
export const ScanIcon = (p: P) => (
  <Icon {...p}>
    <path d="M4 8V6.5A2.5 2.5 0 0 1 6.5 4H8M16 4h1.5A2.5 2.5 0 0 1 20 6.5V8M20 16v1.5a2.5 2.5 0 0 1-2.5 2.5H16M8 20H6.5A2.5 2.5 0 0 1 4 17.5V16" />
    <path d="M8 12h8" />
  </Icon>
);
export const DirectIcon = (p: P) => (
  <Icon {...p}>
    <path d="M10.2 13.8a3.6 3.6 0 0 0 5.1 0l2.7-2.7a3.6 3.6 0 0 0-5.1-5.1l-.9.9" />
    <path d="M13.8 10.2a3.6 3.6 0 0 0-5.1 0L6 12.9A3.6 3.6 0 0 0 11.1 18l.9-.9" />
  </Icon>
);
export const DocumentIcon = (p: P) => (
  <Icon {...p}>
    <path d="M7 3.5h6.5L18.5 8.5V19a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 19V5A1.5 1.5 0 0 1 7 3.5Z" />
    <path d="M13.5 3.5v5h5" />
  </Icon>
);
export const WebsiteIcon = (p: P) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M3.5 12h17M12 3.5c2.4 2.5 3.6 5.3 3.6 8.5S14.4 18 12 20.5C9.6 18 8.4 15.2 8.4 12S9.6 6 12 3.5Z" />
  </Icon>
);
export const OpenIcon = (p: P) => (
  <Icon {...p}>
    <path d="M8 16L16 8M9.5 8H16v6.5" />
  </Icon>
);
export const PlusIcon = (p: P) => (
  <Icon {...p}>
    <path d="M12 5.5v13M5.5 12h13" />
  </Icon>
);
export const MoreIcon = (p: P) => (
  <Icon {...p}>
    <circle cx="6" cy="12" r="1.3" fill="currentColor" stroke="none" />
    <circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none" />
    <circle cx="18" cy="12" r="1.3" fill="currentColor" stroke="none" />
  </Icon>
);
export const ChevronRightIcon = (p: P) => (
  <Icon {...p}>
    <path d="M9.5 6l6 6-6 6" />
  </Icon>
);
export const ArrowLeftIcon = (p: P) => (
  <Icon {...p}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </Icon>
);
export const LockIcon = (p: P) => (
  <Icon {...p}>
    <rect x="5" y="10.5" width="14" height="9" rx="2.2" />
    <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" />
  </Icon>
);
export const CheckIcon = (p: P) => (
  <Icon {...p}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </Icon>
);
export const OverviewIcon = (p: P) => (
  <Icon {...p}>
    <rect x="4" y="4" width="6.5" height="6.5" rx="1.8" />
    <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.8" />
    <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.8" />
    <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.8" />
  </Icon>
);
export const HotelIcon = (p: P) => (
  <Icon {...p}>
    <path d="M5 20V6.5A1.5 1.5 0 0 1 6.5 5h6A1.5 1.5 0 0 1 14 6.5V20M14 10h3.5A1.5 1.5 0 0 1 19 11.5V20M3.5 20h17M8 9h3M8 12.5h3M8 16h3" />
  </Icon>
);
export const ActivityIcon = (p: P) => (
  <Icon {...p}>
    <path d="M3.5 12h3.6l2.4-6.5 4 13 2.4-6.5h4.6" />
  </Icon>
);
export const PeopleIcon = (p: P) => (
  <Icon {...p}>
    <circle cx="9.5" cy="8.5" r="3" />
    <path d="M3.8 19a5.7 5.7 0 0 1 11.4 0M16 5.8a3 3 0 0 1 0 5.4M17.5 14.2a5.7 5.7 0 0 1 2.7 4.8" />
  </Icon>
);
export const SettingsIcon = (p: P) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="2.8" />
    <path d="M12 3.5v2.2M12 18.3v2.2M20.5 12h-2.2M5.7 12H3.5M18 6l-1.6 1.6M7.6 16.4L6 18M18 18l-1.6-1.6M7.6 7.6L6 6" />
  </Icon>
);
export const ReceiptIcon = (p: P) => (
  <Icon {...p}>
    <path d="M6 3.5h12v17l-2.5-1.6-2 1.6-1.5-1.6-1.5 1.6-2-1.6L6 20.5v-17Z" />
    <path d="M9 8.5h6M9 12h6" />
  </Icon>
);
export const ScrollIcon = (p: P) => (
  <Icon {...p}>
    <path d="M8 4.5h10.5V17A2.5 2.5 0 0 1 16 19.5H6.5A2.5 2.5 0 0 0 9 17V4.5H8ZM8 4.5A2.5 2.5 0 0 0 5.5 7v1.5H9" />
    <path d="M12 9h3.5M12 12.5h3.5" />
  </Icon>
);
export const SpacesIcon = (p: P) => (
  <Icon {...p}>
    <path d="M12 4l8 4-8 4-8-4 8-4ZM4 12l8 4 8-4M4 16l8 4 8-4" />
  </Icon>
);
export const UserIcon = (p: P) => (
  <Icon {...p}>
    <circle cx="12" cy="8.5" r="3.5" />
    <path d="M5 20a7 7 0 0 1 14 0" />
  </Icon>
);
export const MenuIcon = (p: P) => (
  <Icon {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Icon>
);
