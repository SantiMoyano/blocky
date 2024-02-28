package dev.santiagom.blocky.tables.category;

import dev.santiagom.blocky.tables.category.dtos.CategoryResponseDTO;
import dev.santiagom.blocky.tables.feature.Feature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public List<CategoryResponseDTO> allCategories() {
        List<Category> categories = categoryRepository.findAll();
        return categories.stream()
                .map(category -> new CategoryResponseDTO(category.getId(), category.getName(), category.getColor()))
                .collect(Collectors.toList());
    }

    public CategoryResponseDTO createCategory(Category category) {
        // Save new Category on repository
        categoryRepository.save(
                Category.builder()
                        .name(category.getName())
                        .color(category.getColor())
                        .features(new ArrayList<Feature>())
                        .build()
        );
        // Return simple response
        return new CategoryResponseDTO(null, category.getName(), category.getColor());
    }

    public CategoryResponseDTO updateCategory(Long categoryId, Category category) {
        // Search category by ID on repository
        Category categoryToUpdate = categoryRepository.findById(categoryId).orElseThrow();

        // Update and save category
        categoryToUpdate.setName(category.getName());
        categoryToUpdate.setColor(category.getColor());
        categoryRepository.save(categoryToUpdate);

        // Return response without sensitive data
        return new CategoryResponseDTO(categoryId, category.getName(), category.getColor());
    }
}
