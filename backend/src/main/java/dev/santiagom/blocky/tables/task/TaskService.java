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

    public List<TaskResponseDTO> allTasks(Long epicId) {
        return taskRepository.findAllByEpic_Id(epicId)
                .stream()
                .map(t -> new TaskResponseDTO(
                        t.getId(),
                        t.getName(),
                        t.getDescription(),
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
                        .description(task.getDescription())
                        .progress(0)
                        .category(category)
                        .epic(epic)
                        .Subtasks(new ArrayList<Subtask>())
                        .build()
        );

        return new TaskResponseDTO(null, task.getName(), task.getDescription(), 0, task.getCategoryId(), task.getEpicId());
    }

    public TaskResponseDTO updateTask(Long taskId, TaskDTO task) {
        // Retrieve the task to be updated from the repository
        Task taskToUpdate = taskRepository.findById(taskId).orElseThrow();

        // Update task details with the new data
        taskToUpdate.setName(task.getName());
        taskToUpdate.setDescription(task.getDescription());

        // Check if a new category is selected and update the task's category accordingly
        if (taskToUpdate.getCategory().getId() != task.getCategoryId()) {
            Category newCategory = categoryRepository.findById(task.getCategoryId()).orElseThrow();
            taskToUpdate.setCategory(newCategory);
        }
        taskRepository.save(taskToUpdate);

        // Return a TaskResponseDTO containing the updated task details
        return new TaskResponseDTO(
                taskId,
                task.getDescription(),
                task.getName(),
                taskToUpdate.getProgress(),
                task.getCategoryId(),
                task.getEpicId());
    }

    public TaskResponseDTO getTaskDetails(Long id) {
        Task task = taskRepository.findById(id).orElseThrow();
        return new TaskResponseDTO(
                task.getId(),
                task.getName(),
                task.getDescription(),
                task.getProgress(),
                task.getCategory().getId(),
                task.getEpic().getId());
    }

    public TaskResponseDTO deleteTask(Long taskId) {
        Task task = taskRepository.findById(taskId).orElseThrow();
        taskRepository.delete(task);
        return new TaskResponseDTO(
                task.getId(),
                task.getName(),
                task.getDescription(),
                task.getProgress(),
                task.getCategory().getId(),
                task.getEpic().getId());
    }

    public void updateProgress(Long taskId, int percentageCompleted) {
        Task task = taskRepository.findById(taskId).orElseThrow();
        task.setProgress(percentageCompleted);
        taskRepository.save(task);
    }
}
