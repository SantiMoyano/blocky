package dev.santiagom.blocky.tables.tech;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/tech")
@CrossOrigin(origins = {"http://localhost:3000"})
public class TechController {
}
