import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsDate,
  Length,
  ValidateNested,
} from 'class-validator';
export class CreateEventDto {
  @ApiProperty({
    description: 'Event name',
    example: 'A super great birthday party',
  })
  @Length(3, 250)
  name: string;

  @ApiProperty({
    type: 'array',
    description: 'List of possible dates for event',
    example: ['2051-12-24', '2051-12-25', '2051-12-26'],
    items: {
      type: 'date',
    },
  })
  @IsArray()
  @ArrayMinSize(2)
  @Type(() => IsDate)
  dates: Array<string>;
}
