package dev.santiagom.blocky.tables.epic;

import dev.santiagom.blocky.tables.epic.dtos.EpicDTO;
import dev.santiagom.blocky.tables.epic.dtos.EpicResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/epic")
@CrossOrigin(origins = {"http://localhost:3000"})
public class EpicController {

    @Autowired
    private EpicService epicService;

    @GetMapping("/{projectId}")
    public ResponseEntity<List<EpicResponseDTO>> getAllEpics(@PathVariable Long projectId) {
        return new ResponseEntity<List<EpicResponseDTO>>(epicService.allEpics(projectId), HttpStatus.OK);
    }

    @GetMapping("/details/{id}")
    public ResponseEntity<EpicResponseDTO> getEpicDetails(@PathVariable Long id) {
        return new ResponseEntity<EpicResponseDTO>(epicService.epicDetails(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<EpicResponseDTO> createEpic(@RequestBody EpicDTO epic) {
        return new ResponseEntity<EpicResponseDTO>(epicService.createEpic(epic), HttpStatus.CREATED);
    }

    @PutMapping("/{epicId}")
    public ResponseEntity<EpicResponseDTO> updateEpic(
            @PathVariable Long epicId, @RequestBody EpicDTO epic) {
        return new ResponseEntity<EpicResponseDTO>(epicService.updateEpic(epicId, epic), HttpStatus.OK);
    }

    @DeleteMapping("/{epicId}")
    public ResponseEntity<EpicResponseDTO> deleteEpic(@PathVariable Long epicId) {
        return new ResponseEntity<EpicResponseDTO>(epicService.deleteEpic(epicId), HttpStatus.OK);
    }
}
