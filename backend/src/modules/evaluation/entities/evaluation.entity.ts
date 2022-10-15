import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Evaluation extends BaseEntity {
  @PrimaryGeneratedColumn()
  evaluation_id: number;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'integer' })
  score: number;

  @Column({ type: 'integer' })
  member_id: number;

  @Column({ type: 'integer' })
  book_id: number;

  @Column({ type: 'integer' })
  enjoy: number;

  @Column({ type: 'text' })
  state: 'enable' | 'disable';

  @Column({ type: 'text', nullable: true })
  disable_reason: string;

  @Column({ type: 'datetime', nullable: true })
  disable_time: Date;

  @CreateDateColumn()
  create_time: Date;

  @UpdateDateColumn()
  update_time: Date;
}
