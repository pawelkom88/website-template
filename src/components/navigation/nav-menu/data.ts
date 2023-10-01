interface NavItem {
  text: string;
  href?: string;
  dropdown?: boolean;
  iconSrc?: string;
  dropdownItems?: Partial<NavItem>[];
}

export const navItems: NavItem[] = [
  { text: "Home", href: "/", dropdown: false },
  { text: "About", href: "/about-our-company", dropdown: false },
  {
    text: "Services",
    dropdown: true,
    iconSrc:
      "https://d33wubrfki0l68.cloudfront.net/ddd4ab9e3e9a3f35d87c06ac91bcc6db9de375e5/61d7d/assets/images/down.svg",
    dropdownItems: [
      { text: "Service 1", href: "/service1" },
      { text: "Service 2", href: "/service2" },
    ],
  },
  { text: "Contact", href: "/contact-us", dropdown: false },
];
