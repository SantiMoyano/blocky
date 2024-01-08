package dev.santiagom.blocky.tables.task;

import dev.santiagom.blocky.tables.category.Category;
import dev.santiagom.blocky.tables.category.CategoryRepository;
import dev.santiagom.blocky.tables.epic.Epic;
import dev.santiagom.blocky.tables.epic.EpicRepository;
import dev.santiagom.blocky.tables.task.dtos.TaskDTO;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@NoArgsConstructor
@AllArgsConstructor
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private EpicRepository epicRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Task> allTasks() {
        return taskRepository.findAll();
    }

    public Task createTask(TaskDTO task) {
        Epic epic = epicRepository.findById(task.getEpicId()).orElseThrow();
        Category category = categoryRepository.findById(task.getCategoryId()).orElseThrow();
        return taskRepository.save(
                Task.builder()
                        .name(task.getName())
                        .category(category)
                        .epic(epic)
                        .build()
        );
    }
}
