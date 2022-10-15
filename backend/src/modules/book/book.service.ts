import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, PaginateQuery } from 'nestjs-paginate';
import { Category } from 'src/modules/category/entities/category.entity';
import { ApiException } from 'src/exceptions';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { EvaluationService } from '../evaluation/evaluation.service';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly evaluationService: EvaluationService,
  ) {}

  create(createBookDto: CreateBookDto) {
    return 'This action adds a new book';
  }

  async findAll(query: PaginateQuery) {
    return paginate(query, this.bookRepository, {
      sortableColumns: [
        'category_id',
        // @ts-ignore
        'evaluation_score',
        // @ts-ignore
        'evaluation_quantity',
      ],
      nullSort: 'last',
      // searchableColumns: [],
      // @ts-ignore
      defaultSortBy: [['book_id', 'DESC']],
      relations: ['category'],
      maxLimit: 20,
    });
  }

  async findCategories() {
    const res = await this.categoryRepository.find();

    return res;
  }

  async findAllEvaluations(bookId: number) {
    const evaluations = await this.evaluationService.findAllByBookId(bookId);
    return {
      evaluations,
      total: evaluations.length,
    };
  }

  async findOne(bookId: number) {
    this.bookRepository.createQueryBuilder().relation(Category, 'ca');
    const book = await this.bookRepository.findOne({
      where: { book_id: bookId },
      relations: ['category'],
    });
    if (book == null) throw ApiException.notFound();
    return book;
  }

  async enjoy(payload: { memberId: number; evaluationId: number }) {
    const { evaluationId, memberId } = payload;
    return this.evaluationService.enjoy(evaluationId, memberId);
  }

  async cancelEnjoy(payload: { memberId: number; evaluationId: number }) {
    const { evaluationId, memberId } = payload;
    return this.evaluationService.cancelEnjoy(evaluationId, memberId);
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
