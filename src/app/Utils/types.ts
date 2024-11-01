export interface JobType {
    _id: string,
    title: string,
    description: string,
    remote: string,
    salary: number,
    country: string,
    state: string,
    city: string,
    jobIcon: string,
    contactName: string,
    contactPhone: string,
    contactPhoto?: string,
    contactEmail: string
    orgId: string,
    type: string,
    createdAt: string,
    isAdmin?: boolean;
}
export interface Country {
    id: number;
    name: string;
    iso3: string;
    iso2: string;
    numeric_code: string;
    phone_code: number;
    capital: string;
    currency: string;
    currency_name: string;
    currency_symbol: string;
    native: string;
    region: string;
    subregion: string;
    emoji: string;
    emojiU: string;
    tld: string;
    latitude: string;
    longitude: string;
}

export interface State {
    id: number;
    name: string;
    state_code: string;
    latitude: string;
    longitude: string;
}

export interface City {
    id: number;
    name: string;
    latitude: string;
    longitude: string;
}