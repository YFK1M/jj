import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Player, PlayerDocument } from '../schemas/player.schema';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';

@Injectable()
export class PlayerService {
  constructor(
    @InjectModel(Player.name) private playerModel: Model<PlayerDocument>,
  ) {}

  async getAll(): Promise<Player[]> {
    return this.playerModel.find().exec();
  }

  async getById(id: string) {
    return this.playerModel.findById(id);
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
