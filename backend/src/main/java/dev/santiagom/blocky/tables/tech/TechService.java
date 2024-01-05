package dev.santiagom.blocky.tables.tech;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TechService {

    @Autowired
    private TechRepository techRepository;

    public List<Tech> allTech() {
        return techRepository.findAll();
    }
}
