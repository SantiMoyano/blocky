package dev.santiagom.blocky.tables.category;

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
}
