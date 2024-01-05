package dev.santiagom.blocky.tables.subtask;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubtaskService {

    @Autowired
    private SubtaskRepository subtaskRepository;

    public List<Subtask> getAllSubtasks() {
        return subtaskRepository.findAll();
    }
}
