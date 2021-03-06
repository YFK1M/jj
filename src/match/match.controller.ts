import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Put,
  Body,
  HttpCode,
  HttpStatus,
  Header,
} from '@nestjs/common';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { MatchesService } from './match.service';
import { Match } from '../schemas/match.schema';

@Controller('match')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Get()
  getAll(): Promise<Match[] | void> {
    return this.matchesService.getAll();
  }

  @Get(':id')
  getMatch(@Param('id') id: string): Promise<Match | void> {
    return this.matchesService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  createMatch(@Body() createMatchDto: CreateMatchDto): Promise<Match | void> {
    return this.matchesService.create(createMatchDto);
  }

  @Delete(':id')
  removeMatch(@Param('id') id: string): Promise<Match | void> {
    return this.matchesService.remove(id);
  }

  @Put(':id')
  updateMatch(
    @Body() updateMatchDto: UpdateMatchDto,
    @Param('id') id: string,
  ): Promise<Match | void> {
    return this.matchesService.update(id, updateMatchDto);
  }
}
