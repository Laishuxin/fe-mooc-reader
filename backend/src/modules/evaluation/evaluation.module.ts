import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EvaluationService } from './evaluation.service';
import { Evaluation } from './entities/evaluation.entity';
import { MemberEvaluationState } from './entities/member_evaluation_state.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Evaluation, MemberEvaluationState])],
  providers: [EvaluationService],
})
export class EvaluationModule {}
