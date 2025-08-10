import { Data } from '~/types';

export const dataTemplate: Data = {
  unchecked: {
    UncheckedExample: 'https://unchecked.example.com/',
  },
  checked: {
    CheckedExample: 'https://checked.example.com/',
  },
  links: {
    'https://unchecked.example.com/': 'UncheckedExample',
    'https://checked.example.com/': 'CheckedExample',
  },
};
