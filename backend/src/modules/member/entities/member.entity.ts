import { Exclude } from 'class-transformer';
import { hash } from 'src/utils/crypt';
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Member extends BaseEntity {
  @PrimaryGeneratedColumn()
  member_id: number;

  @Column({
    unique: true,
    type: 'text',
  })
  username: string;

  @Column({
    type: 'text',
  })
  @Exclude()
  password: string;

  @Column({
    type: 'text',
  })
  nickname: string;

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.password = hash(this.password);
  }
}
