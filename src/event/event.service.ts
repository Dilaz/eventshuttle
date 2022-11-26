import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventService {
  /**
   *
   * @param createEventDto
   * @returns
   */
  create(createEventDto: CreateEventDto) {
    return 'This action adds a new event';
  }

  /**
   *
   * @returns
   */
  findAll() {
    return `This action returns all event`;
  }

  /**
   *
   * @param id
   * @returns
   */
  findOne(id: number) {
    return `This action returns a #${id} event`;
  }

  /**
   *
   * @param id
   * @param updateEventDto
   * @returns
   */
  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  /**
   *
   * @param id
   * @returns
   */
  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
