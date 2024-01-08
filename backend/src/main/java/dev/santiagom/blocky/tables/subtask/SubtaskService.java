package dev.santiagom.blocky.tables.subtask;

import dev.santiagom.blocky.tables.subtask.dtos.SubtaskDTO;
import dev.santiagom.blocky.tables.task.Task;
import dev.santiagom.blocky.tables.task.TaskRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@NoArgsConstructor
@AllArgsConstructor
public class SubtaskService {

    @Autowired
    private SubtaskRepository subtaskRepository;

    @Autowired
    private TaskRepository taskRepository;

    public List<Subtask> allSubtasks() {
        return subtaskRepository.findAll();
    }

    public Subtask createSubtask(SubtaskDTO subtask) {
        Task task = taskRepository.findById(subtask.getTaskId()).orElseThrow();
        return subtaskRepository.save(
                Subtask.builder()
                        .description(subtask.getDescription())
                        .isDone(false)
                        .task(task)
                        .build()
        );
    }
}
