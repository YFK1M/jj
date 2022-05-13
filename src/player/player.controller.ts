import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PlayerService } from './player.service';
import { Player } from '../schemas/player.schema';
import { CreatePlayerDto } from './dto/create-player.dto';

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get('get-all')
  getAll(): Promise<Player[]> {
    return this.playerService.getAll();
  }

  @Get(':id')
  getPlayer(@Param('id') id: string): Promise<Player> {
    return this.playerService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  createMatch(@Body() createPlayerDto: CreatePlayerDto): Promise<Player> {
    return this.playerService.create(createPlayerDto);
  }

  @Delete(':id')
  removeMatch(@Param('id') id: string): Promise<Player> {
    return this.playerService.remove(id);
  }

  @Put(':id')
  updateMatch(
    @Body() updateMatchDto: CreatePlayerDto,
    @Param('id') id: string,
  ): Promise<Player> {
    return this.playerService.update(id, updateMatchDto);
  }
}
