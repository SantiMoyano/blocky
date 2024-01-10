package dev.santiagom.blocky.tables.task;

import dev.santiagom.blocky.tables.task.dtos.TaskDTO;
import dev.santiagom.blocky.tables.task.dtos.TaskResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/task")
@CrossOrigin(origins = {"http://localhost:3000"})
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping
    public ResponseEntity<List<TaskResponseDTO>> getAllTasks() {
        return new ResponseEntity<List<TaskResponseDTO>>(taskService.allTasks(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<TaskResponseDTO> createTask(@RequestBody TaskDTO task) {
        return new ResponseEntity<TaskResponseDTO>(taskService.createTask(task), HttpStatus.CREATED);
    }

    @PutMapping("/{taskId}")
    public ResponseEntity<TaskResponseDTO> updateTask(
            @PathVariable Long taskId, @RequestBody TaskDTO task) {
        return new ResponseEntity<TaskResponseDTO>(taskService.updateTask(taskId, task), HttpStatus.OK);
    }
}
