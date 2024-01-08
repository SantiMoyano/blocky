package dev.santiagom.blocky.tables.task;

import dev.santiagom.blocky.tables.task.dtos.TaskDTO;
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
    public ResponseEntity<List<Task>> getAllTasks() {
        return new ResponseEntity<List<Task>>(taskService.allTasks(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody TaskDTO task) {
        return new ResponseEntity<Task>(taskService.createTask(task), HttpStatus.CREATED);
    }
}
