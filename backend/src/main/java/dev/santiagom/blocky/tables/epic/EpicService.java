package dev.santiagom.blocky.tables.epic;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EpicService {

    @Autowired
    private EpicRepository epicRepository;

    public List<Epic> allEpics() {
        return epicRepository.findAll();
    }
}
