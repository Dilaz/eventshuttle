import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsDate,
  IsString,
  Length,
} from 'class-validator';

export class VoteDateDto {
  @ApiProperty({
    description: "Attendee's name",
    example: 'Dick',
  })
  @IsString()
  @Length(2, 250)
  name: string;

  @ApiProperty({
    description: 'Event ID',
    example: ['2051-12-25', '2051-12-26'],
  })
  @IsArray()
  @ArrayMinSize(2)
  @Type(() => IsDate)
  votes: Array<string>;
}
