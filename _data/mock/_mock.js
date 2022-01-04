import { sub } from 'date-fns';
//
import { role } from './role';
import { email } from './email';
import { video } from './video';
import { boolean } from './boolean';
import { company } from './company';
import { phoneNumber } from './phoneNumber';
import { firstName, lastName, fullName } from './name';
import { price, rating, age, percent } from './number';
import { fullAddress, country, countries } from './address';
import {
  jobTitle,
  tourName,
  sentence,
  blogTitle,
  brandsName,
  courseTitle,
  description,
  jobCategories,
} from './text';

// ----------------------------------------------------------------------

const _mock = {
  id: (index) => `e99f09a7-dd88-49d5-b1c8-1daf80c2d7b${index + 1}`,
  email: (index) => email[index],
  phoneNumber: (index) => phoneNumber[index],
  time: (index) => sub(new Date(), { days: index, hours: index }),
  boolean: (index) => boolean[index],
  role: (index) => role[index],
  company: (index) => company[index],
  address: {
    fullAddress: (index) => fullAddress[index],
    country: (index) => country[index],
  },
  name: {
    firstName: (index) => firstName[index],
    lastName: (index) => lastName[index],
    fullName: (index) => fullName[index],
  },
  text: {
    blogTitle: (index) => blogTitle[index],
    courseTitle: (index) => courseTitle[index],
    jobTitle: (index) => jobTitle[index],
    jobCategories: (index) => jobCategories[index],
    tourName: (index) => tourName[index],
    brandsName: (index) => brandsName[index],
    sentence: (index) => sentence[index],
    description: (index) => description[index],
  },
  number: {
    percent: (index) => percent[index],
    rating: (index) => rating[index],
    age: (index) => age[index],
    price: (index) => price[index],
  },
  image: {
    avatar: (index) =>
      `https://zone-assets-api.vercel.app/assets/images/avatars/avatar_${index + 1}.jpg`,
    company: (index) =>
      `https://zone-assets-api.vercel.app/assets/images/companies/company_${index + 1}.png`,
    marketing: (index) =>
      `https://zone-assets-api.vercel.app/assets/images/marketing/marketing_${index + 1}.jpg`,
    //
    travel: (index) =>
      `https://zone-assets-api.vercel.app/assets/images/travel/travel_${index + 1}.jpg`,
    travelLarge: (index) =>
      `https://zone-assets-api.vercel.app/assets/images/travel/travel_hero_${index + 1}.jpg`,
    //
    career: (index) =>
      `https://zone-assets-api.vercel.app/assets/images/career/career_${index + 1}.jpg`,
    course: (index) =>
      `https://zone-assets-api.vercel.app/assets/images/e-learning/course_${index + 1}.jpg`,
  },
  video,
  countries,
  jobTitle,
  jobCategories,
  shareLinks: {
    facebook: `facebook/user-name`,
    instagram: `instagram/user-name`,
    linkedin: `linkedin/user-name`,
    twitter: `twitter/user-name`,
  },
};

export default _mock;
