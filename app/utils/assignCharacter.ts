/**
 * Lists of Game of Thrones characters categorized by gender.
 */
const maleCharacters = [
  'Jon Snow',
  'Tyrion Lannister',
  'Eddard Stark',
  'Jaime Lannister',
  'Theon Greyjoy',
  'Robb Stark',
  'Bran Stark',
  'Samwell Tarly',
  'Petyr Baelish',
  'Jorah Mormont'
];

const femaleCharacters = [
  'Daenerys Targaryen',
  'Arya Stark',
  'Sansa Stark',
  'Cersei Lannister',
  'Brienne of Tarth',
  'Catelyn Stark',
  'Ygritte',
  'Missandei',
  'Olenna Tyrell',
  'Margaery Tyrell'
];

/**
 * Assigns a random Game of Thrones character name based on the provided gender.
 * @param gender - The gender to select a character for ('male' or 'female').
 * @returns A randomly selected character name.
 * @throws Error if an invalid gender is provided.
 */
export function assignRandomCharacter(gender: 'male' | 'female'): string {
  let characters: string[];

  if (gender === 'male') {
    characters = maleCharacters;
  } else if (gender === 'female') {
    characters = femaleCharacters;
  } else {
    throw new Error('Invalid gender provided. Must be "male" or "female".');
  }

  const randomIndex = Math.floor(Math.random() * characters.length);
  return characters[randomIndex];
}
