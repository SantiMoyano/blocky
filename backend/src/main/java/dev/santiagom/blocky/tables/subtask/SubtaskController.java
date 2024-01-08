package dev.santiagom.blocky.tables.subtask;

import dev.santiagom.blocky.tables.subtask.dtos.SubtaskDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/subtask")
@CrossOrigin(origins = {"http://localhost:3000"})
public class SubtaskController {

    @Autowired
    private SubtaskService subtaskService;

    @GetMapping
    public ResponseEntity<List<Subtask>> getAllSubtasks() {
        return new ResponseEntity<List<Subtask>>(subtaskService.allSubtasks(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Subtask> createSubtask(@RequestBody SubtaskDTO subtask) {
        return new ResponseEntity<Subtask>(subtaskService.createSubtask(subtask), HttpStatus.CREATED);
    }
}
