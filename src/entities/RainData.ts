import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index } from 'typeorm';

@Entity('rain_data')
export class RainData {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index()
  @Column({ type: 'varchar', nullable: false })
  userId!: string;

  @Column({ type: 'boolean' })
  rain!: boolean;

  @CreateDateColumn()
  timestamp!: Date;
}
