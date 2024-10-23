import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getAvailableContries(): Promise<any> {
    return await  this.appService.getAvailableCountries();
  }

  @Get('country/:id')
  async getInfoContry(@Param('id') countryId:string){

    return await this.appService.getContryInfo(countryId);
  }
}
