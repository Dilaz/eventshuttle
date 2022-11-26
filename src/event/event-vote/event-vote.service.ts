import { Injectable } from '@nestjs/common';
import { CreateEventVoteDto } from './dto/create-event-vote.dto';
import { UpdateEventVoteDto } from './dto/update-event-vote.dto';

@Injectable()
export class EventVoteService {
  create(createEventVoteDto: CreateEventVoteDto) {
    return 'This action adds a new eventVote';
  }

  findAll() {
    return `This action returns all eventVote`;
  }

  findOne(id: number) {
    return `This action returns a #${id} eventVote`;
  }

  update(id: number, updateEventVoteDto: UpdateEventVoteDto) {
    return `This action updates a #${id} eventVote`;
  }

  remove(id: number) {
    return `This action removes a #${id} eventVote`;
  }
}
