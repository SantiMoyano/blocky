package dev.santiagom.blocky.tables.task;

import dev.santiagom.blocky.tables.epic.Epic;
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
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private int progress;

    // Epic relationship
    @ManyToOne
    @JoinColumn(name = "epic_id")
    private Epic epic;
}
