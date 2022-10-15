import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MemberEvaluationState extends BaseEntity {
  @PrimaryGeneratedColumn()
  mes_id: number;

  @Column('integer')
  evaluation_id: number;

  @Column('integer')
  member_id: number;
}
