import { Body, Controller, Get, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Category } from 'src/entity/category.entity';
import { CategoryService } from './category.service';
import { categoriesToUpdate } from './dto/category.dto';

@Controller('category')
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService,
    ) {}

    @Post('create')
    createCategory(@Body() category: Category): Observable<Category> {
        return this.categoryService.createCategory(category);
    }

    @Post('update')
    updateCategory(@Body() categories: categoriesToUpdate){
        return this.categoryService.updateCategory(categories);
    }

    @Post('delete')
    deleteCategory(@Body() category: Category){
        return this.categoryService.deleteCategory(category);
    }

    @Get('getAll')
    getAllCategories(): Observable<Category[]> {
        return this.categoryService.getAllCategories();
    }
}
