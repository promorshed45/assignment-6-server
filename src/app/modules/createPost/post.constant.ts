export const POST_STATUS = {
  FREE: "FREE",
  PREMIUM: "PREMIUM",
} as const;

export const postSearchFelids = ["title", "description"];



export const POST_CATEGORY = {
  BUSINESS_TRAVEL: 'BUSINESS_TRAVEL',
  EXPLORATION: 'EXPLORATION',
  TRAVEL_TIPS: 'TRAVEL TIPS',
  CULTURAL_EXPERIENCES: 'CULTURAL EXPERIENCES',
  DESTINATION_GUIDES: 'DESTINATION GUIDES',
  FOOD_AND_DRINK: 'FOOD AND DRINK',
  ADVENTURE_ACTIVITIES: 'ADVENTURE ACTIVITIES',
} as const;


// export const POST_STATUS = {
//   ACTIVE: 'ACTIVE',
//   DELETED: 'DELETED',
// } as const;

export const DISTRICTS = [
  'Bagerhat',
  'Bandarban',
  'Barguna',
  'Barisal',
  'Bhola',
  'Bogra',
  'Brahmanbaria',
  'Chandpur',
  'Chattogram',
  'Chuadanga',
  'Comilla',
  "Cox's Bazar",
  'Dinajpur',
  'Dhaka',
  'Faridpur',
  'Feni',
  'Gaibandha',
  'Gazipur',
  'Gopalganj',
  'Habiganj',
  'Jamalpur',
  'Jessore',
  'Jhenaidah',
  'Joypurhat',
  'Khagrachari',
  'Khulna',
  'Kishoreganj',
  'Kushtia',
  'Lalmonirhat',
  'Lakshmipur',
  'Magura',
  'Madaripur',
  'Manikganj',
  'Meherpur',
  'Munshiganj',
  'Mymensingh',
  'Narayanganj',
  'Narail',
  'Natore',
  'Naogaon',
  'Netrokona',
  'Narsingdi',
  'Nawabganj',
  'Pabna',
  'Patuakhali',
  'Pirojpur',
  'Panchagarh',
  'Rajbari',
  'Rajshahi',
  'Rangamati',
  'Rangpur',
  'Satkhira',
  'Sherpur',
  'Shariatpur',
  'Sylhet',
  'Thakurgaon',
] as const;

export const PostSearchableFields = ['title', 'location', 'city'];

export const noImage =
  'https://t3.ftcdn.net/jpg/05/79/68/24/360_F_579682479_j4jRfx0nl3C8vMrTYVapFnGP8EgNHgfk.jpg';
