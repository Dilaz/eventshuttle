import {
  Body, Controller,
  Get, Param, Post
} from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateEventDto } from './dto/create-event.dto';
import { EventDto, EventListDto, GetSingleEventDto } from './dto/event.dto';
import { ResultsDto } from './dto/results.dto';
import { VoteDateDto } from './dto/vote-event.dto';
import { EventService } from './event.service';

@Controller({
  path: 'event',
  version: '1',
})
@ApiTags('Event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
          example: 1,
        } ,
      },
    },
  })
  @ApiBody({ description: 'Creates a new event', type: CreateEventDto })
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }

  @Get('list')
  @ApiResponse({
    status: 200,
    description: 'Returns list of events',
    type: EventListDto,
  })
  async findAll() {
    return {
      events: await this.eventService.findAll(),
    };
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: 'number',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Returns a single event',
    type: GetSingleEventDto,
  })
  @ApiNotFoundResponse({ description: 'Event not found' })
  findOne(@Param('id') id: number) {
    return this.eventService.findOne(+id);
  }

  @Post(':id/vote')
  @ApiParam({
    name: 'id',
    type: 'number',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Votes a single date',
    type: [ GetSingleEventDto ],
  })
  @ApiNotFoundResponse({ description: 'Event not found' })
  @ApiBody({ description: 'Vote for dates', type: VoteDateDto })
  vote(@Param('id') id: number, @Body() voteDateDto: VoteDateDto) {
    return this.eventService.vote(+id, voteDateDto);
  }

  @Get(':id/results')
  @ApiParam({
    name: 'id',
    type: 'number',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Responds with dates that are suitable for all participants.',
    type: [ ResultsDto ],
  })
  @ApiNotFoundResponse({ description: 'Event not found' })
  results(@Param('id') id: number) {
    return this.eventService.getResults(+id);
  }
}
