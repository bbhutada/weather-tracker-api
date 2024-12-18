import { Service } from 'typedi';
import { RainData } from '../entities/RainData';
import { AppDataSource } from '../Database';
import { Repository } from 'typeorm';

@Service()
export class RainDataRepository {
  private readonly repository: Repository<RainData>;

  constructor() {
    this.repository = AppDataSource.getRepository(RainData);
  }

  public async getDataByUserId(userId: string): Promise<RainData[]> {
    return await this.repository.find({
      where: { userId },
      order: { timestamp: 'DESC' },
    });
  }

  public async createData(args: { userId: string; rain: boolean }): Promise<RainData> {
    const rainData = this.repository.create({
      userId: args.userId,
      rain: args.rain,
      timestamp: new Date(),
    });
    return await this.repository.save(rainData);
  }
}
