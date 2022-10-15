import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  category_id: number;

  @Column({ type: 'text' })
  category_name: string;

  @Exclude()
  @CreateDateColumn()
  create_time: Date;

  @Exclude()
  @UpdateDateColumn()
  update_time: Date;
}
