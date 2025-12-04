import { BadRequestException, Injectable } from '@nestjs/common';
import { Animal } from './entidades/animal';
import { CriarAnimal } from './dtos/criarAnimal.dto';

@Injectable()
class AnimalService {
  private animais: Animal[] = [];

  findAll(): Animal[] {
    return this.animais;
  }

  create(animal: CriarAnimal): Animal {
    //Verficar se o gato já existe
    const existAnimal = this.animais.find((c) => c.nome === animal.nome);

    if (existAnimal) {
      throw new BadRequestException('Esse animal já está cadastrado!');
    }
    //Insere o gato no array
    this.animais.push(animal);
    return animal;
  }

  delete(nome: string) {
    //Verifica se o gato existe
    const animalIndex = this.animais.findIndex((animal) => animal.nome === nome);
    
    //Se existir, remove o gato do array
    if (animalIndex === -1) {
      throw new BadRequestException('O animal não foi encontrado!!');
    }
    this.animais.splice(animalIndex, 1);
  }
}

export { AnimalService };