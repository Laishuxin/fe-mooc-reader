import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterOperator, paginate, PaginateQuery } from 'nestjs-paginate';
import { Category } from 'src/modules/category/entities/category.entity';
import { ApiException } from 'src/exceptions';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { EvaluationService } from '../evaluation/evaluation.service';
import { MemberReadState } from './entities/book-read-state.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(MemberReadState)
    private readonly readStateRepository: Repository<MemberReadState>,

    private readonly evaluationService: EvaluationService,
  ) {}

  create(createBookDto: CreateBookDto) {
    return 'This action adds a new book';
  }

  async findAll(query: PaginateQuery) {
    return paginate(query, this.bookRepository, {
      sortableColumns: ['evaluation_score', 'evaluation_quantity'],
      filterableColumns: {
        category_id: [FilterOperator.EQ],
      },
      nullSort: 'last',
      // searchableColumns: [],
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

  async getReadState(payload: { member_id: number; book_id: number }) {
    const res = await this.readStateRepository.findOneBy(payload);
    if (res == null) throw ApiException.notFound();
    return res;
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

  async updateAllBooks(url: string) {
    // const allBooks = await this.bookRepository.find();
    // let res = [];
    // for (let i = 0; i < allBooks.length; i++) {
    //   const book = allBooks[i];
    //   book.cover = `http://localhost:3000/public${book.cover}`;
    //   // img.mukewang.com/5eb6781900010ba709990502.png
    //   book.description = book.description.replaceAll(
    //     /\/?\/(img|images).*?(png|jpeg|jpg|svg)/g,
    //     (value) => {
    //       if (value.startsWith('//')) {
    //         value = value.substring(1);
    //       }
    //       return `http://localhost:3000/public${value}`;
    //     },
    //   );
    //   book.save();
    // }
    // return res;
    // console.log('allBooks: ', allBooks);
  }
}
