import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, MaxLength } from 'class-validator';
import { SingleDate } from 'src/common/dto/single-date.dto';

export class EventListDto {
  @ApiProperty({
    description: 'List of events',
    example: [
      {
        id: 1,
        name: 'A super great birthday party',
      },
    ],
    isArray: true,
  })
  @IsArray()
  @Type(() => EventDto)
  events: Array<EventDto>;
}

export class EventDto {
  @ApiProperty({
    description: 'Event ID',
    example: '1',
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    description: 'Event name',
    example: 'A super great birthday party',
  })
  @IsString()
  name: string;
}

export class GetSingleEventDto {
  @ApiProperty({
    description: 'Event ID',
    example: 1,
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    description: 'Event name',
    example: 'A super great birthday party',
  })
  name: string;

  @ApiProperty({
    description: 'List of event dates',
    example: ['2051-12-24', '2051-12-25', '2051-12-26'],
    isArray: true,
  })
  dates: Array<string>;

  @ApiProperty({
    description: 'List of dates and votes for them',
    example: [
      {
        date: '2051-12-24',
        people: ['John', 'Julia', 'Paul', 'Daisy'],
      },
    ],
    isArray: true,
  })
  votes: Array<SingleDate>;
}
