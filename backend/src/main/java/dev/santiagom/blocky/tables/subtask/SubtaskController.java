package dev.santiagom.blocky.tables.subtask;

import dev.santiagom.blocky.tables.subtask.dtos.SubtaskDTO;
import dev.santiagom.blocky.tables.subtask.dtos.SubtaskResponseDTO;
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

    @GetMapping("/{taskId}")
    public ResponseEntity<List<SubtaskResponseDTO>> getAllSubtasks(@PathVariable Long taskId) {
        return new ResponseEntity<List<SubtaskResponseDTO>>(subtaskService.allSubtasks(taskId), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<SubtaskResponseDTO> createSubtask(@RequestBody SubtaskDTO subtask) {
        return new ResponseEntity<SubtaskResponseDTO>(subtaskService.createSubtask(subtask), HttpStatus.CREATED);
    }

    @PutMapping("/{subtaskId}")
    public ResponseEntity<SubtaskResponseDTO> updateSubtask
            (@PathVariable Long subtaskId, @RequestBody SubtaskDTO subtask) {
        return new ResponseEntity<SubtaskResponseDTO>(subtaskService.updateSubtask(subtaskId, subtask), HttpStatus.OK);
    }

    @PutMapping("/toggle/{subtaskId}")
    public ResponseEntity<SubtaskResponseDTO> toggleIsDone(@PathVariable Long subtaskId) {
        return new ResponseEntity<SubtaskResponseDTO>(subtaskService.toggleIsDone(subtaskId), HttpStatus.OK);
    }

}
