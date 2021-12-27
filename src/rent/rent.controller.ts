import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { RentService } from './rent.service';

@Controller('rent')
export class RentController {
  constructor(private readonly rentService: RentService) {}

  @Get('')
  async getAll() {
    return await this.rentService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.rentService.getOne(id);
  }

  @Post('')
  async create(@Body() createRentDto: any) {
    return await this.rentService.create(createRentDto);
  }
}
