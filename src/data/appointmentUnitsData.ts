export interface AppointmentUnitItem {
  code: string;
  slug: string;
  name: string;
  city: string;
  state: string;
  locationLabel: string;
  phone: string;
}

export const APPOINTMENT_UNITS: AppointmentUnitItem[] = [
  {
    code: 'smg',
    slug: 'bookappointment-smg',
    name: 'Sankara Eye Hospital, Shimoga',
    city: 'Shimoga',
    state: 'Karnataka',
    locationLabel: 'Shimoga (Karnataka)',
    phone: '08182-222099'
  },
  {
    code: 'blr',
    slug: 'bookappointment-blr',
    name: 'Sankara Eye Hospital, Bangalore',
    city: 'Bangalore',
    state: 'Karnataka',
    locationLabel: 'Bangalore (Karnataka)',
    phone: '080-69038900'
  },
  {
    code: 'cbe',
    slug: 'bookappointment-cbe',
    name: 'Sankara Eye Hospital, Coimbatore (Mission Head Quarters)',
    city: 'Coimbatore',
    state: 'Tamil Nadu',
    locationLabel: 'Coimbatore Mission Head Quarters (Tamil Nadu)',
    phone: '0422-3116789'
  },
  {
    code: 'cbecity',
    slug: 'bookappointment-cbecity',
    name: 'Sankara Eye Hospital, Coimbatore (City Centre)',
    city: 'Coimbatore (RS Puram)',
    state: 'Tamil Nadu',
    locationLabel: 'Coimbatore City RS Puram (Tamil Nadu)',
    phone: '0422-3106789'
  },
  {
    code: 'gtr',
    slug: 'bookappointment-gtr',
    name: 'Sankara Eye Hospital, Guntur',
    city: 'Guntur',
    state: 'Andhra Pradesh',
    locationLabel: 'Guntur (Andhra Pradesh)',
    phone: '0863-2347800'
  },
  {
    code: 'jpr',
    slug: 'bookappointment-jpr',
    name: 'Sankara Eye Hospital, Jaipur',
    city: 'Jaipur',
    state: 'Rajasthan',
    locationLabel: 'Jaipur (Rajasthan)',
    phone: '0141-2256900'
  },
  {
    code: 'knp',
    slug: 'bookappointment-knp',
    name: 'Sankara Eye Hospital, Kanpur',
    city: 'Kanpur',
    state: 'Uttar Pradesh',
    locationLabel: 'Kanpur (Uttar Pradesh)',
    phone: '0512-2891000'
  },
  {
    code: 'knk',
    slug: 'bookappointment-knk',
    name: 'Sankara Eye Hospital, Krishnankoil',
    city: 'Krishnankoil',
    state: 'Tamil Nadu',
    locationLabel: 'Krishnankoil (Tamil Nadu)',
    phone: '04563-289029'
  },
  {
    code: 'ldh',
    slug: 'bookappointment-ldh',
    name: 'Sankara Eye Hospital, Ludhiana',
    city: 'Ludhiana',
    state: 'Punjab',
    locationLabel: 'Ludhiana (Punjab)',
    phone: '0161-5202000'
  },
  {
    code: 'ind',
    slug: 'bookappointment-ind',
    name: 'Sankara Eye Hospital, Indore',
    city: 'Indore',
    state: 'Madhya Pradesh',
    locationLabel: 'Indore (Madhya Pradesh)',
    phone: '0731-4744747'
  },
  {
    code: 'pvl',
    slug: 'bookappointment-pvl',
    name: 'Sankara Eye Hospital, Panvel (Navi Mumbai)',
    city: 'Navi Mumbai',
    state: 'Maharashtra',
    locationLabel: 'Panvel / Navi Mumbai (Maharashtra)',
    phone: '022-65454300'
  },
  {
    code: 'hyd',
    slug: 'bookappointment-hyd',
    name: 'Sankara Eye Hospital, Hyderabad',
    city: 'Hyderabad',
    state: 'Telangana',
    locationLabel: 'Hyderabad (Telangana)',
    phone: '040-23456600'
  },
  {
    code: 'vns',
    slug: 'bookappointment-vns',
    name: 'RJ Sankara Eye Hospital, Varanasi',
    city: 'Varanasi',
    state: 'Uttar Pradesh',
    locationLabel: 'Varanasi (Uttar Pradesh)',
    phone: '0542-3506789'
  },
  {
    code: 'and',
    slug: 'bookappointment-and',
    name: 'Sankara Eye Hospital, Anand',
    city: 'Anand',
    state: 'Gujarat',
    locationLabel: 'Anand (Gujarat)',
    phone: '02692-280450'
  }
];

export function getUnitByRouteOrCode(routeOrCode: string): AppointmentUnitItem | undefined {
  const clean = routeOrCode.toLowerCase().replace(/^[/#]+/, '').replace(/^book-?appointment-?/, '');
  return APPOINTMENT_UNITS.find(u => 
    u.code.toLowerCase() === clean ||
    u.slug.toLowerCase() === clean ||
    u.city.toLowerCase() === clean ||
    clean.includes(u.code) ||
    clean.includes(u.city.toLowerCase())
  );
}
