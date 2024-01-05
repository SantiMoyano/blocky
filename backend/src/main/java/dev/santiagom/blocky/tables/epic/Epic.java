package dev.santiagom.blocky.tables.epic;

import dev.santiagom.blocky.tables.project.Project;
import dev.santiagom.blocky.tables.user.User;
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
public class Epic {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private int progress;

    // Project relationship
    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;
}
