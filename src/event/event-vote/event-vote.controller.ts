import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventVoteService } from './event-vote.service';
import { CreateEventVoteDto } from './dto/create-event-vote.dto';
import { UpdateEventVoteDto } from './dto/update-event-vote.dto';

@Controller('event-vote')
export class EventVoteController {
  constructor(private readonly eventVoteService: EventVoteService) {}

  @Post()
  create(@Body() createEventVoteDto: CreateEventVoteDto) {
    return this.eventVoteService.create(createEventVoteDto);
  }

  @Get()
  findAll() {
    return this.eventVoteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventVoteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventVoteDto: UpdateEventVoteDto) {
    return this.eventVoteService.update(+id, updateEventVoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventVoteService.remove(+id);
  }
}
