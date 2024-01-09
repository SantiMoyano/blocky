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

    @GetMapping
    public ResponseEntity<List<EpicResponseDTO>> getAllEpics() {
        return new ResponseEntity<List<EpicResponseDTO>>(epicService.allEpics(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<EpicResponseDTO> createEpic(@RequestBody EpicDTO epic) {
        return new ResponseEntity<EpicResponseDTO>(epicService.createEpic(epic), HttpStatus.CREATED);
    }
}
