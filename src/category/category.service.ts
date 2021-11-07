import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Category as CategoryEntity } from 'src/entity/category.entity';
import { Repository } from 'typeorm';
import { categoriesToUpdate } from './dto/category.dto';

@Injectable()
export class CategoryService {
    
    constructor(
        @InjectRepository(CategoryEntity)
        private readonly categoryRepository: Repository<CategoryEntity>,
        ){}

        createCategory(category: CategoryEntity): Observable<CategoryEntity> {
            return from(this.categoryRepository.save(category));
        }

        deleteCategory(category: CategoryEntity): Observable<string> {
            this.categoryRepository.remove(category);
            return of("Category was deleted");
        }

        updateCategory(categories: categoriesToUpdate){
            this.categoryRepository.update({name: categories.categoryToChange}, {name: categories.category});
            return of("Category was updated");
        }

        getAllCategories(): Observable<CategoryEntity[]> {
            return from(this.categoryRepository.find());
        }

        findOneCategory(id: number): Observable<CategoryEntity> {
            return from(this.categoryRepository.findOne(id));
        }
}
