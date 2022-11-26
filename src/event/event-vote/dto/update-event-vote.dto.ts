import { PartialType } from '@nestjs/mapped-types';
import { CreateEventVoteDto } from './create-event-vote.dto';

export class UpdateEventVoteDto extends PartialType(CreateEventVoteDto) {}
