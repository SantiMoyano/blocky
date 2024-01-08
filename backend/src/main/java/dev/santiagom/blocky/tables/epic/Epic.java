package dev.santiagom.blocky.tables.epic;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import dev.santiagom.blocky.tables.project.Project;
import dev.santiagom.blocky.tables.task.Task;
import dev.santiagom.blocky.tables.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

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
    @JsonBackReference
    private Project project;

    @OneToMany(mappedBy = "epic", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Task> tasks;
}
