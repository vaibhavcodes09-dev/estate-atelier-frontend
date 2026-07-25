import {
  HiOutlineHome,
  HiOutlineBuildingOffice2,
  HiOutlineMapPin,
  HiOutlineCurrencyDollar,
  HiOutlineChartBar,
  HiOutlineCog6Tooth,
  HiOutlineDocumentText,
  HiOutlineKey,
} from 'react-icons/hi2';

export const NAV_LINKS = [
  { label: 'Cities', href: '#cities' },
  { label: 'Properties', href: 'properties' },
  { label: 'Manage', href: '#manage' },
  { label: 'Finance', href: '#finance' },
];

export const heroImages = [
  {
    id: 1,
    image:
      "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    id: 2,
    image:
      "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    id: 3,
    image:
      "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    id: 4,
    image:
      "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
];


export const SERVICE_ICONS = {
  home: HiOutlineHome,
  office: HiOutlineBuildingOffice2,
  map: HiOutlineMapPin,
  dollar: HiOutlineCurrencyDollar,
  chart: HiOutlineChartBar,
  cog: HiOutlineCog6Tooth,
  doc: HiOutlineDocumentText,
  key: HiOutlineKey,
};
