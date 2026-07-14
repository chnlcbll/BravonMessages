const FIRST_NAMES = [
  "Jose", "Juan", "Maria", "Pedro", "Antonio", "Angel", "Mark", "John", "Michael",
  "Christian", "Paul", "Mary", "Anne", "Carlo", "Joshua", "Kevin", "Ryan", "Jason",
  "Bryan", "Justin", "Eric", "Kenneth", "Dennis", "Jeffrey", "Rey", "Richard",
  "Jay", "Jomar", "Jayson", "Alvin", "Arnel", "Ariel", "Edgar", "Eduardo",
  "Danilo", "Romeo", "Roberto", "Ricardo", "Ferdinand", "Reynaldo", "Maricel",
  "Michelle", "Jennifer", "Janice", "Mary Ann", "Grace", "Rowena", "Joy",
  "Shirley", "Arlene", "Josephine", "Jocelyn", "Marissa", "Irene", "Lilibeth",
  "Emily", "Marilyn", "Helen", "Luz", "Jobert", "Raffy", "Bong", "Leni",
  "Kiko", "Manny", "Isko", "Sara", "Risa", "Bam", "Chel", "Leila", "Bato",
  "Robin", "Jinggoy", "Bongbong", "Gibo", "Migz", "Chiz", "Grace", "Loren",
  "Nadine", "Liza", "Kathryn", "Daniel", "Enrique", "James", "Alden", "Maine",
  "Dingdong", "Marian", "Piolo", "Judy Ann", "Regine", "Ogie", "Martin", "Gary",
  "Sarah", "Matteo", "Vice", "Anne", "Vhong", "Jhong", "Karylle", "Toni", "Alex",
  "Luis", "Billy", "Coleen", "Kim", "Xian", "Bea", "Gerald", "Maja", "Paulo"
];

const LAST_NAMES = [
  "Santos", "Reyes", "Cruz", "Bautista", "Ocampo", "Garcia", "Mendoza", "Tomas",
  "Andrada", "Castillo", "Flores", "Villanueva", "Perez", "Ramos", "De Leon",
  "Castro", "Dizon", "Aguilar", "Torres", "Dela Cruz", "Tolentino", "Domingo",
  "Pascual", "Cortez", "Ilagan", "Alcantara", "Navarro", "Gonzales", "Aquino",
  "Fernandez", "Lopez", "Gomez", "Alvarez", "Perez", "Marquez", "Rosario",
  "Dela Rosa", "Bautista", "Soriano", "Rivera", "Gutierrez", "Navarro",
  "Salazar", "Mercado", "Bermudez", "Velasco", "Macapagal", "Magsaysay",
  "Estrada", "Arroyo", "Duterte", "Marcos", "Robredo", "Poe", "Defensor",
  "Santiago", "Legarda", "Cayetano", "Villar", "Pimentel", "Zubiri", "Gordon",
  "Binay", "Honasan", "Revilla", "Lapid", "Enrile", "Drilon", "Recto", "Sotto",
  "Alonzo", "Padilla", "Bernardo", "Soberano", "Lustre", "Reid", "Richards",
  "Mendoza", "Dantes", "Rivera", "Pascual", "Santos", "Velasquez", "Alcasid",
  "Nievera", "Valenciano", "Geronimo", "Guidicelli", "Ganda", "Curtis", "Navarro",
  "Hilario", "Tatlonghari", "Gonzaga", "Manzano", "Crawford", "Garcia", "Chiu",
  "Lim", "Alonzo", "Anderson", "Salvador", "Avelino"
];

const COLORS = ['R', 'O', 'Y', 'G', 'B', 'P'];

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateRandomFilipinoName(): string {
  const first = getRandomItem(FIRST_NAMES);
  const last = getRandomItem(LAST_NAMES);
  return `${first} ${last}`;
}

export function generateRandomPhoneNumber(): string {
  // Philippine numbers typically start with 09 and have 11 digits total.
  // 09XX XXX XXXX
  let num = '09';
  for (let i = 0; i < 9; i++) {
    num += Math.floor(Math.random() * 10).toString();
  }
  return num;
}

export function getRandomColor(): string {
  return getRandomItem(COLORS);
}

export function generatePaymentMessage(name: string, phone: string, color: string): string {
  const refNo = Math.floor(1000000000 + Math.random() * 9000000000).toString();
  
  return `${color}\n${name}\n${phone}\nGash Transfer: You have received Php 50.00 from ${name}. Ref: ${refNo}`;
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}
