import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { merge } from 'lodash';
import { ENJOY_FAILURE } from 'src/constant/response';
import { ApiException } from 'src/exceptions';
import { Repository } from 'typeorm';
import { UpdateEvaluationDto } from '../book/dto/update-evaluation.dto';
import { Evaluation } from './entities/evaluation.entity';
import { MemberEvaluationState } from './entities/member_evaluation_state.entity';

@Injectable()
export class EvaluationService {
  constructor(
    @InjectRepository(Evaluation)
    private evaluationRepository: Repository<Evaluation>,

    @InjectRepository(MemberEvaluationState)
    private memberEvaluationStateRepository: Repository<MemberEvaluationState>,
  ) {}

  async findOne(evaluationId: number) {
    const evaluation = await this.evaluationRepository.findOneBy({
      evaluation_id: evaluationId,
    });
    if (evaluation == null) throw ApiException.notFound;
    return evaluation;
  }

  async findOneMemberEvaluationState(eId: number, mId: number) {
    const record = await this.memberEvaluationStateRepository.findOneBy({
      evaluation_id: eId,
      member_id: mId,
    });
    if (record != null) {
      return new ApiException(ENJOY_FAILURE);
    }
    return record;
  }

  async findAllByBookId(book_id: number) {
    return this.evaluationRepository.find({
      where: { book_id, state: 'enable' },
      order: { update_time: 'DESC' },
    });
  }

  async enjoy(evaluationId: number, memberId: number) {
    const evaluation = await this.findOne(evaluationId);

    const record = await this.memberEvaluationStateRepository.findOneBy({
      member_id: memberId,
      evaluation_id: evaluationId,
    });
    if (record != null) {
      throw new ApiException(ENJOY_FAILURE);
    }

    const enjoyRecord = new MemberEvaluationState();
    evaluation.enjoy += 1;

    enjoyRecord.evaluation_id = evaluationId;
    enjoyRecord.member_id = memberId;

    await evaluation.save();
    await enjoyRecord.save();
  }

  async cancelEnjoy(evaluationId: number, memberId: number) {
    try {
      const evaluation = await this.findOne(evaluationId);
      const record = await this.memberEvaluationStateRepository.findOneBy({
        member_id: memberId,
        evaluation_id: evaluationId,
      });

      if (record == null) return;
      await record.remove();
      evaluation.enjoy = evaluation.enjoy - 1;
      await evaluation.save();
    } catch (err) {
      throw ApiException.failToUpdate();
    }
  }

  async create(payload: {
    content: string;
    score: number;
    member_id: number;
    book_id: number;
  }) {
    const { member_id, book_id } = payload;
    const count = await this.evaluationRepository.countBy({
      member_id,
      book_id,
    });
    if (count > 0) {
      throw ApiException.failToCreate('评论已存在');
    }

    const data = merge(payload, { enjoy: 0, state: 'enable' } as const);
    const evaluation = await this.evaluationRepository.create(data);

    return evaluation.save();
  }

  async update(
    payload: UpdateEvaluationDto & { evaluation_id: number; member_id: number },
  ) {
    const { member_id, evaluation_id, score, content } = payload;
    const evaluation = await this.evaluationRepository.findOneBy({
      evaluation_id,
      member_id,
    });
    if (evaluation == null) {
      throw ApiException.notFound('评论不存在');
    }

    if (score != null) evaluation.score = score;
    if (content != null) evaluation.content = content;
    await evaluation.save();

    return;
  }

  async remove(payload: { evaluation_id: number; member_id: number }) {
    const { evaluation_id, member_id } = payload;

    await this.evaluationRepository.delete({
      evaluation_id,
      member_id,
    });

    return;
  }
}
