import { IsString, IsNotEmpty, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateCarDto {
  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsNumber()
  year: number;

  @IsNumber()
  price: number;

  @IsBoolean()
  @IsOptional()
  available?: boolean;

  @IsString()
  @IsNotEmpty()
  category: string; 

  @IsString()
  @IsOptional()
  owner?: string; 
}
