package dev.santiagom.blocky.tables.screenshot;

import dev.santiagom.blocky.tables.project.Project;
import jakarta.persistence.*;

@Entity
public class Screenshot {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String url;
    private String name; // for alt images

    @ManyToOne
    @JoinColumn(name = "project_id")  // This is the foreign key column in the Screenshot table
    private Project project;
}
