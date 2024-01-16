package dev.santiagom.blocky.tables.task;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import dev.santiagom.blocky.tables.category.Category;
import dev.santiagom.blocky.tables.epic.Epic;
import dev.santiagom.blocky.tables.subtask.Subtask;
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
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String description;
    private int progress;

    // Epic relationship
    @ManyToOne
    @JoinColumn(name = "epic_id")
    private Epic epic;

    // Many tasks can have the same category
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    // Subtask relationship
    @OneToMany(mappedBy = "task", cascade = CascadeType.ALL)
    private List<Subtask> Subtasks;
}
