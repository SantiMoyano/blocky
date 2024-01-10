package dev.santiagom.blocky.tables.task;

import dev.santiagom.blocky.tables.category.Category;
import dev.santiagom.blocky.tables.category.CategoryRepository;
import dev.santiagom.blocky.tables.epic.Epic;
import dev.santiagom.blocky.tables.epic.EpicRepository;
import dev.santiagom.blocky.tables.subtask.Subtask;
import dev.santiagom.blocky.tables.task.dtos.TaskDTO;
import dev.santiagom.blocky.tables.task.dtos.TaskResponseDTO;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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

    public List<TaskResponseDTO> allTasks() {
        return taskRepository.findAll()
                .stream()
                .map(t -> new TaskResponseDTO(
                        t.getName(),
                        t.getProgress(),
                        t.getCategory().getId(),
                        t.getEpic().getId()))
                .collect(Collectors.toList());
    }

    public TaskResponseDTO createTask(TaskDTO task) {
        Epic epic = epicRepository.findById(task.getEpicId()).orElseThrow();
        Category category = categoryRepository.findById(task.getCategoryId()).orElseThrow();

        taskRepository.save(
                Task.builder()
                        .name(task.getName())
                        .progress(0)
                        .category(category)
                        .epic(epic)
                        .Subtasks(new ArrayList<Subtask>())
                        .build()
        );

        return new TaskResponseDTO(task.getName(), 0, task.getCategoryId(), task.getEpicId());
    }
}
