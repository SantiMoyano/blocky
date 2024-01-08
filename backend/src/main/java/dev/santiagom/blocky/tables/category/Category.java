package dev.santiagom.blocky.tables.category;

import com.fasterxml.jackson.annotation.JsonManagedReference;
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
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String color;

    // One category can have multiple tasks
    @OneToMany(mappedBy = "category")
    @JsonManagedReference
    private List<Task> tasks;
}
