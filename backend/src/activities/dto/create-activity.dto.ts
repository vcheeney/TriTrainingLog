import { IsString, IsNumber, IsDateString, IsOptional } from 'class-validator';

export class CreateActivityDto {
  @IsString()
  sport: string;
  @IsNumber()
  distance: number;
  @IsString()
  name: string;
  @IsDateString()
  date: string;
  @IsOptional()
  @IsString()
  note: string;
}
