import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateEvaluationDto {
  @IsNotEmpty()
  book_id: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  content: string;

  @IsNumber()
  @Min(0)
  @Max(5)
  score: number;
}
