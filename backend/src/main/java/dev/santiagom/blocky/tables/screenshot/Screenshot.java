package dev.santiagom.blocky.tables.screenshot;

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
public class Screenshot {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String url;
    private String name; // for alt images

    @ManyToOne
    @JoinColumn(name = "project_id")  // This is the foreign key column in the Screenshot table
    @JsonBackReference
    private Project project;
}
