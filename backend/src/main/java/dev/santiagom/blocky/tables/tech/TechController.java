package dev.santiagom.blocky.tables.tech;

import dev.santiagom.blocky.tables.tech.dtos.TechDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/tech")
@CrossOrigin(origins = {"http://localhost:3000"})
public class TechController {

    @Autowired
    private TechService techService;

    @GetMapping
    public ResponseEntity<List<Tech>> getAllTechs() {
        return new ResponseEntity<List<Tech>>(techService.allTechs(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Tech> createTech(@RequestBody TechDTO tech) {
        return new ResponseEntity<Tech>(techService.createTech(tech), HttpStatus.CREATED);
    }
}
