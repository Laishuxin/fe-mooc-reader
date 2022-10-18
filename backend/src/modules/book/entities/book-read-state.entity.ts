import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MemberReadState extends BaseEntity {
  @PrimaryGeneratedColumn()
  rs_id: number;

  @Column({
    type: 'integer',
  })
  book_id: number;

  @Column({
    type: 'integer',
  })
  member_id: number;

  @Column({
    type: 'integer',
  })
  read_state: number;
}
