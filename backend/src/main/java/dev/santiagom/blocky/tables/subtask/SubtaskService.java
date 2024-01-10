package dev.santiagom.blocky.tables.subtask;

import dev.santiagom.blocky.tables.subtask.dtos.SubtaskDTO;
import dev.santiagom.blocky.tables.subtask.dtos.SubtaskResponseDTO;
import dev.santiagom.blocky.tables.task.Task;
import dev.santiagom.blocky.tables.task.TaskRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@NoArgsConstructor
@AllArgsConstructor
public class SubtaskService {

    @Autowired
    private SubtaskRepository subtaskRepository;

    @Autowired
    private TaskRepository taskRepository;

    public List<SubtaskResponseDTO> allSubtasks() {
        return subtaskRepository.findAll()
                .stream()
                .map(st -> new SubtaskResponseDTO(st.getDescription(), st.isDone(), st.getTask().getId()))
                .collect(Collectors.toList());
    }

    public SubtaskResponseDTO createSubtask(SubtaskDTO subtask) {
        Task task = taskRepository.findById(subtask.getTaskId()).orElseThrow();

        // Create and save new Subtask
        subtaskRepository.save(
                Subtask.builder()
                        .description(subtask.getDescription())
                        .isDone(false)
                        .task(task)
                        .build()
        );

        return new SubtaskResponseDTO(subtask.getDescription(), false, subtask.getTaskId());
    }

    public SubtaskResponseDTO updateSubtask(Long subtaskId, SubtaskDTO subtask) {
        Subtask subtaskToUpdate = subtaskRepository.findById(subtaskId).orElseThrow();

        subtaskToUpdate.setDescription(subtask.getDescription());
        subtaskRepository.save(subtaskToUpdate);

        return new SubtaskResponseDTO(subtask.getDescription(), subtaskToUpdate.isDone(), subtaskToUpdate.getTask().getId());
    }
}
