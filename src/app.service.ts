import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { AvailableCountriesType, FlagCountryType, InfoCountryType, PopulationCountryType } from './types/Countries';
import { AxiosResponse } from 'axios';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) { }

  async getAvailableCountries(): Promise<AvailableCountriesType[]> {
    try {
      const availableCountries = await this.httpService.axiosRef.
        get<AvailableCountriesType[]>(`${process.env.AVAILABLE_INFO_COUNTRIES_API_URL}/AvailableCountries`)
      return availableCountries.data
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException()
    }
  }

  async getContryInfo(countryId: string): Promise<any> {
    
      const bordersCountry = await this.getBordersCountry(countryId)
      const populationCountry = await this.getPopulationCountry(bordersCountry.commonName)
      const flagCountry = await this.getFlagCountry(countryId)
      return {
        countryData: bordersCountry, 
        population:populationCountry.data.populationCounts,
        flagCountry: flagCountry.data.flag
      }
  }

  async getBordersCountry(countryId: string): Promise<InfoCountryType> {
    try {
      const bordersCountry = await this.httpService.axiosRef.
        get<InfoCountryType>(`${process.env.AVAILABLE_INFO_COUNTRIES_API_URL}/CountryInfo/${countryId}`)
      return bordersCountry.data
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException()
    }
  }

  async getPopulationCountry(country: string): Promise<PopulationCountryType> {
    try {
      const populationDataCountry = await this.httpService.axiosRef.
        post<PopulationCountryType>(`${process.env.COUNTRIESNOW_API_URL}/population`, { country })
      return populationDataCountry.data
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException()
    }
  }

  async getFlagCountry(countryId: string): Promise<FlagCountryType> {
    try {
      const flagCountry = await this.httpService.axiosRef.
        post<FlagCountryType>(`${process.env.COUNTRIESNOW_API_URL}/flag/images`, { iso2: countryId })
      return flagCountry.data
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException()
    }
  }
}
