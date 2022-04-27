import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { Model, LeanDocument } from 'mongoose';
@Injectable()
export class TodosService {
  constructor(
    @InjectModel(Todo.name) private readonly TodoModel: Model<Todo>,
  ) {}
  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.TodoModel.create({
      title: createTodoDto.title,
    });
  }

  findAll() {
    return this.TodoModel.find();
  }

  async findOne(id: string): Promise<LeanDocument<Todo>> {
    return this.TodoModel.findById(id).lean().exec();
  }

  update(id: string, updateTodoDto: UpdateTodoDto) {
    return this.TodoModel.findByIdAndUpdate(id, updateTodoDto, {
      new: true,
      runValidators: true,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
