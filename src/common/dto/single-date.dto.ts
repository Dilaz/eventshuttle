import { ApiProperty } from "@nestjs/swagger";

export class SingleDate {
    @ApiProperty({
        description: 'Date as a string',
        example: '2022-11-25',
    })
    date: string;
    
    @ApiProperty({
        description: 'List of attendees names',
        example: ['John', 'Julia', 'Paul', 'Daisy'],
    })
    people: Array<string>;
}
