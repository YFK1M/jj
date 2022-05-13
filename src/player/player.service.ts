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

@Injectable()
export class PlayerService {
  constructor(
    @InjectModel(Player.name) private playerModel: Model<PlayerDocument>,
    @InjectModel(PlayerImage.name)
    private PlayerImageModel: Model<PlayerImageDocument>,
  ) {}

  async getAll(): Promise<Player[] | void> {
    try {
      return this.playerModel.find().exec();
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

  async create(playerDto: CreatePlayerDto): Promise<Player> {
    const newPlayer = new this.playerModel(playerDto);
    return newPlayer.save();
  }

  async remove(id: string): Promise<Player> {
    return this.playerModel.findByIdAndRemove(id);
  }

  async update(id: string, playerDto: UpdatePlayerDto): Promise<Player> {
    return this.playerModel.findByIdAndUpdate(id, playerDto, { new: true });
  }
}
