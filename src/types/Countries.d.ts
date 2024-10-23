
export type AvailableCountriesType = {
    countryCode: string;
    name: string
}

export type InfoCountryType = {
    commonName: string;
    officialName: string;
    countryCode: string;
    region: string;
    borders: InfoCountryType[] | null
}

export type PopulationCountryType = {
    error: boolean;
    msg: string,
    data: {
        country: string,
        code: string,
        iso3: string,
        populationCounts: PopulationCountsType[]
    }
}

type PopulationCountsType = {
    year: number;
    value: number;
}