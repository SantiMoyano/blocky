package dev.santiagom.blocky.tables.epic;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/epic")
@CrossOrigin(origins = {"http://localhost:3000"})
public class EpicController {
}
