package dev.santiagom.blocky.tables.tech;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TechService {

    @Autowired
    private TechRepository techRepository;
}
