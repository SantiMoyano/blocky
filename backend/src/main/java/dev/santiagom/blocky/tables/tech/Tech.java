package dev.santiagom.blocky.tables.tech;

import com.fasterxml.jackson.annotation.JsonBackReference;
import dev.santiagom.blocky.tables.project.Project;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Tech {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String color;

    // Project relationship
    @ManyToOne
    @JoinColumn(name = "project_id")  // This is the foreign key column in the Screenshot table
    @JsonBackReference
    private Project project;
}
