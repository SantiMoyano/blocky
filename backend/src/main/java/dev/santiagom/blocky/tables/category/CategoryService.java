package dev.santiagom.blocky.tables.category;

import dev.santiagom.blocky.tables.category.dtos.CategoryResponseDTO;
import dev.santiagom.blocky.tables.task.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> allCategories() {
         return categoryRepository.findAll();
    }

    public Category createCategory(Category category) {
        return categoryRepository.save(
                Category.builder()
                        .name(category.getName())
                        .color(category.getColor())
                        .tasks(new ArrayList<Task>())
                        .build()
        );
    }

    public CategoryResponseDTO updateCategory(Long categoryId, Category category) {
        // Search category by ID on repository
        Category categoryToUpdate = categoryRepository.findById(categoryId).orElseThrow();

        // Update and save category
        categoryToUpdate.setName(category.getName());
        categoryToUpdate.setColor(category.getColor());
        categoryRepository.save(categoryToUpdate);

        // Return response without sensitive data
        return new CategoryResponseDTO(category.getName(), category.getColor());
    }
}
