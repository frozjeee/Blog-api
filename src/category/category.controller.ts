import { Body, Controller, Get, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Category } from 'src/entity/category.entity';
import { CategoryService } from './category.service';
import { categoryToUpdate } from './dto/category.dto';
import { CategoryInterface } from './interface/category.interface';

@Controller('category')
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService,
    ) {}

    @Post('create')
    createCategory(@Body() category: CategoryInterface): Observable<CategoryInterface> {
        return this.categoryService.createCategory(category);
    }

    @Post('update')
    updateCategory(@Body() categoryToUpdate: categoryToUpdate){
        return this.categoryService.updateCategory(categoryToUpdate);
    }

    @Post('delete')
    deleteCategory(@Body() category: CategoryInterface){
        return this.categoryService.deleteCategory(category);
    }

    @Post('findOne')
    findOne(@Body() category: string){
        return this.categoryService.findOneCategory(category);
    }

    @Get('getAll')
    getAllCategories(): Observable<CategoryInterface[]> {
        return this.categoryService.getAllCategories();
    }
}
