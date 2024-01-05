package dev.santiagom.blocky.tables.tech;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
