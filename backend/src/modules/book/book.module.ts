import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Category } from 'src/modules/category/entities/category.entity';
import { Evaluation } from '../evaluation/entities/evaluation.entity';
import { EvaluationModule } from '../evaluation/evaluation.module';
import { EvaluationService } from '../evaluation/evaluation.service';
import { MemberEvaluationState } from '../evaluation/entities/member_evaluation_state.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Book,
      Category,
      Evaluation,
      MemberEvaluationState,
    ]),
    EvaluationModule,
  ],
  controllers: [BookController],
  providers: [BookService, EvaluationService],
})
export class BookModule {}
