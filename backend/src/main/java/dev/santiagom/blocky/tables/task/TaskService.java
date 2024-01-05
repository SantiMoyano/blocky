package dev.santiagom.blocky.tables.task;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public List<Task> allTask() {
        return taskRepository.findAll();
    }
}
