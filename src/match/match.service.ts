import { Injectable } from '@nestjs/common';
import { CreateMatchDto } from './dto/create-match.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Match, MatchDocument } from '../schemas/match.schema';
import { UpdateMatchDto } from './dto/update-match.dto';
import { Command } from 'src/schemas/command.schema';
import { logger } from './match.module';

@Injectable()
export class MatchesService {
  constructor(
    @InjectModel(Match.name) private matchModel: Model<MatchDocument>,
  ) {}

  async getAll(): Promise<Match[] | void> {
    return this.matchModel.find()
      .populate('first_command_id')
      .populate('second_command_id')
      .catch((err) => logger.error('Service.getAll', err));
  }

  async getById(id: string): Promise<Match | void> {
    return this.matchModel.findById(id)
      .populate('first_command_id')
      .populate('second_command_id')
      .catch((err) => logger.error('Service.getById', err));
  }

  async create(matchesDto: CreateMatchDto): Promise<Match | void> {
    const newMatch = new this.matchModel(matchesDto)
    return newMatch.save()
      .catch((err) => logger.error('Service.create', err));
  }

  async remove(id: string): Promise<Match | void> {
    return this.matchModel.findByIdAndRemove(id)
      .catch((err) => logger.error('Service.remove', err));
  }

  async update(id: string, matchDto: UpdateMatchDto): Promise<Match | void> {
    return this.matchModel.findByIdAndUpdate(id, matchDto, { new: true })
      .catch((err) => logger.error('Service.update', err));
  }
}
