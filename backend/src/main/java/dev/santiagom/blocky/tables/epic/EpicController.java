package dev.santiagom.blocky.tables.epic;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/epic")
@CrossOrigin(origins = {"http://localhost:3000"})
public class EpicController {

    @Autowired
    private EpicService epicService;

    @GetMapping
    public ResponseEntity<List<Epic>> getAllEpics() {
        return new ResponseEntity<List<Epic>>(epicService.allEpics(), HttpStatus.OK);
    }
}
