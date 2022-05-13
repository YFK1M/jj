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
import { CreatePlayerImageDto } from './dto/create-player-image.dto';
import { PlayerImage } from '../schemas/playerImage.schema';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { UpdatePlayerImageDto } from './dto/update-player-image.dto';

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get('get-all')
  getAll(): Promise<any | void> {
    return this.playerService.getAll();
  }

  @Get(':id')
  getPlayer(@Param('id') id: string): Promise<Player | void> {
    return this.playerService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  createPlayer(
    @Body() createPlayerDto: CreatePlayerDto,
  ): Promise<Player | void> {
    return this.playerService.create(createPlayerDto);
  }

  @Post('/image')
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  createPlayerImage(
    @Body() createPlayerImageDto: CreatePlayerImageDto,
  ): Promise<PlayerImage | void> {
    return this.playerService.createImage(createPlayerImageDto);
  }

  @Delete(':id')
  removePlayer(@Param('id') id: string): Promise<Player | void> {
    return this.playerService.remove(id);
  }

  @Delete('/image/:id')
  removeImage(@Param('id') id: string): Promise<PlayerImage | void> {
    return this.playerService.removeImage(id);
  }

  @Put(':id')
  updatePlayer(
    @Body() updatePlayerDto: UpdatePlayerDto,
    @Param('id') id: string,
  ): Promise<Player | void> {
    return this.playerService.update(id, updatePlayerDto);
  }

  @Put('/image/:id')
  updatePlayerImage(
    @Body() updatePlayerImageDto: UpdatePlayerImageDto,
    @Param('id') id: string,
  ): Promise<PlayerImage | void> {
    return this.playerService.updateImage(id, updatePlayerImageDto);
  }
}
