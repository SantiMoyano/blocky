package dev.santiagom.blocky.tables.feature;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import dev.santiagom.blocky.tables.category.Category;
import dev.santiagom.blocky.tables.epic.Epic;
import dev.santiagom.blocky.tables.task.Task;
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
public class Feature {

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

    // Many features can have the same category
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    // Task relationship
    @OneToMany(mappedBy = "feature", cascade = CascadeType.ALL)
    private List<Task> tasks;
}
