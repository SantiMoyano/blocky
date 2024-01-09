package dev.santiagom.blocky.tables.category;

import dev.santiagom.blocky.tables.category.dtos.CategoryResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/category")
@CrossOrigin(origins = {"http://localhost:3000"})
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public ResponseEntity<List<CategoryResponseDTO>> getAllCategories(){
        return new ResponseEntity<List<CategoryResponseDTO>>(categoryService.allCategories(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<CategoryResponseDTO> createCategory(@RequestBody Category category) {
        return new ResponseEntity<CategoryResponseDTO>(categoryService.createCategory(category), HttpStatus.CREATED);
    }

    @PutMapping("/{categoryId}")
    public ResponseEntity<CategoryResponseDTO> updateCategory(@PathVariable Long categoryId,
                                                              @RequestBody Category category) {
        return new ResponseEntity<CategoryResponseDTO>(categoryService.updateCategory(categoryId, category), HttpStatus.OK);
    }
}
