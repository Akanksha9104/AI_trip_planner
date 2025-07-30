export type City = {
  name: string;
  id: string;
};

export type Country = {
  name: string;
  id: string;
  cities: City[];
};

export const countries: Country[] = [
  {
    name: "India",
    id: "in",
    cities: [
      { name: "New Delhi", id: "del" },
      { name: "Mumbai", id: "mum" },
      { name: "Bangalore", id: "ban" },
      { name: "Hyderabad", id: "hyd" },
      { name: "Chennai", id: "che" },
      { name: "Kolkata", id: "kol" },
      { name: "Jaipur", id: "jai" },
      { name: "Ahmedabad", id: "ahm" },
      { name: "Pune", id: "pun" },
      { name: "Goa", id: "goa" },
      { name: "Varanasi", id: "var" },
      { name: "Agra", id: "agr" },
      { name: "Kochi", id: "koc" },
      { name: "Udaipur", id: "uda" },
      { name: "Amritsar", id: "amr" },
      { name: "Shimla", id: "shi" },
      { name: "Darjeeling", id: "dar" },
      { name: "Rishikesh", id: "ris" },
      { name: "Mysore", id: "mys" },
      { name: "Lucknow", id: "luc" }
    ]
  },
  {
    name: "United States",
    id: "us",
    cities: [
      { name: "New York", id: "nyc" },
      { name: "Los Angeles", id: "la" },
      { name: "Chicago", id: "chi" },
      { name: "Miami", id: "mia" },
      { name: "San Francisco", id: "sf" },
      { name: "Las Vegas", id: "lv" },
      { name: "Seattle", id: "sea" },
      { name: "Boston", id: "bos" },
      { name: "Washington DC", id: "dc" },
      { name: "New Orleans", id: "no" },
      { name: "Houston", id: "hou" },
      { name: "Philadelphia", id: "phi" },
      { name: "Phoenix", id: "pho" },
      { name: "San Diego", id: "sd" },
      { name: "Dallas", id: "dal" },
      { name: "Austin", id: "aus" },
      { name: "Denver", id: "den" },
      { name: "Atlanta", id: "atl" },
      { name: "Portland", id: "por" },
      { name: "Nashville", id: "nas" }
    ]
  },
  {
    name: "United Kingdom",
    id: "uk",
    cities: [
      { name: "London", id: "lon" },
      { name: "Manchester", id: "man" },
      { name: "Edinburgh", id: "edi" },
      { name: "Glasgow", id: "gla" },
      { name: "Liverpool", id: "liv" },
      { name: "Birmingham", id: "bir" },
      { name: "Bristol", id: "bri" },
      { name: "Oxford", id: "oxf" },
      { name: "Cambridge", id: "cam" },
      { name: "Bath", id: "bat" },
      { name: "Cardiff", id: "car" },
      { name: "Belfast", id: "bel" },
      { name: "Newcastle", id: "new" },
      { name: "York", id: "yor" },
      { name: "Brighton", id: "bri" },
      { name: "Leeds", id: "lee" },
      { name: "Nottingham", id: "not" },
      { name: "Sheffield", id: "she" },
      { name: "Aberdeen", id: "abe" },
      { name: "Inverness", id: "inv" }
    ]
  },
  {
    name: "France",
    id: "fr",
    cities: [
      { name: "Paris", id: "par" },
      { name: "Nice", id: "nic" },
      { name: "Lyon", id: "lyo" },
      { name: "Marseille", id: "mar" },
      { name: "Bordeaux", id: "bor" },
      { name: "Strasbourg", id: "str" },
      { name: "Toulouse", id: "tou" },
      { name: "Cannes", id: "can" },
      { name: "Montpellier", id: "mon" },
      { name: "Lille", id: "lil" },
      { name: "Avignon", id: "avi" },
      { name: "Chamonix", id: "cha" },
      { name: "Saint-Tropez", id: "sai" },
      { name: "Annecy", id: "ann" },
      { name: "Colmar", id: "col" },
      { name: "Aix-en-Provence", id: "aix" },
      { name: "Dijon", id: "dij" },
      { name: "Reims", id: "rei" },
      { name: "Versailles", id: "ver" },
      { name: "Mont Saint-Michel", id: "mon" }
    ]
  },
  {
    name: "Italy",
    id: "it",
    cities: [
      { name: "Rome", id: "rom" },
      { name: "Venice", id: "ven" },
      { name: "Florence", id: "flo" },
      { name: "Milan", id: "mil" },
      { name: "Naples", id: "nap" },
      { name: "Bologna", id: "bol" },
      { name: "Turin", id: "tur" },
      { name: "Verona", id: "ver" },
      { name: "Palermo", id: "pal" },
      { name: "Siena", id: "sie" },
      { name: "Amalfi Coast", id: "ama" },
      { name: "Cinque Terre", id: "cin" },
      { name: "Pisa", id: "pis" },
      { name: "Lake Como", id: "lak" },
      { name: "Sorrento", id: "sor" },
      { name: "Capri", id: "cap" },
      { name: "Positano", id: "pos" },
      { name: "Genoa", id: "gen" },
      { name: "Sardinia", id: "sar" },
      { name: "Sicily", id: "sic" }
    ]
  },
  {
    name: "Spain",
    id: "es",
    cities: [
      { name: "Madrid", id: "mad" },
      { name: "Barcelona", id: "bar" },
      { name: "Seville", id: "sev" },
      { name: "Valencia", id: "val" },
      { name: "Malaga", id: "mal" },
      { name: "Granada", id: "gra" },
      { name: "Bilbao", id: "bil" },
      { name: "Ibiza", id: "ibi" },
      { name: "San Sebastian", id: "san" },
      { name: "Cordoba", id: "cor" }
    ]
  },
  {
    name: "Germany",
    id: "de",
    cities: [
      { name: "Berlin", id: "ber" },
      { name: "Munich", id: "mun" },
      { name: "Hamburg", id: "ham" },
      { name: "Frankfurt", id: "fra" },
      { name: "Cologne", id: "col" },
      { name: "Dresden", id: "dre" },
      { name: "Stuttgart", id: "stu" },
      { name: "Dusseldorf", id: "dus" },
      { name: "Leipzig", id: "lei" },
      { name: "Nuremberg", id: "nur" }
    ]
  },
  {
    name: "Japan",
    id: "jp",
    cities: [
      { name: "Tokyo", id: "tok" },
      { name: "Kyoto", id: "kyo" },
      { name: "Osaka", id: "osa" },
      { name: "Hiroshima", id: "hir" },
      { name: "Sapporo", id: "sap" },
      { name: "Nara", id: "nar" },
      { name: "Yokohama", id: "yok" },
      { name: "Fukuoka", id: "fuk" },
      { name: "Nagoya", id: "nag" },
      { name: "Kobe", id: "kob" },
      { name: "Hakone", id: "hak" },
      { name: "Nikko", id: "nik" },
      { name: "Kanazawa", id: "kan" },
      { name: "Okinawa", id: "oki" },
      { name: "Takayama", id: "tak" },
      { name: "Mount Fuji", id: "mou" },
      { name: "Kamakura", id: "kam" },
      { name: "Sendai", id: "sen" },
      { name: "Matsumoto", id: "mat" },
      { name: "Himeji", id: "him" }
    ]
  },
  {
    name: "Australia",
    id: "au",
    cities: [
      { name: "Sydney", id: "syd" },
      { name: "Melbourne", id: "mel" },
      { name: "Brisbane", id: "bri" },
      { name: "Perth", id: "per" },
      { name: "Adelaide", id: "ade" },
      { name: "Gold Coast", id: "gol" },
      { name: "Cairns", id: "cai" },
      { name: "Canberra", id: "can" },
      { name: "Darwin", id: "dar" },
      { name: "Hobart", id: "hob" }
    ]
  },
  {
    name: "Canada",
    id: "ca",
    cities: [
      { name: "Toronto", id: "tor" },
      { name: "Vancouver", id: "van" },
      { name: "Montreal", id: "mon" },
      { name: "Calgary", id: "cal" },
      { name: "Ottawa", id: "ott" },
      { name: "Quebec City", id: "que" },
      { name: "Edmonton", id: "edm" },
      { name: "Victoria", id: "vic" },
      { name: "Halifax", id: "hal" },
      { name: "Winnipeg", id: "win" }
    ]
  },
  {
    name: "Brazil",
    id: "br",
    cities: [
      { name: "Rio de Janeiro", id: "rio" },
      { name: "Sao Paulo", id: "sao" },
      { name: "Salvador", id: "sal" },
      { name: "Brasilia", id: "bra" },
      { name: "Fortaleza", id: "for" },
      { name: "Recife", id: "rec" },
      { name: "Manaus", id: "man" },
      { name: "Belo Horizonte", id: "bel" },
      { name: "Porto Alegre", id: "por" },
      { name: "Florianopolis", id: "flo" },
      { name: "Curitiba", id: "cur" },
      { name: "Natal", id: "nat" },
      { name: "Gramado", id: "gra" },
      { name: "Belem", id: "bel" },
      { name: "Goiania", id: "goi" },
      { name: "Vitoria", id: "vit" }
    ]
  },
  {
    name: "China",
    id: "cn",
    cities: [
      { name: "Beijing", id: "bei" },
      { name: "Shanghai", id: "sha" },
      { name: "Guangzhou", id: "gua" },
      { name: "Shenzhen", id: "she" },
      { name: "Chengdu", id: "che" },
      { name: "Xi'an", id: "xia" },
      { name: "Hangzhou", id: "han" },
      { name: "Suzhou", id: "suz" },
      { name: "Nanjing", id: "nan" },
      { name: "Chongqing", id: "cho" },
      { name: "Tianjin", id: "tia" },
      { name: "Guilin", id: "gui" },
      { name: "Kunming", id: "kun" },
      { name: "Lhasa", id: "lha" },
      { name: "Harbin", id: "har" }
    ]
  },
  {
    name: "Thailand",
    id: "th",
    cities: [
      { name: "Bangkok", id: "ban" },
      { name: "Chiang Mai", id: "chi" },
      { name: "Phuket", id: "phu" },
      { name: "Pattaya", id: "pat" },
      { name: "Krabi", id: "kra" },
      { name: "Koh Samui", id: "koh" },
      { name: "Ayutthaya", id: "ayu" },
      { name: "Hua Hin", id: "hua" },
      { name: "Koh Phi Phi", id: "phi" },
      { name: "Chiang Rai", id: "rai" },
      { name: "Sukhothai", id: "suk" },
      { name: "Kanchanaburi", id: "kan" },
      { name: "Pai", id: "pai" }
    ]
  },
  {
    name: "South Africa",
    id: "za",
    cities: [
      { name: "Cape Town", id: "cap" },
      { name: "Johannesburg", id: "joh" },
      { name: "Durban", id: "dur" },
      { name: "Pretoria", id: "pre" },
      { name: "Port Elizabeth", id: "por" },
      { name: "Stellenbosch", id: "ste" },
      { name: "Kruger National Park", id: "kru" },
      { name: "Knysna", id: "kny" },
      { name: "Bloemfontein", id: "blo" },
      { name: "Hermanus", id: "her" },
      { name: "Franschhoek", id: "fra" },
      { name: "Plettenberg Bay", id: "ple" }
    ]
  },
  {
    name: "Mexico",
    id: "mx",
    cities: [
      { name: "Mexico City", id: "mex" },
      { name: "Cancun", id: "can" },
      { name: "Playa del Carmen", id: "pla" },
      { name: "Tulum", id: "tul" },
      { name: "Puerto Vallarta", id: "pue" },
      { name: "Guadalajara", id: "gua" },
      { name: "Oaxaca", id: "oax" },
      { name: "San Miguel de Allende", id: "san" },
      { name: "Merida", id: "mer" },
      { name: "Cabo San Lucas", id: "cab" },
      { name: "Monterrey", id: "mon" },
      { name: "Puebla", id: "pue" },
      { name: "Cozumel", id: "coz" },
      { name: "Chichen Itza", id: "chi" }
    ]
  },
  {
    name: "United Arab Emirates",
    id: "ae",
    cities: [
      { name: "Dubai", id: "dub" },
      { name: "Abu Dhabi", id: "abu" },
      { name: "Sharjah", id: "sha" },
      { name: "Ajman", id: "ajm" },
      { name: "Ras Al Khaimah", id: "ras" },
      { name: "Fujairah", id: "fuj" },
      { name: "Al Ain", id: "ala" },
      { name: "Umm Al Quwain", id: "umm" }
    ]
  },
  {
    name: "Singapore",
    id: "sg",
    cities: [
      { name: "Singapore City", id: "sin" },
      { name: "Sentosa Island", id: "sen" },
      { name: "Jurong", id: "jur" },
      { name: "Changi", id: "cha" },
      { name: "Marina Bay", id: "mar" },
      { name: "Orchard Road", id: "orc" },
      { name: "Chinatown", id: "chi" },
      { name: "Little India", id: "lit" },
      { name: "Bugis", id: "bug" },
      { name: "Kampong Glam", id: "kam" }
    ]
  },
  {
    name: "New Zealand",
    id: "nz",
    cities: [
      { name: "Auckland", id: "auc" },
      { name: "Wellington", id: "wel" },
      { name: "Christchurch", id: "chr" },
      { name: "Queenstown", id: "que" },
      { name: "Rotorua", id: "rot" },
      { name: "Taupo", id: "tau" },
      { name: "Dunedin", id: "dun" },
      { name: "Hamilton", id: "ham" },
      { name: "Napier", id: "nap" },
      { name: "Nelson", id: "nel" },
      { name: "Wanaka", id: "wan" },
      { name: "Milford Sound", id: "mil" },
      { name: "Hobbiton", id: "hob" },
      { name: "Franz Josef", id: "fra" }
    ]
  },
  {
    name: "Egypt",
    id: "eg",
    cities: [
      { name: "Cairo", id: "cai" },
      { name: "Luxor", id: "lux" },
      { name: "Aswan", id: "asw" },
      { name: "Alexandria", id: "ale" },
      { name: "Hurghada", id: "hur" },
      { name: "Sharm El Sheikh", id: "sha" },
      { name: "Giza", id: "giz" },
      { name: "Dahab", id: "dah" },
      { name: "Marsa Alam", id: "mar" },
      { name: "El Gouna", id: "elg" },
      { name: "Abu Simbel", id: "abu" },
      { name: "Siwa Oasis", id: "siw" }
    ]
  },
  {
    name: "Turkey",
    id: "tr",
    cities: [
      { name: "Istanbul", id: "ist" },
      { name: "Ankara", id: "ank" },
      { name: "Antalya", id: "ant" },
      { name: "Bodrum", id: "bod" },
      { name: "Cappadocia", id: "cap" },
      { name: "Izmir", id: "izm" },
      { name: "Fethiye", id: "fet" },
      { name: "Marmaris", id: "mar" },
      { name: "Pamukkale", id: "pam" },
      { name: "Kusadasi", id: "kus" },
      { name: "Alanya", id: "ala" },
      { name: "Konya", id: "kon" },
      { name: "Trabzon", id: "tra" },
      { name: "Ephesus", id: "eph" }
    ]
  }
];
