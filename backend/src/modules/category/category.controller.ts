import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class BookController {
  constructor(private readonly categoryService: CategoryService) {}
  // @Get()
  // findAll() {
  //   return this.categoryService.findAll()
  // }
}
