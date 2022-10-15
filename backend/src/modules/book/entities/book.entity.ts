import { Category } from 'src/modules/category/entities/category.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn()
  book_id: number;

  @Column({
    type: 'text',
  })
  book_name: string;

  @Column({
    type: 'text',
  })
  sub_title: string;

  @Column({
    type: 'text',
  })
  author: string;

  @Column({
    type: 'text',
  })
  cover: string;

  @Column({
    type: 'text',
  })
  description: string;

  @Column({
    type: 'integer',
    nullable: true,
  })
  category_id: number;

  @Column({
    type: 'real',
  })
  evaluation_score: number;

  @Column({
    type: 'real',
  })
  evaluation_quantity: number;

  @OneToOne((type) => Category, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({
    name: 'category_id',
  })
  category: Category;
}
