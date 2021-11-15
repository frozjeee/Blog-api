import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Category as CategoryEntity } from 'src/entity/category.entity';
import { Repository } from 'typeorm';
import { categoryToUpdate } from './dto/category.dto';
import { CategoryInterface } from './interface/category.interface';

@Injectable()
export class CategoryService {
    
    constructor(
        @InjectRepository(CategoryEntity)
        private readonly categoryRepository: Repository<CategoryEntity>,
        ){}

        createCategory(category: CategoryInterface): Observable<CategoryInterface> {
            return from(this.categoryRepository.save(category));
        }

        deleteCategory(category: CategoryInterface): Observable<string> {
            this.categoryRepository.delete(category);
            return of("Category was deleted");
        }

        updateCategory(categoryToUpdate: categoryToUpdate){
            this.categoryRepository.update({id: categoryToUpdate.categoryId}, {name: categoryToUpdate.category});
            return of("Category was updated");
        }

        getAllCategories(): Observable<CategoryInterface[]> {
            return from(this.categoryRepository.find());
        }

        findOneCategory(category: string): Observable<CategoryInterface> {
            return from(this.categoryRepository.findOne(category));
        }
}
