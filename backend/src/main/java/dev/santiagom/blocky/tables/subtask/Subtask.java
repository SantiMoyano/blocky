package dev.santiagom.blocky.tables.subtask;

import dev.santiagom.blocky.tables.project.Project;
import dev.santiagom.blocky.tables.task.Task;
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
public class Subtask {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String description;
    private boolean isDone;

    // Task relationship
    @ManyToOne
    @JoinColumn(name = "task_id")
    private Task task;
}
