import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  ParseIntPipe,
  DefaultValuePipe,
  HttpCode,
} from '@nestjs/common';
import { merge } from 'lodash';
import { FilterOperator, Paginate, PaginateQuery } from 'nestjs-paginate';
import { CurrentMember } from 'src/decorators/member.decorator';
import { isVoid } from 'src/utils/is';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { EvaluationService } from '../evaluation/evaluation.service';
import { Member } from '../member/entities/member.entity';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';

@Controller('books')
export class BookController {
  constructor(
    private readonly bookService: BookService,
    private readonly evaluationService: EvaluationService,
  ) {}

  private bookSortBy = [
    {
      order_id: 0,
      order_name: '按评价分数降序',
      column: 'evaluation_score',
      order: 'DESC',
    },
    {
      order_id: 1,
      order_name: '按评价分数升序',
      column: 'evaluation_score',
      order: 'ASC',
    },
    {
      order_id: 2,
      order_name: '按评价人数降序',
      column: 'evaluation_quantity',
      order: 'DESC',
    },
    {
      order_id: 3,
      order_name: '按评价人数升序',
      column: 'evaluation_quantity',
      order: 'ASC',
    },
  ];

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/evaluation')
  createEvaluation(
    @CurrentMember() member: Member,
    @Body() createEvaluationDto: CreateEvaluationDto,
  ) {
    const { member_id } = member;
    const payload = merge(createEvaluationDto, { member_id });
    return this.evaluationService.create(payload);
  }

  @Get()
  @HttpCode(200)
  findAll(
    @Paginate() query: PaginateQuery,
    @Query() rawQuery: { category_id?: number; order_id?: number },
  ) {
    // 组装 paginate query
    if (!isVoid(rawQuery.category_id) && rawQuery.category_id != 0) {
      const filter = query.filter || {};
      filter.category_id = `${FilterOperator.EQ}:${rawQuery.category_id}`;
      query.filter = filter;
    }

    if (!isVoid(rawQuery.order_id)) {
      const sort = this.bookSortBy.find(
        (item) => item.order_id == rawQuery.order_id,
      );

      if (sort != null) {
        const sortBy = query.sortBy || [];
        const { column, order } = sort;
        sortBy.push([column, order]);
        query.sortBy = sortBy;
      }
    }

    console.log('query: ', query, rawQuery);
    return this.bookService.findAll(query);
  }

  @Get('/categories')
  getCategories() {
    return this.bookService.findCategories();
  }

  @Get('/meta')
  async getBookMeta() {
    const categories = await this.bookService.findCategories();
    const orders = this.bookSortBy;
    const allCategory = { category_id: 0, category_name: '所有分类' };
    return {
      categories: [allCategory, ...categories],
      orders,
    };
  }

  @Get('/evaluations')
  getEvaluations(@Query('book_id') bookId: number) {
    console.log('book_id', bookId);
    return this.bookService.findAllEvaluations(bookId);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.bookService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/evaluation/:id')
  updateEvaluation(
    @CurrentMember() member: Member,
    @Param('id') id: number,
    @Body() updateEvaluationDto: UpdateEvaluationDto,
  ) {
    const payload = merge(updateEvaluationDto, {
      evaluation_id: id,
      member_id: member.member_id,
    });
    return this.evaluationService.update(payload);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/evaluation/enjoy')
  enjoy(
    @CurrentMember() member: Member,
    @Body('evaluation_id') evaluationId: number,
    @Body('status', ParseIntPipe, new DefaultValuePipe(1)) status = 1,
  ) {
    if (this.isEnjoy(status)) {
      return this.bookService.enjoy({
        evaluationId,
        memberId: member.member_id,
      });
    } else {
      return this.bookService.cancelEnjoy({
        evaluationId,
        memberId: member.member_id,
      });
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(+id, updateBookDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/evaluation/:id')
  removeEvaluation(
    @CurrentMember() member: Member,
    @Param('id') evaluation_id: number,
  ) {
    return this.evaluationService.remove({
      evaluation_id,
      member_id: member.member_id,
    });
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.bookService.remove(+id);
  // }

  private isEnjoy(status: number) {
    return status > 0;
  }
}
