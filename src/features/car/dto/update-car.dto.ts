import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class UpdateCarDto {
  @IsString()
  @IsOptional()
  brand?: string;

  @IsString()
  @IsOptional()
  model?: string;

  @IsNumber()
  @IsOptional()
  year?: number;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsBoolean()
  @IsOptional()
  available?: boolean;

  @IsString()
  @IsOptional()
  category?: string; // ObjectId as string

  @IsString()
  @IsOptional()
  owner?: string; // ObjectId as string
}
