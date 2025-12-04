import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
} from '@nestjs/common';

import { AnimalService } from './animal.service';
import { Animal } from './entidades/animal';
import { CriarAnimal } from './dtos/criarAnimal.dto';
import type { Response } from 'express';

@Controller('animal')
class AnimalController {
  constructor(private readonly animalService: AnimalService) {}

  @Get('/all')
  findAll(): Animal[] {
    return this.animalService.findAll();
  }

  @Post('/create')
  create(@Body() animal: CriarAnimal): Animal {    
    return this.animalService.create(animal);
  }

  @Delete('/:nome')
  delete(@Param('nome') nome: string, @Res() res: Response) {
    this.animalService.delete(nome);

    return res.status(204).send();
  }
}

export { AnimalController };