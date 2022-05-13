import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Player, PlayerDocument } from '../schemas/player.schema';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import {
  PlayerImage,
  PlayerImageDocument,
} from '../schemas/playerImage.schema';
import { logger } from './player.module';
import { CreatePlayerImageDto } from './dto/create-player-image.dto';

@Injectable()
export class PlayerService {
  constructor(
    @InjectModel(Player.name) private playerModel: Model<PlayerDocument>,
    @InjectModel(PlayerImage.name)
    private playerImageModel: Model<PlayerImageDocument>,
  ) {}

  async getAll(): Promise<Player[] | void> {
    try {
      return this.playerModel.find().populate('playerImage');
    } catch (err) {
      return logger.error(`Service. Error: ${JSON.stringify(err)}`);
    }
  }

  async getById(id: string): Promise<Player | void> {
    try {
      return this.playerModel.findById(id).populate('playerImage'); //FIXME maybe will be fucked
    } catch (err) {
      return logger.error(`Service. Error: ${JSON.stringify(err)}`);
    }
  }

  async create(playerDto: CreatePlayerDto): Promise<Player | void> {
    const newPlayer = new this.playerModel(playerDto);
    try {
      return newPlayer.save();
    } catch (err) {
      return logger.error(`Service. Error: ${JSON.stringify(err)}`);
    }
  }

  async createImage(
    playerImageDto: CreatePlayerImageDto,
  ): Promise<PlayerImage | void> {
    const newPlayerImage = new this.playerImageModel(playerImageDto);
    try {
      return newPlayerImage.save();
    } catch (err) {
      return logger.error(`Service. Error: ${JSON.stringify(err)}`);
    }
  }

  async remove(id: string): Promise<Player | void> {
    try {
      return this.playerModel.findByIdAndRemove(id);
    } catch (err) {
      return logger.error(`Service. Error: ${JSON.stringify(err)}`);
    }
  }

  async update(id: string, playerDto: UpdatePlayerDto): Promise<Player | void> {
    try {
      return this.playerModel.findByIdAndUpdate(id, playerDto, { new: true });
    } catch (err) {
      return logger.error(`Service. Error: ${JSON.stringify(err)}`);
    }
  }
}
