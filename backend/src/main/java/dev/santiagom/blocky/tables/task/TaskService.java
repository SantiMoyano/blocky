package dev.santiagom.blocky.tables.task;

import dev.santiagom.blocky.tables.task.dtos.TaskDTO;
import dev.santiagom.blocky.tables.task.dtos.TaskResponseDTO;
import dev.santiagom.blocky.tables.feature.Feature;
import dev.santiagom.blocky.tables.feature.FeatureRepository;
import dev.santiagom.blocky.tables.feature.FeatureService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@NoArgsConstructor
@AllArgsConstructor
public class TaskService {

    @Autowired
    private FeatureService featureService;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private FeatureRepository featureRepository;

    public List<TaskResponseDTO> allTasks(Long featureId) {
        return taskRepository.findAllByFeature_Id(featureId)
                .stream()
                .map(t -> new TaskResponseDTO(t.getId(), t.getDescription(), t.isDone(), t.getFeature().getId()))
                .collect(Collectors.toList());
    }

    public TaskResponseDTO createTask(TaskDTO task) {
        Feature feature = featureRepository.findById(task.getFeatureId()).orElseThrow();

        // Create and save new Task
        taskRepository.save(
                Task.builder()
                        .description(task.getDescription())
                        .isDone(false)
                        .feature(feature)
                        .build()
        );
        calculateTaskProgress(feature.getId());

        return new TaskResponseDTO(null, task.getDescription(), false, task.getFeatureId());
    }

    public TaskResponseDTO updateTask(Long taskId, TaskDTO task) {
        Task taskToUpdate = taskRepository.findById(taskId).orElseThrow();

        taskToUpdate.setDescription(task.getDescription());
        taskRepository.save(taskToUpdate);

        return new TaskResponseDTO(taskToUpdate.getId(), task.getDescription(), taskToUpdate.isDone(), taskToUpdate.getFeature().getId());
    }

    public TaskResponseDTO toggleIsDone(Long taskId) {
        Task taskToToggle = taskRepository.findById(taskId).orElseThrow();

        taskToToggle.setDone(!taskToToggle.isDone());
        taskRepository.save(taskToToggle);
        calculateTaskProgress(taskToToggle.getFeature().getId());

        return new TaskResponseDTO(taskId, taskToToggle.getDescription(), taskToToggle.isDone(), taskToToggle.getFeature().getId());
    }

    public TaskResponseDTO deleteTask(Long taskId) {
        Task task = taskRepository.findById(taskId).orElseThrow();
        taskRepository.delete(task);
        calculateTaskProgress(task.getFeature().getId());
        return new TaskResponseDTO(taskId, task.getDescription(), task.isDone(), task.getFeature().getId());
    }

    public void calculateTaskProgress(Long taskId) {
        List<Task> allTasks = taskRepository.findAllByFeature_Id(taskId);
        List<Task> doneTasks = taskRepository.findAllByFeature_IdAndIsDone(taskId, true);

        double percentageCompleted = 0.0;
        if (!allTasks.isEmpty()) {
            percentageCompleted = ((double) doneTasks.size() / allTasks.size()) * 100;
        }

        featureService.updateProgress(taskId, (int) percentageCompleted);
    }
}
