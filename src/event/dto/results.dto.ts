import { ApiProperty } from "@nestjs/swagger";
import { SingleDate } from "src/common/dto/single-date.dto";

export class ResultsDto {
  @ApiProperty({
    description: 'Event ID',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Event name',
    example: 'A super great birthday party',
  })
  name: string;

  @ApiProperty({
    description: 'List of dates and votes for them',
    example: [{
      date: '2051-12-24',
      people: ['John', 'Julia', 'Paul', 'Daisy'],
    }],
    isArray: true,
  })
  suitableDates: Array<SingleDate>;
}
