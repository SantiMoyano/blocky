package dev.santiagom.blocky.tables.task;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/task")
@CrossOrigin(origins = {"http://localhost:3000"})
public class TaskController {
}
