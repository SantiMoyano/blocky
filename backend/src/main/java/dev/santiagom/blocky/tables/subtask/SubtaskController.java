package dev.santiagom.blocky.tables.subtask;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
