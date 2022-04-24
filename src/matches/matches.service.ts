import { Injectable } from '@nestjs/common';
import { CreateMatchDto } from './dto/create-match.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Match, MatchDocument } from './schemas/match.schema';
import { UpdateMatchDto } from './dto/update-match.dto';

@Injectable()
export class MatchesService {
  constructor(
    @InjectModel(Match.name) private matchModel: Model<MatchDocument>,
  ) {}

  async getAll(): Promise<Match[]> {
    return this.matchModel.find().exec();
  }

  async getById(id: string) {
    return this.matchModel.findById(id);
  }

  async create(matchesDto: CreateMatchDto): Promise<Match> {
    const newMatch = new this.matchModel(matchesDto);
    return newMatch.save();
  }

  async remove(id: string): Promise<Match> {
    return this.matchModel.findByIdAndRemove(id);
  }

  async update(id: string, matchDto: UpdateMatchDto): Promise<Match> {
    return this.matchModel.findByIdAndUpdate(id, matchDto, { new: true });
  }
}
