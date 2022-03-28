import {
  IsString,
  IsNumber,
  IsDateString,
  IsOptional,
  IsNotEmpty,
  Min,
} from 'class-validator';

export class CreateActivityDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  sport: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  distance: number;

  @IsDateString()
  @IsNotEmpty()
  date: string;

  @IsOptional()
  @IsString()
  note: string;
}
